from django.urls import path
from api.accounts.views.register import RegisterViewSet
from api.accounts.views.login import LoginViewSet
from api.accounts.views.logout import LogoutView
from api.accounts.views.users import UsersViewSet, UserViewSet
from api.accounts.views.update import AdminUpdateUserViewSet
from api.accounts.views.update import UpdateUserViewSet
from api.accounts.views.delete import AdminAllUserDeleteViewSet
from api.accounts.views.delete import AdminUsersDeleteViewSet
from api.accounts.views.delete import UserDeleteViewSet
from api.accounts.views.password import PasswordChangeViewSet
from api.accounts.views.forgot_password import ForgotPasswordViewSet, ResetPasswordViewSet
from api.accounts.views.rating import RatingViewSet

urlpatterns = [
    path(
        'user/register/',
        RegisterViewSet.as_view({ 'post' : 'create' }),
        name='register',
    ),
    path(
        'user/login/',
        LoginViewSet.as_view(),
        name='login',
    ),
    path(
        'user/logout/',
        LogoutView.as_view(),
        name='logout',
    ),
    path(
        'user/<int:pk>/',
        UserViewSet.as_view({ 'get': 'retrieve' }),
        name='user',
    ),
    path(
        'users/',
        UsersViewSet.as_view({'get': 'list'}),
        name='users',
    ),
    path(
        'user/update/<int:pk>/',
        UpdateUserViewSet.as_view({'patch': 'update'}),
        name='user_update',
    ),
    path(
        'user/admin/update/<int:pk>/',
        AdminUpdateUserViewSet.as_view({'patch': 'update'}),
        name='update_user',
    ),
    path(
        'users/admin/all/delete/',
        AdminAllUserDeleteViewSet.as_view({'delete': 'delete'}),
        name='admin_all_user_delete',
    ),
    path(
        'users/admin/delete/',
        AdminUsersDeleteViewSet.as_view({'delete': 'delete'}),
        name='admin_users_delete',
    ),
    path(
        'user/delete/<int:pk>/',
        UserDeleteViewSet.as_view({'delete': 'delete'}),
        name='delete',
    ),
    path(
        'user/password/change/',
        PasswordChangeViewSet.as_view({'patch': 'update'}),
        name='password_change',
    ),
    path(
        'user/forgot-password/',
        ForgotPasswordViewSet.as_view({'post': 'post'}),
        name='forgot_password',
    ),
    path(
        'user/reset-password/<uidb64>/<token>/',
        ResetPasswordViewSet.as_view({'post': 'post'}),
        name='reset_password',
    ),
    path(
        'ratings/',
        RatingViewSet.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='ratings'
    ),
]
