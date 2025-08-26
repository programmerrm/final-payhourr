##################################################################
"""
User Model Create
"""
##################################################################
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator, RegexValidator, MinValueValidator, MaxValueValidator, EmailValidator
from django.core.exceptions import ValidationError
from decimal import Decimal
from accounts.managers import UserManager
from accounts.utils.roles import ROLES
from accounts.utils.genders import GENDERS
from accounts.services.user_id import GENERATE_USER_ID
from accounts.utils.image_upload import USER_DIRECTORY_PATH
from accounts.utils.nid_upload import NID_DIRECTORY_PATH
from core.utils import VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE, GENERATE_SLUG
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """
    Custom User model extending AbstractUser with additional fields.
    Ensures unique email and username, adds user roles, and supports profile images and NID uploads.
    """

    user_id = models.CharField(
        max_length=9,
        unique=True,
        db_index=True,
        editable=False,
        validators=[MinLengthValidator(9)],
        help_text=_("Unique 9 digit user ID"),
    )
    image = models.ImageField(
        upload_to=USER_DIRECTORY_PATH,
        validators=[VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE],
        null=True,
        blank=True,
        help_text=_("Profile picture"),
    )
    username = models.CharField(
        max_length=180,
        unique=True,
        db_index=True,
        validators=[
            MinLengthValidator(3),
            RegexValidator(
                regex=r'^[a-zA-Z0-9_]+$',
                message=_('Username can only contain letters, numbers, and underscores.')
            )
        ],
        help_text=_("Unique username"),
    )
    slug = models.SlugField(
        max_length=180,
        unique=True,
        editable=False,
    )
    email = models.EmailField(
        max_length=180,
        unique=True,
        db_index=True,
        validators=[EmailValidator(), MinLengthValidator(10)],
        help_text=_("Unique email address"),
    )
    first_name = models.CharField(
        max_length=30,
        validators=[MinLengthValidator(3)],
        help_text=_("First name"),
    )
    last_name = models.CharField(
        max_length=30,
        validators=[MinLengthValidator(3)],
        help_text=_("Last name"),
    )
    nid_card_number = models.CharField(
        max_length=20,
        null=True,
        blank=True,
    )
    number = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        null=True,
        blank=True,
        help_text=_("Phone number"),
    )
    payment_number = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True,
        db_index=True,
        help_text=_("Payment number (optional)"),
    )
    nid_front_side = models.ImageField(
        upload_to=NID_DIRECTORY_PATH,
        validators=[VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE],
        null=True,
        blank=True,
        help_text=_("NID front side image"),
    )
    nid_back_side = models.ImageField(
        upload_to=NID_DIRECTORY_PATH,
        validators=[VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE],
        null=True,
        blank=True,
        help_text=_("NID back side image"),
    )
    date_of_birth = models.DateField(
        null=True,
        blank=True,
        help_text=_("Date of birth"),
    )
    balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal('0.00'),
        validators=[MinValueValidator(0)],
        help_text=_("User account balance"),
    )

    gender = models.CharField(
        max_length=20,
        choices=GENDERS,
        null=True,
        blank=True,
        help_text=_("Gender"),
    )
    address = models.CharField(
        max_length=280,
        validators=[MinLengthValidator(10)],
        null=True,
        blank=True,
        help_text=_("Address"),
    )
    zip_code = models.CharField(
        max_length=10,
        validators=[MinLengthValidator(3)],
        null=True,
        blank=True,
        help_text=_("ZIP or postal code"),
    )
    country = models.CharField(
        max_length=20,
        validators=[MinLengthValidator(3)],
        null=True,
        blank=True,
        help_text=_("Country"),
    )
    role = models.CharField(
        max_length=10,
        choices=ROLES,
        default='user',
        help_text=_("User role"),
    )
    terms_accept = models.BooleanField(default=False, help_text=_("Accept terms and conditions"))
    is_verify = models.BooleanField(default=False, help_text=_("Is user verified"))
    is_active = models.BooleanField(default=True)
    is_block = models.BooleanField(default=False, help_text=_("Is user blocked"))
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = UserManager()

    class Meta:
        ordering = ['-date_joined']
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    def __str__(self) -> str:
        return self.username or self.email

    def clean(self) -> None:
        """
        Ensure that only one user can have the admin role.
        """
        if self.role == 'admin':
            qs = User.objects.filter(role='admin')
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            if qs.exists():
                raise ValidationError(_('Only one admin is allowed.'))

    def save(self, *args, **kwargs) -> None:
        """
        Override save method to generate user_id and slug on creation
        and update slug if username changes.
        """
        if not self.pk:
            self.user_id = GENERATE_USER_ID(self.role)
            self.slug = GENERATE_SLUG(self.username)
        else:
            orig = User.objects.only("username").filter(pk=self.pk).first()
            if orig and orig.username != self.username:
                self.slug = GENERATE_SLUG(self.username)

        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False) -> None:
        """
        Delete associated files on user deletion.
        """
        storage_fields = ['image', 'nid_front_side', 'nid_back_side']
        for field_name in storage_fields:
            field = getattr(self, field_name)
            if field:
                field.delete(save=False)
        super().delete(using=using, keep_parents=keep_parents)

class BlockedToken(models.Model):
    token = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token
