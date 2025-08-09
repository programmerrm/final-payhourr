from decimal import Decimal
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

User = get_user_model()

class Review(models.Model):
    """
    Review between buyer and seller for a specific order.
    Buyer can review seller once, seller can review buyer once.
    """

    order = models.ForeignKey(
        'orders.Order',
        on_delete=models.CASCADE,
        related_name='reviews',
        verbose_name=_("Order"),
        help_text=_("The order this review is associated with."),
        db_index=True
    )
    reviewer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='given_reviews',
        verbose_name=_("Reviewer"),
        help_text=_("The user who is giving the review."),
        db_index=True
    )
    reviewee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_reviews',
        verbose_name=_("Reviewee"),
        help_text=_("The user who is being reviewed."),
        db_index=True
    )
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[
            MinValueValidator(Decimal('0.00')),
            MaxValueValidator(Decimal('5.00'))
        ],
        verbose_name=_("Rating"),
        help_text=_("Rating between 0.00 and 5.00")
    )
    title = models.CharField(
        max_length=100,
        verbose_name=_("Title"),
        help_text=_("Short title for the review"),
        blank=True,
        null=True
    )
    comment = models.TextField(
        max_length=2000,
        verbose_name=_("Comment"),
        help_text=_("Detailed feedback about the experience"),
        blank=True,
        null=True
    )
    is_anonymous = models.BooleanField(
        default=False,
        verbose_name=_("Anonymous Review"),
        help_text=_("If True, reviewer identity will be hidden.")
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Created At"),
        db_index=True
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Updated At")
    )

    class Meta:
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['order', 'reviewer'],
                name='unique_order_reviewer'
            )
        ]
        indexes = [
            models.Index(fields=['rating']),
            models.Index(fields=['created_at']),
        ]
        verbose_name = _("Review")
        verbose_name_plural = _("Reviews")

    def __str__(self):
        return f"Review for Order #{self.order_id} by {self.reviewer} - {self.rating}"

    def clean(self):
        """
        Validation:
        - Reviewer and reviewee must be different
        - Reviewer must be sender or receiver of the order
        - Reviewee must be the opposite participant in the order
        """
        if self.reviewer == self.reviewee:
            raise ValidationError(_("You cannot review yourself."))

        if self.order.sender != self.reviewer and self.order.receiver != self.reviewer:
            raise ValidationError(_("You can only review an order you participated in."))

        if self.order.sender != self.reviewee and self.order.receiver != self.reviewee:
            raise ValidationError(_("Reviewee must be the other participant in the order."))
