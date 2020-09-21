# Cycle API Client For NodeJS

For detailed documentation, please see the official [Cycle](http://docs.cycle.io) [Docs.](http://docs.cycle.io)

## Usage and Details

Seeking a CLI instead of our [Portal](http://portal.cycle.io)?

**_Or_** seeking to extend the platform's functionalities? Tie into this REST-based API client and interact programmatically based on your application's needs.

Interaction with this API will require an account within the [Portal](https://portal.cycle.io) and having an active hub with a generated API-key.

All requests follow this format:

```bash
   curl https://api.cycle.io/v1/<resource> \
    -H "Authorization: Bearer API_KEY" \
    -H "X-Hub-Id=HUB_ID"
```

All API responses return JSON, including errors. There is also support for cross-origin resource sharing, so this API can be used in a client-side web application as well.

## Installation

Install this library using, `npm install @cycleplatform/cycle-api`

Example of using node client with TypeScript to create a new environment.

```typescript
import { Environments } from "@cycleplatform/cycle-api";

/* This is a visualization of the partial response object
 * you receive when creating an Environment. Full response
 * type is avaliable as `Environments.Environment` and can be found at
 * https://docs.cycle.io/api/environments/the-environment-resource
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
    token: process.env.CYCLE_API_KEY,
    hubId: process.env.HUB_ID,
    value: {
      name: "My New Environment",
      cluster: "production",
      // about is an optional field
      about: {
        description: "Test environment"
      },
      features: {
       legacy_networking: false,
      },
      // optional field
      stack: {
        // replace with stack id
        id: STACK_ID,
        // replace with build id
        build_id: BUILD_ID
      }
    }
  });

  if (!response.ok) {
    // do something with the error
    console.log(response.error);
    return;
  }

  // do something with successful reponse
  console.log(response.value);
  return;
}

createEnv();

//
```

# Contributing

We accept issues and PRs from the community! Any and all feedback is greatly appreciated. The public repository can be found [here](https://github.com/cycleplatform/api-client-nodejs).
