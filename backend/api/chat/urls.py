from django.urls import path
from api.chat.views.connection_requests import ConnectionRequestSendView, ConnectionRequestsView, ConnectionRequestsUserDeleteView, ConnectionRequestsAddToConnectedUserList
from api.chat.views.connected_users import ConnectedUsersView, ConnectedUsersWithOutPaginationView
from api.chat.views.chat import ChatList, FileUploadView
from api.chat.views.dispute import DisputeViewSet

dispute_detail = DisputeViewSet.as_view({
    "get": "retrieve",
    "put": "update", 
    "patch": "partial_update",
    "delete": "destroy",
})

urlpatterns = [
    path(
        'connection-request-send/',
        ConnectionRequestSendView.as_view(),
        name='connection_requests_list',
    ),
    path(
        'connection-requests/',
        ConnectionRequestsView.as_view({'get': 'list'}),
        name='connection_requests_list',
    ),
    path(
        'connection-request-delete/',
        ConnectionRequestsUserDeleteView.as_view(),
        name='connection_request_delete',
    ),
    path(
        'connection-add-connected/',
        ConnectionRequestsAddToConnectedUserList.as_view(),
        name='connection_add_connected',
    ),
    path(
        'connected-users/',
        ConnectedUsersView.as_view({'get': 'list'}),
        name='connected_users',
    ),
    path(
        'connected-users-with-out-pagination/',
        ConnectedUsersWithOutPaginationView.as_view({'get': 'list'}),
        name='connected_users_with_out_pagination'
    ),
    path(
       "message/<str:room_name>/", 
       ChatList.as_view(), 
       name="chat-messages"
    ),
    path(
        "file-upload/",
        FileUploadView.as_view(),
        name='file_upload',
    ),
    path(
        "dispute/",
        DisputeViewSet.as_view({
            "get": "list",
            "post": "create",
        }),
        name="disputes",
    ),
    path(
        "dispute/<int:pk>/",
        dispute_detail,
        name="dispute-detail",
    ),
]
