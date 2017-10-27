export interface Token {
    access_token: string;
    token_type: string;
    expires_in: number;
    created?: number;
    refresh_token: string;
    scope: string;
}
