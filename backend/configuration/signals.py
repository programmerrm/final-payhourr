####################################################
"""
Local file images delete 
"""
####################################################
import os
from django.dispatch import receiver
from django.db.models.signals import post_delete
from configuration.models import WhatIsPayhourr, WhyUsePayhourr, OurMission, Contact, BuyerGuide, SellerGuide, SecurePaymentProcess, Faq, TermsOfService, PrivacyPolicy, TermsAndConditions, DisputePolicy, RefundPolicy

@receiver(post_delete, sender=WhatIsPayhourr)
def delete_what_is_payhourr_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=WhyUsePayhourr)
def delete_why_use_payhourr_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=OurMission)
def our_mission_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=Contact)
def contact_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=BuyerGuide)
def buyer_guide_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=SellerGuide)
def seller_guide_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=SecurePaymentProcess)
def secure_payment_process_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=Faq)
def faq_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=TermsOfService)
def terms_of_service_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=PrivacyPolicy)
def privacy_policy_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=TermsAndConditions)
def terms_and_conditions_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=DisputePolicy)
def dispute_policy_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)

@receiver(post_delete, sender=RefundPolicy)
def refund_policy_logo(sender, instance, **kwargs):
    if instance.logo and os.path.isfile(instance.logo.path):
        os.remove(instance.logo.path)
