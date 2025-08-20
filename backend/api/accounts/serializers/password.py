from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = self.context.get('request').user

        if not user.check_password(attrs.get('old_password')):
            raise serializers.ValidationError({
                'old_password': 'Old password is incorrect'
            })
        
        if attrs.get('new_password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({
                'confirm_password': 'New password and confirm password do not match'
            })

        return attrs
    
    def save(self):
        user = self.context.get('request').user
        new_password = self.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        