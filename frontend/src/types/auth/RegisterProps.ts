export interface RegisterProps {
    username: string;
    first_name: string;
    last_name: string;
    nid_card_number: string;
    date_of_birth: string;
    email: string;
    number: string;
    nid_front_side: FileList;
    nid_back_side: FileList;
    role: 'buyer' | 'seller' | '';
    payment_number: string;
    password: string;
    confirm_password: string;
    terms_accept: boolean;
}
