########################################################################
"""
super user & general user create
"""
########################################################################
from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, password=None, **extra_fields):
        required_fields = {
            'username': username,
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
        }

        for field, value in required_fields.items():
            if not value:
                raise DjangoValidationError(_(f'{field.replace("_", " ").title()} must be required'))
        
        email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('terms_accept', True)
        extra_fields.setdefault('is_verify', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        user = self.create_user(
            username,
            email,
            first_name,
            last_name,
            password,
            **extra_fields,
        )
        return user
