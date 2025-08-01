export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: number;
            username: string;
            email: string;
            role: string;
            image: string | null;
        };
        tokens: {
            refresh_token: string;
            access_token: string;
        };
    };
};
