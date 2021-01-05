# Cycle API Client For NodeJS

Seeking to extend the platform's functionalities? Tie into this REST-based API client and interact programmatically based on your application's needs.

For detailed documentation, please see the official [Cycle API Docs](https://docs.cycle.io/api/introduction)

## Details

Seeking to extend the platform's functionalities? Tie into this REST-based API client and interact programmatically based on your application's needs.

All requests follow this format:

```bash
   curl https://api.cycle.io/v1/<resource> \
    -H "Authorization: Bearer API_KEY" \
    -H "X-Hub-Id=HUB_ID"
```

All API responses are returned as JSON. There is also support for cross-origin resource sharing, meaning this API can be used in a client-side web application as well.

# Requirements

- Active account on the [Cycle Platform](https://portal.cycle.io)
- Active hub with [infrastructure provider(s)](https://docs.cycle.io/infrastructure/providers/adding-providers/) added to take advantage of full API
- Generated [API key](https://docs.cycle.io/hubs/api-access/generating-api-keys/)

### NPM

`npm install @cycleplatform/cycle-api`

### Yarn

`yarn add @cycleplatform/cycle-api`

## Usage

Using node client with TypeScript to create a new environment.

**Request:**

To perform this request [environment-create permissions](https://docs.cycle.io/hubs/members-permissions/roles-and-permissions/) are necessary.

```typescript
import { Environments } from "@cycleplatform/cycle-api";

/* This is a visualization of the partial response object
 * you receive when creating an Environment. Full response
 * type is avaliable as `Environments.Environment` and can be found here
*/
type EnvironmentT = {
  id: string;
  name: string;
  cluster: string;
  about?: {
    description: string;
    favorite: boolean;
  };
  ...
};

async function createEnv() {
  const response: Environments.Environment = Environments.create({
    // sensative keys should always be stored and an env variable
    token: process.env.CYCLE_API_KEY,
    hubId: process.env.HUB_ID,
    value: {
      name: "My New Environment",
      cluster: "production",
      // About is an optional field
      about: {
        description: "Test environment"
      },
      features: {
       legacy_networking: false,
      },
      // Stacks is an optional field
      stack: {
        // replace with stack id
        id: STACK_ID,
        // replace with build id
        build_id: BUILD_ID
      }
    }
  });

  if (!response.ok) {
    // Do something with the error
    console.log(response);
    return;
  }

  // Do something with successful reponse
  console.log(response);
  return;
}

createEnv();
```

**Successful Response:**

This response has been truncated. To view the full response of creating an environment, please click [here](https://docs.cycle.io/api/environments/the-environment-resource).

```json
// console.log(response)
{
  "ok": true,
  "error": {},
  "value": {
    "data": {
      "id" : "5cec602e4146380001934759",
      "name": "My New Environment",
      "about" : {
        "description": "Test environment",
        "favorite": false,
      },
      "cluster":  "prodction",
      ...
    }
  }
}
```

**Failed Response:**

All failed API requests follow the same error response format. To view more details about the error response object, please click [here](https://docs.cycle.io/api/basics/errors).

```json
// console.log(response)
// This error would be given if the cluster does not exist
{
  "ok": false,
  "error": {
    "status": 422,
    "code": "422.invalid_input",
    "title": "Cluster is not valid"
  },
  "value": {}
}
```

**Error Response Codes:**

<details>
<summary>Cycle Specific Network Errors — 0's</summary>

- 0.network_error
- 0.parse_error

</details>

<details>
<summary>Client Error Responses — 400's</summary>

- 400.invalid_syntax
- 401.auth_invalid
- 401.auth_expired
- 401.no_cookie
- 401.unauthorized_application
- 403.mismatch
- 403.not_ready
- 403.expired
- 403.restricted_portal
- 403.permissions
- 403.invalid_ip
- 403.invalid_state
- 403.not_approved
- 403.not_allowed
- 403.2fa_required
- 403.2fa_failed
- 403.new_application_capabilities
- 403.tier_restricted
- 404.hub
- 404.hub.invitation
- 404.sdn_network
- 404.environment
- 404.hub.api_key
- 404.uri
- 404.provider
- 404.stack
- 404.notification
- 404.stack_build
- 404.stack_hook
- 404.image
- 404.job
- 404.order
- 404.billing_service
- 404.billing_credit
- 404.invoice
- 404.node
- 404.infrastructure_location
- 404.infrastructure_ip
- 404.infrastructure_server
- 404.infrastructure_model
- 404.account
- 404.container
- 404.vpn_account
- 404.instance
- 404.dns_zone
- 404.dns_record
- 404.cluster
- 404.email_verification
- 404.promo_code
- 404.billing.tier
- 404.payment_method
- 404.hub.membership
- 404.announcement
- 404.ha_service_session
- 409.duplicate_found
- 415.invalid_content_type
- 422.missing_argument
- 422.invalid_argument
- 422.invalid_input
- 422.not_compatible
- 422.already_exists
- 429.rate_limiting

</details>

<details>
<summary>Internal Error Responses — 500's</summary>

- 500.database
- 500.database_insert
- 500.database_update
- 500.database_remove
- 500.jobd
- 500.unknown
- 500.email
- 500.payment_gateway
- 503.not_ready
- 503.not_enabled
- 503.dependency_not_enabled

</details>

## Contributing

We accept issues and PRs from the community! Any and all feedback is greatly appreciated. The public repository can be found here.
