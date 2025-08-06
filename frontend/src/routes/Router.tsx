import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../layout/ErrorPage";
import HomePage from "../pages/home/HomePage";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import { RoleBasedDashboard } from "../components/rolebaseddashboard/RoleBasedDashboard";
import AllUsers from "../components/admin/AllUsers";
import Transactions from "../components/admin/Transactions";
import IncomingConnectionRequests from "../components/contributor/IncomingConnectionRequests";
import WorkCompletedPendingApprovals from "../components/admin/WorkCompletedPendingApprovals";
import WithdrawRequests from "../components/admin/WithdrawRequests";
import ManualPaymentReleaseOption from "../components/admin/ManualPaymentReleaseOption";
import DisputeManagment from "../components/admin/DisputeManagment";
import Chat from "../components/contributor/Chat";
import MyWallet from "../components/contributor/MyWallet";
import Dispute from "../components/contributor/Dispute";
import PaymentHistory from "../components/contributor/PaymentHistory";
import WhatIsPayhourr from "../pages/whatispayhourr/WhatIsPayhourr";
import WhyUsePayhourr from "../pages/whyusepayhourr/WhyUsePayhourr";
import OurMission from "../pages/ourmission/OurMission";
import Contact from "../pages/contact/Contact";
import BuyerGuide from "../pages/buyerguide/BuyerGuide";
import SellerGuide from "../pages/sellerguide/SellerGuide";
import SecurePaymentProcess from "../pages/securepaymentprocess/SecurePaymentProcess";
import Faq from "../pages/faq/Faq";
import TermsOfServices from "../pages/termsofservices/TermsOfServices";
import PrivacyPolicy from "../pages/privacypolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/termsandconditions/TermsAndConditions";
import DisputePolicy from "../pages/disputepolicy/DisputePolicy";
import RefundPolicy from "../pages/refundpolicy/RefundPolicy";
import MyConnectedUser from "../components/contributor/MyConnectedUser";

export const Router = createBrowserRouter([
    {
        path: '',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: '/what-is-payhourr/',
                element: <WhatIsPayhourr />,
            },
            {
                path: '/why-use-payhourr/',
                element: <WhyUsePayhourr />,
            },
            {
                path: '/our-mission/',
                element: <OurMission />,
            },
            {
                path: '/contact/',
                element: <Contact />,
            },
            {
                path: '/buyer-guide/',
                element: <BuyerGuide />,
            },
            {
                path: '/seller-guide/',
                element: <SellerGuide />,
            },
            {
                path: '/secure-payment-process/',
                element: <SecurePaymentProcess />,
            },
            {
                path: '/faq/',
                element: <Faq />,
            },
            {
                path: '/terms-of-services/',
                element: <TermsOfServices />,
            },
            {
                path: '/privacy-policy/',
                element: <PrivacyPolicy />,
            },
            {
                path: '/terms-and-conditions/',
                element: <TermsAndConditions />,
            },
            {
                path: '/dispute-policy/',
                element: <DisputePolicy />,
            },
            {
                path: '/refund-policy/',
                element: <RefundPolicy />,
            },
            {
                path: '/forgot-password/',
                element: <ForgotPassword />,
            },
            {
                path: 'dashboard/:username/',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <RoleBasedDashboard />,
                        handle: { title: "Dashboard" },
                    },
                    // 🛠 Admin Routes
                    {
                        path: 'all-users/',
                        element: <AllUsers />,
                        handle: { title: "All - Users" },
                    },
                    {
                        path: 'transactions/',
                        element: <Transactions />,
                        handle: { title: "Transactions" },
                    },
                    {
                        path: 'work-completed-pending-approvals/',
                        element: <WorkCompletedPendingApprovals />,
                        handle: { title: "Work Completed Pending Approvals" },
                    },
                    {
                        path: 'withdraw-requests/',
                        element: <WithdrawRequests />,
                        handle: { title: "Withdraw Requests" },
                    },
                    {
                        path: 'manual-payment-release-option/',
                        element: <ManualPaymentReleaseOption />,
                        handle: { title: "Manual Payment Release Option" },
                    },
                    {
                        path: 'dispute-managment/',
                        element: <DisputeManagment />,
                        handle: { title: "Dispute Managment" },
                    },
                    // 🛠 Contributor Routes
                    {
                        path: 'incoming-connection-requests/',
                        element: <IncomingConnectionRequests />,
                        handle: { title: 'Incoming Connection Requests' }
                    },
                    {
                        path: 'my-connected-buyer/',
                        element: <MyConnectedUser />,
                        handle: { title: 'My Connected Buyer' },
                    },
                    {
                        path: 'my-connected-seller/',
                        element: <MyConnectedUser />,
                        handle: { title: 'My Connected Seller' },
                    },
                    {
                        path: 'chat/',
                        element: <Chat />,
                        handle: { title: 'Chat' },
                    },
                    {
                        path: 'chat/:roomName/',
                        element: <Chat />,
                        handle: { title: 'Chat' },
                    },
                    {
                        path: 'my-wallet/',
                        element: <MyWallet />,
                        handle: { title: 'My Wallet' },
                    },
                    {
                        path: 'dispute/',
                        element: <Dispute />,
                        handle: { title: 'Dispute' },
                    },
                    {
                        path: 'payment-history/',
                        element: <PaymentHistory />,
                        handle: { title: 'Payment History' },
                    },
                ],
            },
        ],
    },
]);
