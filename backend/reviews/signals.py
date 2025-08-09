# =======================
# SIGNALS to auto-update user rating
# =======================
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.db.models import Avg, Count
from reviews.models import Review

def update_user_rating(user):
    """ Recalculate and update user's average rating & total reviews """
    agg = Review.objects.filter(reviewee=user).aggregate(
        avg_rating=Avg('rating'),
        total_reviews=Count('id')
    )
    user.average_rating = round(agg['avg_rating'] or 0, 2)
    user.total_reviews = agg['total_reviews']
    user.save(update_fields=['average_rating', 'total_reviews'])

@receiver(post_save, sender=Review)
def review_created_or_updated(sender, instance, **kwargs):
    update_user_rating(instance.reviewee)

@receiver(post_delete, sender=Review)
def review_deleted(sender, instance, **kwargs):
    update_user_rating(instance.reviewee)
