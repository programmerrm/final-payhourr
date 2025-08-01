from django.db import models

# Create your models here.

class WhatIsPayhourr(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='what-is-payhourr/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title or 'What is Payhourr Data'

class WhatIsPayhourrItems(models.Model):
    what_is_payhourr = models.ForeignKey(
        WhatIsPayhourr,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class WhyUsePayhourr(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='why-use-payhourr/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title or 'Why use Payhourr Data'
    
class WhyUsePayhourrItems(models.Model):
    why_use_payhourr = models.ForeignKey(
        WhyUsePayhourr,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class OurMission(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='our-mission/',
    )
    description = models.TextField(
        max_length=5000,
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs):
        if not self.pk and OurMission.objects.exists():
            OurMission.objects.all().delete()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'our mission data added by admin'
    
class Contact(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='contact/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )
    short_title = models.CharField(
        max_length=280,
        null=True,
        blank=True,
    )
    email = models.EmailField(
        max_length=280,
        null=True,
        blank=True,
    )
    phone = models.CharField(
        max_length=50,
        null=True,
        blank=True,
    )
    address = models.CharField(
        max_length=280,
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs):
        if not self.pk and Contact.objects.exists():
            Contact.objects.all().delete()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'contact data added by admin'
    
class BuyerGuide(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='buyer-guide/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title or 'Buyer guide Payhourr Data'
    
class BuyerGuideItems(models.Model):
    buyerGuide = models.ForeignKey(
        BuyerGuide,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'
    
class SellerGuide(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='seller-guide/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title or 'Seller guide Payhourr Data'
    
class SellerGuideItems(models.Model):
    sellerGuide = models.ForeignKey(
        SellerGuide,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class SecurePaymentProcess(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='secure-payment-process/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title or 'Secure payment process Payhourr Data'
    
class SecurePaymentProcessItems(models.Model):
    securePaymentProcess = models.ForeignKey(
        SecurePaymentProcess,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class Faq(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='faq/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )
    short_title = models.CharField(
        max_length=280,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'payhourr admin added faq'
    
class FaqItems(models.Model):
    faq = models.ForeignKey(
        Faq,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class TermsOfService(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='terms-of-service/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )
    short_title = models.CharField(
        max_length=280,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'payhourr admin added'
    
class TermsOfServiceItems(models.Model):
    termsOfService = models.ForeignKey(
        TermsOfService,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class PrivacyPolicy(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='privacy-policy/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )
    short_description = models.TextField(
        max_length=1000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'payhourr admin added'
    
class PrivacyPolicyItems(models.Model):
    privacyPolicy = models.ForeignKey(
        PrivacyPolicy,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )
    description = models.TextField(
        max_length=5000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class TermsAndConditions(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='terms-and-conditions/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )
    short_description = models.TextField(
        max_length=1000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'payhourr admin added'
    
class TermsAndConditionsItems(models.Model):
    termsAndConditions = models.ForeignKey(
        TermsAndConditions,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )
    description = models.TextField(
        max_length=5000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'
    
class DisputePolicy(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='dispute-policy/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )
    short_description = models.TextField(
        max_length=1000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'payhourr admin added'
    
class DisputePolicyItems(models.Model):
    disputePolicy = models.ForeignKey(
        DisputePolicy,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )
    description = models.TextField(
        max_length=5000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class RefundPolicy(models.Model):
    logo = models.ImageField(
        null=True,
        blank=True,
        upload_to='refund-policy/',
    )
    title = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )
    short_description = models.TextField(
        max_length=1000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'payhourr admin added'
    
class RefundPolicyItems(models.Model):
    refundPolicy = models.ForeignKey(
        RefundPolicy,
        related_name='items',
        on_delete=models.CASCADE,
    )
    item = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )
    description = models.TextField(
        max_length=5000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.item or 'Unnamed Payhourr Item'

class NewsletterSubscribe(models.Model):
    email_or_number = models.CharField(
        max_length=180,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'Newsletter Subscribe Added'
    
class CopyRightText(models.Model):
    text = models.TextField(
        max_length=280,
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs):
        if not self.pk and CopyRightText.objects.exists():
            CopyRightText.objects.all().delete()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'copy right text added by admin'
