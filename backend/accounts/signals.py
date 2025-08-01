####################################################
"""
Local file user image & nid card image delete 
"""
####################################################
import os
from django.dispatch import receiver
from django.db.models.signals import post_delete
from accounts.models import User

@receiver(post_delete, sender=User)
def delete_user_images(sender, instance, **kwargs):
    fields_to_delete = [
        instance.image,
        instance.nid_front_side,
        instance.nid_back_side,
    ]

    for field in fields_to_delete:
        if field and hasattr(field, 'path') and os.path.isfile(field.path):
            os.remove(field.path)
