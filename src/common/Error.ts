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

export type ErrorCode = 
| "0.network_error" // this client only
| "404.project"
| "404.project_invitation"
| "404.environment"
| "404.api_key"
| "404.request"
| "401.auth_invalid"
| "401.auth_expired"
| "404.provider"
| "404.stack"
| "404.stack_build"
| "404.job"
| "404.order"
| "404.billing_service"
| "404.node"
| "404.infrastructure_datacenter"
| "404.infrastructure_servers"
| "404.account"
| "404.email_verification"
| "404.promo_code"
| "404.tier"
| "404.payment_method"
| "422.already_exists"
| "403.project_mismatch" 
| "403.restricted_portal"
| "403.sign_up"
| "400.invalid_syntax" 
| "403.permissions"
| "403.wrong_scope"
| "403.key_disallowed"
| "422.missing_argument"
| "422.invalid_argument"
| "422.invalid_input"
| "422.not_compatible"
| "500.database"
| "500.database_insert"
| "500.database_update"
| "500.database_remove"
| "500.jobd"
| "500.unknown"
| "500.email"
| "415.invalid_content_type"
| "500.payment_gateway";