from django.urls import path
from api.configuration.views.what_is_payhourr import WhatIsPayhourrViewSet
from api.configuration.views.why_use_payhourr import WhyUsePayhourrViewSet
from api.configuration.views.our_mission import OurMissionViewSet
from api.configuration.views.contact import ContactViewSet
from api.configuration.views.buyer_guide import BuyerGuideViewSet
from api.configuration.views.seller_guide import SellerGuideViewSet
from api.configuration.views.secure_payment_process import SecurePaymentProcessViewSet
from api.configuration.views.faq import FaqViewSet
from api.configuration.views.terms_of_service import TermsOfServiceViewSet
from api.configuration.views.privacy_policy import PrivacyPolicyViewSet
from api.configuration.views.terms_and_conditions import TermsAndConditionsViewSet
from api.configuration.views.dispute_policy import DisputePolicyViewSet
from api.configuration.views.refund_policy import RefundPolicyViewSet

urlpatterns = [
    path(
        'what-is-payhourr/',
        WhatIsPayhourrViewSet.as_view(),
        name='what_is_payhourr'
    ),
    path(
        'why-use-payhourr/',
        WhyUsePayhourrViewSet.as_view(),
        name='why_use_payhourr'
    ),
    path(
        'our-mission/',
        OurMissionViewSet.as_view(),
        name='why_use_payhourr'
    ),
    path(
        'contact/',
        ContactViewSet.as_view(),
        name='contact'
    ),
    path(
        'buyer-guide/',
        BuyerGuideViewSet.as_view(),
        name='buyer_guide'
    ),
    path(
        'seller-guide/',
        SellerGuideViewSet.as_view(),
        name='seller_guide',
    ),
    path(
        'secure-payment-process/',
        SecurePaymentProcessViewSet.as_view(),
        name='secure_payment_process',
    ),
    path(
        'faq/',
        FaqViewSet.as_view(),
        name='faq',
    ),
    path(
        'terms-of-service/',
        TermsOfServiceViewSet.as_view(),
        name='terms_of_service',
    ),
    path(
        'privacy-policy/',
        PrivacyPolicyViewSet.as_view(),
        name='privacy_policy',
    ),
    path(
        'terms-and-conditions/',
        TermsAndConditionsViewSet.as_view(),
        name='terms_and_conditions',
    ),
    path(
        'dispute-policy/',
        DisputePolicyViewSet.as_view(),
        name='dispute_policy',
    ),
    path(
        'refund-policy/',
        RefundPolicyViewSet.as_view(),
        name='refund_policy',
    ),
]
