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
 * `0.network_error` is specific to this library,
 * signifying the network was unreachable and thus a response
 * could not be generated.
 */
export type ErrorCode =
  // internal
  | "0.network_error"
  | "0.parse_error"

  // 400
  | "400.invalid_syntax"

  // 401
  | "401.auth_invalid"
  | "401.auth_expired"
  | "401.no_cookie"
  | "401.unauthorized_application"

  // 403
  | "403.mismatch"
  | "403.not_ready"
  | "403.expired"
  | "403.restricted_portal"
  | "403.permissions"
  | "403.invalid_ip"
  | "403.invalid_state"
  | "403.not_approved"
  | "403.not_allowed"
  | "403.2fa_required"
  | "403.2fa_failed"
  | "403.new_application_capabilities"

  // 404
  | "404.hub"
  | "404.hub_invitation"
  | "404.sdn_network"
  | "404.environment"
  | "404.environment_egress_gateway"
  | "404.api_key"
  | "404.uri"
  | "404.provider"
  | "404.stack"
  | "404.notification"
  | "404.stack_build"
  | "404.stack_hook"
  | "404.image"
  | "404.job"
  | "404.order"
  | "404.billing_service"
  | "404.billing_credit"
  | "404.invoice"
  | "404.node"
  | "404.infrastructure_location"
  | "404.infrastructure_ip"
  | "404.infrastructure_server"
  | "404.infrastructure_model"
  | "404.account"
  | "404.container"
  | "404.vpn_account"
  | "404.instance"
  | "404.dns_zone"
  | "404.dns_record"
  | "404.cluster"
  | "404.email_verification"
  | "404.promo_code"
  | "404.tier"
  | "404.payment_method"
  | "404.hubs_membership"
  | "404.announcement"
  | "404.ha_service_session"

  // 409
  | "409.duplicate_found"

  // 415
  | "415.invalid_content_type"

  // 422
  | "422.missing_argument"
  | "422.invalid_argument"
  | "422.invalid_input"
  | "422.not_compatible"
  | "422.already_exists"

  // 500
  | "500.database"
  | "500.database_insert"
  | "500.database_update"
  | "500.database_remove"
  | "500.jobd"
  | "500.unknown"
  | "500.email"
  | "500.payment_gateway"

  // 503
  | "503.not_ready"
  | "503.not_enabled";
