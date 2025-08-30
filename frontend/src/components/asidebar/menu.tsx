import type { MenuItemProps } from "../../types/menu/menuProps";
import { ReactIcons } from "../../utils/ReactIcons";
const { BsChatFill, FaBorderAll, FaWallet, MdOutlinePayment, MdDashboard, FaNetworkWired, BiGitPullRequest, MdManageAccounts, BiSupport } = ReactIcons

export const SellerMenu: MenuItemProps[] = [
    {
        id: 1,
        name: 'Seller Dashboard',
        path: '',
        icon: <MdDashboard className="text-2xl" />
    },
    {
        id: 2,
        name: 'Incoming Connection Requests',
        path: '/incoming-connection-requests/',
        icon: <BiGitPullRequest className="text-2xl" />
    },
    {
        id: 3,
        name: 'My Connected Buyer',
        path: '/my-connected-buyer/',
        icon: <FaNetworkWired className="text-2xl" />
    },
    {
        id: 4,
        name: 'Chat',
        path: '/chat/',
        icon: <BsChatFill className="text-2xl" />,
    },
    {
        id: 5,
        name: 'Order',
        path: '/order/',
        icon: <FaBorderAll className="text-2xl" />,
    },
    {
        id: 6,
        name: 'My Wallet',
        path: '/my-wallet/',
        icon: <FaWallet className="text-2xl" />
    },
    {
        id: 7,
        name: 'Support',
        path: '/support/',
        icon: <BiSupport className="text-2xl" />
    },
    {
        id: 8,
        name: 'Payment History',
        path: '/payment-history/',
        icon: <MdOutlinePayment className="text-2xl" />,
    },
    {
        id: 9,
        name: 'My Account',
        path: '/settings/',
        icon: <MdManageAccounts className="text-2xl" />
    },
];

export const AdminMenu = [
    {
        id: 1,
        name: 'Admin Dashboard',
        path: '',
    },
    {
        id: 2,
        name: 'All Users',
        path: '/all-users/',
    },
    {
        id: 3,
        name: 'Chat',
        path: '/admin/chat/',
    },
    {
        id: 4,
        name: 'Transactions',
        path: '/transactions/',
    },
    {
        id: 5,
        name: 'Work Completed & Pending Approvals',
        path: '/work-completed-pending-approvals/',
    },
    {
        id: 6,
        name: 'Withdraw Requests',
        path: '/withdraw-requests/',
    },
    {
        id: 7,
        name: 'Deposit Requests',
        path: '/deposit-requests/',
    },
    {
        id: 8,
        name: 'Dispute Managment',
        path: '/dispute-managment/',
    },
];

export const BuyerMenu: MenuItemProps[] = [
    {
        id: 1,
        name: 'Buyer Dashboard',
        path: '',
        icon: <MdDashboard className="text-2xl" />
    },
    {
        id: 2,
        name: 'Incoming Connection Requests',
        path: '/incoming-connection-requests/',
        icon: <BiGitPullRequest className="text-2xl" />
    },
    {
        id: 3,
        name: 'My Connected Seller',
        path: '/my-connected-seller/',
        icon: <FaNetworkWired className="text-2xl" />
    },
    {
        id: 4,
        name: 'Chat',
        path: '/chat/',
        icon: <BsChatFill className="text-2xl" />,
    },
    {
        id: 5,
        name: 'Order',
        path: '/order/',
        icon: <FaBorderAll className="text-2xl" />,
    },
    {
        id: 6,
        name: 'My Wallet',
        path: '/my-wallet/',
        icon: <FaWallet className="text-2xl" />
    },
    {
        id: 7,
        name: 'Support',
        path: '/support/',
        icon: <BiSupport className="text-2xl" />
    },
    {
        id: 8,
        name: 'My Account',
        path: '/settings/',
        icon: <MdManageAccounts className="text-2xl" />
    },
    {
        id: 9,
        name: 'Payment History',
        path: '/payment-history/',
        icon: <MdOutlinePayment className="text-2xl" />,
    },
];
