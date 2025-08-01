from django.contrib import admin
from configuration.models import (
    WhatIsPayhourr,
    WhatIsPayhourrItems,
    WhyUsePayhourr,
    WhyUsePayhourrItems,
    OurMission,
    Contact,
    BuyerGuide,
    BuyerGuideItems,
    SellerGuide,
    SellerGuideItems,
    SecurePaymentProcess,
    SecurePaymentProcessItems,
    Faq,
    FaqItems,
    TermsOfService,
    TermsOfServiceItems,
    PrivacyPolicy,
    PrivacyPolicyItems,
    TermsAndConditions,
    TermsAndConditionsItems,
    DisputePolicy,
    DisputePolicyItems,
    RefundPolicy,
    RefundPolicyItems,
    NewsletterSubscribe,
    CopyRightText,
)

# ========== Inline Admin Classes ==========
class WhatIsPayhourrItemsAdmin(admin.TabularInline):
    model = WhatIsPayhourrItems
    extra = 1

class WhyUsePayhourrItemsAdmin(admin.TabularInline):
    model = WhyUsePayhourrItems
    extra = 1

class BuyerGuideItemsAdmin(admin.TabularInline):
    model = BuyerGuideItems
    extra = 1

class SellerGuideItemsAdmin(admin.TabularInline):
    model = SellerGuideItems
    extra = 1

class SecurePaymentProcessItemsAdmin(admin.TabularInline):
    model = SecurePaymentProcessItems
    extra = 1

class FaqItemsAdmin(admin.TabularInline):
    model = FaqItems
    extra = 1

class TermsOfServiceItemsAdmin(admin.TabularInline):
    model = TermsOfServiceItems
    extra = 1

class PrivacyPolicyItemsAdmin(admin.TabularInline):
    model = PrivacyPolicyItems
    extra = 1

class TermsAndConditionsItemsAdmin(admin.TabularInline):
    model = TermsAndConditionsItems
    extra = 1

class DisputePolicyItemsAdmin(admin.TabularInline):
    model = DisputePolicyItems
    extra = 1

class RefundPolicyItemsAdmin(admin.TabularInline):
    model = RefundPolicyItems
    extra = 1

# ========== Parent Admin Classes ==========
class WhatIsPayhourrAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [WhatIsPayhourrItemsAdmin]

class WhyUsePayhourrAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [WhyUsePayhourrItemsAdmin]

class OurMissionAdmin(admin.ModelAdmin):
    list_display = ['description']

class ContactAdmin(admin.ModelAdmin):
    list_display = ['title', 'email', 'phone']

class BuyerGuideAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [BuyerGuideItemsAdmin]

class SellerGuideAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [SellerGuideItemsAdmin]

class SecurePaymentProcessAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [SecurePaymentProcessItemsAdmin]

class FaqAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [FaqItemsAdmin]

class TermsOfServiceAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [TermsOfServiceItemsAdmin]

class PrivacyPolicyAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [PrivacyPolicyItemsAdmin]

class TermsAndConditionsAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [TermsAndConditionsItemsAdmin]

class DisputePolicyAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [DisputePolicyItemsAdmin]

class RefundPolicyAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [RefundPolicyItemsAdmin]

# ========== Register Models ==========
admin.site.register(WhatIsPayhourr, WhatIsPayhourrAdmin)
admin.site.register(WhyUsePayhourr, WhyUsePayhourrAdmin)
admin.site.register(OurMission, OurMissionAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(BuyerGuide, BuyerGuideAdmin)
admin.site.register(SellerGuide, SellerGuideAdmin)
admin.site.register(SecurePaymentProcess, SecurePaymentProcessAdmin)
admin.site.register(Faq, FaqAdmin)
admin.site.register(TermsOfService, TermsOfServiceAdmin)
admin.site.register(PrivacyPolicy, PrivacyPolicyAdmin)
admin.site.register(TermsAndConditions, TermsAndConditionsAdmin)
admin.site.register(DisputePolicy, DisputePolicyAdmin)
admin.site.register(RefundPolicy, RefundPolicyAdmin)
admin.site.register(NewsletterSubscribe)
admin.site.register(CopyRightText)
