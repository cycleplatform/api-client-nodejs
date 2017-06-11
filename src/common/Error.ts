export interface ErrorResource {
    status?: number;
    code?: ErrorCode;
    title?: string;
    detail?: string;
    source?: string;
}

export interface OAuthError {
    error: string;
    error_description: string;
}

export type ErrorCode = string;
