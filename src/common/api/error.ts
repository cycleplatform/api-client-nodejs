/**
 * Standard error object returned from Cycle's API
 */
export interface ErrorResource {
  status?: number;
  code?: ErrorCode;
  title?: string;
  detail?: string;
  source?: string;
}

/**
 * Error returned from Cycle's OAuth server
 * (matches OAuth 2.0 spec)
 */
export interface OAuthError {
  error: string;
  error_description: string;
}

/**
 * List of error codes that can be returned from the API.
 * C_0_NETWORK_ERROR is specific to this library,
 * signifying the network was unreachable and thus a response
 * could not be generated.
 */
export enum ErrorCode {
  C_0_NETWORK_ERROR = "0.network_error", // Browser only, issued if fetch fails

  C_400_INVALID_SYNTAX = "400.invalid_syntax",

  C_401_AUTH_INVALID = "401.auth_invalid",
  C_401_AUTH_EXPIRED = "401.auth_expired",
  C_401_INVALID_API_KEY = "401.invalid_api_key",

  C_403_HUB_MISMATCH = "403.hub_mismatch",
  C_403_HUB_NOT_READY = "403.hub_not_ready",
  C_403_ENVIRONMENT_NOT_READY = "403.environment_not_ready",
  C_403_PIPELINE_NOT_READY = "403.pipeline_not_ready",
  C_403_PORTAL_RESTRICTED = "403.restricted_portal",
  C_403_SIGNUP_RESTRICTED = "403.sign_up",
  C_403_PERMISSIONS = "403.permissions",
  C_403_WRONG_SCOPE = "403.wrong_scope",
  C_403_KEY_DISALLOWED = "403.key_disallowed",
  C_403_INVALID_STATE = "403.invalid_state",

  C_404_HUB = "404.hub",
  C_404_HUB_INVITATION = "404.hub_invitation",
  C_404_ENVIRONMENT = "404.environment",
  C_404_PIPELINE = "404.pipeline",
  C_404_PIPELINE_HOOK = "404.pipeline_hook",
  C_404_API_KEY = "404.api_key",
  C_404_REQUEST = "404.request",
  C_404_PROVIDER = "404.provider",
  C_404_STACK = "404.stack",
  C_404_NOTIFICATION = "404.notification",
  C_404_STACK_BUILD = "404.stack_build",
  C_404_IMAGE = "404.image",
  C_404_JOB = "404.job",
  C_404_ORDER = "404.order",
  C_404_BILLING_SERVICE = "404.billing_service",
  C_404_INVOICE = "404.invoice",
  C_404_NODE = "404.node",
  C_404_INFRASTRUCTURE_DATACENTER = "404.infrastructure_datacenter",
  C_404_INFRASTRUCTURE_SERVERS = "404.infrastructure_servers",
  C_404_ACCOUNT = "404.account",
  C_404_CONTAINER = "404.container",
  C_404_VOLUME_USER_ACCOUNT = "404.volume_user_account",
  C_404_VPN_ACCOUNT = "404.vpn_account",
  C_404_INSTANCE = "404.instance",
  C_404_DNS_ZONE = "404.dns_zone",
  C_404_DNS_RECORD = "404.dns_record",
  C_404_CLUSTER = "404.cluster",
  C_404_PLATFORM_BUILD = "404.platform_build",
  C_404_CYCLEOS_BUILD = "404.cycleos_build",
  C_404_EMAIL_VERIFICATION = "404.email_verification",
  C_404_PROMO_CODE = "404.promo_code",
  C_404_TIER = "404.tier",
  C_404_PAYMENT_METHOD = "404.payment_method",
  C_404_HUB_MEMBERSHIP = "404.hub_membership",

  C_409_DUPLICATE_FOUND = "409.duplicate_found",

  C_415_INVALID_CONTENT_TYPE = "415.invalid_content_type",

  C_422_ALREADY_EXISTS = "422.already_exists",
  C_422_MISSING_ARGUMENT = "422.missing_argument",
  C_422_INVALID_ARGUMENT = "422.invalid_argument",
  C_422_INVALID_INPUT = "422.invalid_input",
  C_422_INVALID_EMAIL_VERIFICATION = "422.invalid_input",
  C_422_NOT_COMPATIBLE = "422.not_compatible",
  C_422_ELEVATED_SUPPORT_PLAN_REQUIRED = "422.elevated_support_plan_required",

  C_500_DATABASE = "500.database",
  C_500_DATABASE_INSERT = "500.database_insert",
  C_500_DATABASE_UPDATE = "500.database_update",
  C_500_DATABASE_REMOVE = "500.database_remove",
  C_500_JOBD = "500.jobd",
  C_500_UNKNOWN = "500.unknown",
  C_500_EMAIL = "500.email",
  C_500_PAYMENT_GATEWAY = "500.payment_gateway",
  C_503_VPN_NOT_READY = "503.vpn_not_ready",
}
