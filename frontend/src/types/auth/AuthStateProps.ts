import type { AuthState } from "../user/user";

export interface AuthStateProps {
    user: AuthState | null,
    tokens: {
        access_token: string | null;
        refresh_token: string | null;
    },
};
