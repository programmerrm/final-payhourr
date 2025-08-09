from django.urls import path
from api.reviews.views.review_create import ReviewCreateViewSet

urlpatterns = [
    path(
        'create/',
        ReviewCreateViewSet.as_view({ 'post': 'create' }),
        name='',
    ),
]
