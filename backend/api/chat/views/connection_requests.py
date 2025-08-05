from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from rest_framework.exceptions import NotFound
from django.db import models
from api.chat.serializers.connection_request import ConnectionRequestSerializer
from chat.models import ConnectionRequest, Connected
from api.chat.filters.filters import ConnectionRequestsFilter
from api.chat.paginators.paginators import ConnectionRequestsPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user_model
from api.accounts.serializers.users import UsersSerializer

User = get_user_model()

class ConnectionRequestSendView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        sender = request.user
        receiver_id = request.data.get("user_id")

        if not receiver_id:
            return Response({
                "errors": "user_id is required."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            receiver = User.objects.get(user_id=receiver_id)
        except User.DoesNotExist:
            return Response({
                "errors": "User not found."
            }, status=status.HTTP_404_NOT_FOUND)

        if sender == receiver:
            return Response({
                "errors": "You cannot send a request to yourself."
            }, status=status.HTTP_400_BAD_REQUEST)

        # ❗ Check if both are same role
        if sender.role == receiver.role:
            return Response({
                "errors": "You cannot send request to a user with the same role."
            }, status=status.HTTP_400_BAD_REQUEST)

        if ConnectionRequest.objects.filter(sender=sender, receiver=receiver).exists():
            return Response({
                "errors": "Request already sent."
            }, status=status.HTTP_400_BAD_REQUEST)

        ConnectionRequest.objects.create(sender=sender, receiver=receiver)
        return Response({
            "message": "Connection request sent successfully."
        }, status=status.HTTP_201_CREATED)

class ConnectionRequestsView(viewsets.ModelViewSet):
    queryset = ConnectionRequest.objects.all()
    serializer_class = ConnectionRequestSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ConnectionRequestsFilter
    pagination_class = ConnectionRequestsPagination

    def get_queryset(self):
        user = self.request.user
        return ConnectionRequest.objects.filter(sender=user) | ConnectionRequest.objects.filter(receiver=user)

    def list(self, request, *args, **kwargs):
        user = request.user
        queryset = self.filter_queryset(
            ConnectionRequest.objects.filter(sender=user) | ConnectionRequest.objects.filter(receiver=user)
        )

        paginator = self.pagination_class()

        try:
            page = paginator.paginate_queryset(queryset, request)
        except NotFound:
            return Response({
                "success": False,
                "message": "Invalid page number.",
                "data": {
                    "senders": [],
                    "receivers": []
                }
            })

        # Only include users who sent requests TO the current user
        senders = list({item.sender for item in page if item.receiver == user and item.sender != user})
        
        # Only include users who received requests FROM the current user
        receivers = list({item.receiver for item in page if item.sender == user and item.receiver != user})

        sender_data = UsersSerializer(senders, many=True).data
        receiver_data = UsersSerializer(receivers, many=True).data

        return paginator.get_paginated_response(page, sender_data, receiver_data)

class ConnectionRequestsUserDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        receiver_id = request.data.get("user_id")

        if not receiver_id:
            return Response({
                "errors": "user_id is required."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            target_user = User.objects.get(user_id=receiver_id)
        except User.DoesNotExist:
            return Response({
                "errors": "User not found."
            }, status=status.HTTP_404_NOT_FOUND)

        deleted_count, _ = ConnectionRequest.objects.filter(
            models.Q(sender=user, receiver=target_user) |
            models.Q(sender=target_user, receiver=user)
        ).delete()

        if deleted_count == 0:
            return Response({
                "message": "No connection request found to delete."
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "message": "Connection request deleted successfully."
        }, status=status.HTTP_200_OK)

class ConnectionRequestsAddToConnectedUserList(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        sender_id = request.data.get("user_id")

        if not sender_id:
            return Response({
                "errors": "user_id is required."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            sender_user = User.objects.get(user_id=sender_id)
        except User.DoesNotExist:
            return Response({
                "errors": "User not found."
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            request_obj = ConnectionRequest.objects.get(sender=sender_user, receiver=user)
        except ConnectionRequest.DoesNotExist:
            return Response({
                "errors": "No pending request from this user."
            }, status=status.HTTP_404_NOT_FOUND)

        # Mark request as accepted
        request_obj.accepted = True
        request_obj.save()

        # Create or update connection for both users
        connection_user, _ = Connected.objects.get_or_create(user=user)
        connection_sender, _ = Connected.objects.get_or_create(user=sender_user)

        connection_user.connected_users.add(sender_user)
        connection_sender.connected_users.add(user)

        # Now delete the accepted connection request from DB
        request_obj.delete()

        return Response({
            "message": "User added to connection list successfully."
        }, status=status.HTTP_200_OK)
