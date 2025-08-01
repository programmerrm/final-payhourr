##################################################################
"""
User model create
"""
##################################################################
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator, RegexValidator
from django.core.exceptions import ValidationError as DjangoValidationError
from accounts.managers import UserManager
from accounts.utils.roles import ROLES
from accounts.utils.genders import GENDERS
from accounts.services.user_id import GENERATE_USER_ID
from accounts.utils.image_upload import USER_DIRECTORY_PATH
from accounts.utils.nid_upload import NID_DIRECTORY_PATH
from core.utils import VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE, VALIDATE_EMAIL, VALIDATE_PHONE_NUMBER, VALIDATE_ALPHA, GENERATE_SLUG
from django.utils.translation import gettext_lazy as _

# Create your models here.

class User(AbstractUser):
    user_id = models.CharField(
        max_length=9,
        db_index=True,
        unique=True,
        editable=False,
        validators=[MinLengthValidator(9)],
    )
    image = models.ImageField(
        upload_to=USER_DIRECTORY_PATH,
        validators=[VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE],
        null=True,
        blank=True,
    )
    username = models.CharField(
        unique=True,
        db_index=True,
        max_length=30,
        validators=[
            MinLengthValidator(3),
            RegexValidator(
                regex=r'^[a-zA-Z0-9_]+$',
                message='Username can only contain letters, numbers, and underscores.',
            ),
        ],
    )
    slug = models.SlugField(
        unique=True,
        max_length=40,
        editable=False,
    )
    email = models.EmailField(
        unique=True,
        max_length=60,
        db_index=True,
        validators=[VALIDATE_EMAIL, MinLengthValidator(10)],
    )
    number = models.CharField(
        unique=True,
        db_index=True,
        max_length=20,
        validators=[VALIDATE_PHONE_NUMBER],
    )
    payment_number = models.CharField(
        unique=True,
        db_index=True,
        max_length=20,
        validators=[VALIDATE_PHONE_NUMBER],
        null=True,
        blank=True,
    )
    first_name = models.CharField(
        max_length=30,
        validators=[MinLengthValidator(3), VALIDATE_ALPHA],
    )
    last_name = models.CharField(
        max_length=30,
        validators=[MinLengthValidator(3), VALIDATE_ALPHA],
    )
    nid_front_side = models.ImageField(
        upload_to=NID_DIRECTORY_PATH,
        validators=[VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE],
        null=True,
        blank=True,
    )
    nid_back_side = models.ImageField(
        upload_to=NID_DIRECTORY_PATH,
        validators=[VALIDATE_IMAGE_EXTENSION, VALIDATE_IMAGE_SIZE],
        null=True,
        blank=True,
    )
    
    date_of_birth = models.DateField(
        null=True,
        blank=True,
    )
    gender = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        choices=GENDERS,
    )
    address = models.CharField(
        max_length=80,
        validators=[MinLengthValidator(10)],
        null=True,
        blank=True,
    )
    zip_code = models.CharField(
        max_length=10,
        validators=[MinLengthValidator(3)],
        null=True,
        blank=True,
    )
    country = models.CharField(
        max_length=20,
        validators=[MinLengthValidator(3)],
        null=True,
        blank=True,
    )
    role = models.CharField(
        default='user',
        choices=ROLES,
    )
    terms_accept = models.BooleanField(default=False,)
    is_verify = models.BooleanField(default=False,)
    is_active = models.BooleanField(default=True,)
    is_block = models.BooleanField(default=False,)
    is_staff = models.BooleanField(default=False,)
    is_superuser = models.BooleanField(default=False,)
    date_joined = models.DateTimeField(auto_now_add=True,)
    updated_at = models.DateTimeField(auto_now=True,)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'number']

    objects = UserManager()

    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return self.username or self.email

    def clean(self):
        if self.role == 'admin':
            existing_admin = User.objects.filter(role='admin')
            if self.pk:
                existing_admin = existing_admin.exclude(pk=self.pk)
            if existing_admin.exists():
                raise DjangoValidationError(_('Only one admin is allowed.'))

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_id = GENERATE_USER_ID(self.role)
            self.slug = GENERATE_SLUG(self.username)
        else:
            orig = User.objects.only("username").filter(pk=self.pk).first()
            if orig and orig.username != self.username:
                self.slug = GENERATE_SLUG(self.username)

        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        if self.image:
            self.image.delete(save=False)
        if self.nid_front_side:
            self.nid_front_side.delete(save=False)
        if self.nid_back_side:
            self.nid_back_side.delete(save=False)
        super().delete(using=using, keep_parents=keep_parents)
    
class BlockedToken(models.Model):
    token = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token
    