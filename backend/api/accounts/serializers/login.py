from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        identifier = attrs.get('identifier')
        password = attrs.get('password')

        if not identifier:
            raise serializers.ValidationError({'identifier': _('Email or Username is required')})
        if not password:
            raise serializers.ValidationError({'password': _('Password is required')})

        user = authenticate(request=self.context.get('request'), username=identifier, password=password)

        if user is None:
            if not User.objects.filter(Q(email=identifier) | Q(username=identifier)).exists():
                raise serializers.ValidationError({'identifier': _('No user found with this email or username')})
            else:
                raise serializers.ValidationError({'password': _('Incorrect password')})

        if not getattr(user, 'is_verify', True):
            raise serializers.ValidationError({'identifier': _('User account is not verified.')})

        if not user.is_active:
            raise serializers.ValidationError({'identifier': _('User account is inactive.')})

        if getattr(user, 'is_block', False):
            raise serializers.ValidationError({'identifier': _('User account is blocked.')})

        attrs['user'] = user
        return attrs
