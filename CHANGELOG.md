# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.10.6-31](https://github.com/cycleplatform/api-client-nodejs/compare/v1.10.6-30...v1.10.6-31) (2021-05-25)


### Features

* **environment secrets:** initial build out of environment secrets ([f4b931b](https://github.com/cycleplatform/api-client-nodejs/commit/f4b931b5444a24b0d6c3fadc84c6c0d38ba76ada))

### [1.10.6-30](https://github.com/cycleplatform/api-client-nodejs/compare/v1.10.6-29...v1.10.6-30) (2021-05-24)


### Bug Fixes

* **images/origin:** update dockerfile credentials struct ([6f3c680](https://github.com/cycleplatform/api-client-nodejs/commit/6f3c6805eb51614fb4975319b64e6297c48d5035))

### [1.10.6-29](https://github.com/cycleplatform/api-client-nodejs/compare/v1.10.6-28...v1.10.6-29) (2021-05-21)


### Features

* **resources/images/origin:** add in new registry credentials struct to Dockerfile struct ([96fb105](https://github.com/cycleplatform/api-client-nodejs/commit/96fb105ab249030a57cedcede996087c056afde5))

## 1.9.6 — 2020-12-30

### Changed

- Updated ReadMe formatting
- Removed unnecessary headings in changelog

## 1.9.5 — 2020-12-29

### Added

- Added `uncollectible` as a new invoice state
- `base_volume_gb` to server features to increase the base volume size
- `container.instances.delete` activity
- Added `flags` to notification response

- Pipeline structures
- Pipeline endpoints
- Pipeline requests

### Changed

- `containerId` => `container_id` for `removeMultiple` instances

### Breaking Changes

- Packet provider changes to Equinix Metal
- `PacketProvider` -> `EquinixMetalProvider`
- `ProviderIdentifier = "packet" | ...` -> `ProviderIdentifier = "equinix_metal" | ...`
- all `counts` metas is not split into `instances_count` and `containers_count`

## 1.9.2

### Added

- Survey structures
- Survey link(s)
- Initialize task action for environments

### Breaking Changes

- Field owner renamed to creator
- Field owners renamed to creators
- Interface OwnerScope renamed to CreatorScope
- Interface OwnerIncludes interface renamed to CreatorIncludes

## 1.8.6

### Fixed

- Updated resource telemetry report return type

### Added

- Ability to delete a hub invite
- Added `contract` to billing support plans
- Added RLimits object to container runtime config
- Added annotations to a container which holds additional information if desired
- Added call to retrieve a hubs current tier and its features
- Added features struct to tier and support plans
- Added `infrastructure.server.services.sftp.lockdown.auto` to activity
- Added `infrastructure.server.task.reconfigure_features` to activity
- Servers now have a features struct
- Added task for reconfiguring server features
- Added deprecate boolean to container params
- Billing tiers now include `sdn`
- Added instance resource telemetry to instance dashboards

### Changed

- Session object on hub activity possibly null, as well as api_key within the session object
- Remove trials from api client
- Converted all tasks and activity headers to be dot notation instead of underscores
- Removed deprecate from container `CreateParams`

## 1.8.5

### Fixed

- Return type and link for resource telemetry report was incorrect
- Misspelled `threshold` in instance telemetry snapshot
- Added missing `throttled` field to CPU info on instance telemetry

## 1.8.4

### Added

- Added `image.created` as a valid hub notification
- `manual` and `ephemeral` are now valid container deployment type
- `Containers.Servers.usable()` call to get servers that this container COULD be deployed to
- `Containers.Instances.create()` and `Containers.Instances.remove()` for containers with deployment strategy of `manual`
- Added instance resource telemetry structures and calls
- Hub activity data structs and collection request
- Email added to public account struct
- Email added to hub member struct
- Added membership permissions to users
- Added API calls to get individual memberships and to look up memberships by account id
- Added environment specific permissions to API Keys

### Fixed

- Fixed image tasks to separate into collection tasks and individual tasks
- Hub delete return type has been corrected to be a task object
- Removed `floating_ips` from environment as they no longer exist
- Updated container desired state to support empty
- Query filter type definition now supports nested object
- Fixed structure of provider server features, which was one level too high
- Added missing `new` state to DNS Zones
- Websocket onMessage handlers will no longer throw a `unable to decode payload` error if the user function throws

### Changed

- `importBuild()` -> `generate()`
- Docker Hub image source swaps password for token
- Removed Member struct in favor of full Membership everywhere
- Standardized some error codes, i.e. 404.api_keys -> 404.hub.api_keys
- DNS certificates are now generated per record, and not per zone

## 1.8.2 - 2020-03-30

### Added

- New image call: `create()`
- New image call: `importImage()`

### Changed

- Adjusted stack build: removed `source` field and added `spec` field, moved git commit info into `about` field
- Images now require two steps to import - Create, then import. This puts it in line with all other processes
- Capability: `images-build` changed to `images-import`

## 1.8.1 - 2020-03-26

### Added

- Updated stack build struct to match platform
- Added stack build create call for new workflow
- Added stack build import task for doing a build

### Changed

- Removed stack build task in favor of above

## 1.8.0 - 2020-03-25

### Changed

- Removed job block from state

### Added

- Added job lookup call

## 1.7.49 - 2020-03-21

### Added

- Added AWS definition to hub provider object

## 1.7.44 - 2020-03-18

### Fixed

- Fixed type definitions for websocket requests

## 1.7.43 - 2020-03-18

### Fixed

- Updated all modules to match platform
- Fix websocket definition to import from isomorphic-ws to support node clients

## 1.3.1 - 2019-06-18

First Major Public Release
