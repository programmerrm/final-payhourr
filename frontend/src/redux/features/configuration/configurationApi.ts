import { apiSlice } from "../api/apiSlice";

const configurationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWhatIsPayhourr: builder.query<any, void>({
            query: () => '/configuration/what-is-payhourr/',
        }),
        getwhyUsePayhourr: builder.query<any, void>({
            query: () => '/configuration/why-use-payhourr/',
        }),
        getOurMission: builder.query<any, void>({
            query: () => '/configuration/our-mission/',
        }),
        getContact: builder.query<any, void>({
            query: () => '/configuration/contact/',
        }),
        getBuyerGuide: builder.query<any, void>({
            query: () => '/configuration/buyer-guide/',
        }),
        getSellerGuide: builder.query<any, void>({
            query: () => '/configuration/seller-guide/',
        }),
        getSecurePaymentProcess: builder.query<any, void>({
            query: () => '/configuration/secure-payment-process/',
        }),
        getFaq: builder.query<any, void>({
            query: () => '/configuration/faq/',
        }),
        getTermsOfService: builder.query<any, void>({
            query: () => '/configuration/terms-of-service/',
        }),
        getPrivacyPolicy: builder.query<any, void>({
            query: () => '/configuration/privacy-policy/',
        }),
        getTermsAndConditions: builder.query<any, void>({
            query: () => '/configuration/terms-and-conditions/',
        }),
        getDisputePolicy: builder.query<any, void>({
            query: () => '/configuration/dispute-policy/',
        }),
        getRefundPolicy: builder.query<any, void>({
            query: () => '/configuration/refund-policy/',
        }),
    }),
});



export const {
    useGetWhatIsPayhourrQuery,
    useGetwhyUsePayhourrQuery,
    useGetOurMissionQuery,
    useGetContactQuery,
    useGetBuyerGuideQuery,
    useGetSellerGuideQuery,
    useGetSecurePaymentProcessQuery,
    useGetFaqQuery,
    useGetTermsOfServiceQuery,
    useGetPrivacyPolicyQuery,
    useGetTermsAndConditionsQuery,
    useGetDisputePolicyQuery,
    useGetRefundPolicyQuery,
} = configurationApi;
