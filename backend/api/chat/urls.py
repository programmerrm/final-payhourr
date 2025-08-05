from django.urls import path
from api.chat.views.connection_requests import ConnectionRequestSendView, ConnectionRequestsView, ConnectionRequestsUserDeleteView, ConnectionRequestsAddToConnectedUserList
from api.chat.views.connected_users import ConnectedUsersView
from api.chat.views.chat import ChatList

urlpatterns = [
    path(
        'connection-request-send/',
        ConnectionRequestSendView.as_view(),
        name='connection_request_send',
    ),
    path(
        'connection-requests/',
        ConnectionRequestsView.as_view({'get': 'list'}),
        name='connection_requests',
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
       "chat/<str:room_name>/", 
       ChatList.as_view(), 
       name="chat-messages"
    ),
]
