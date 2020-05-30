# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added

- Added `image.created` as a valid hub notification
- `manual` and `ephemeral` are now valid container deployment type
- `Containers.Servers.usable()` call to get servers that this container COULD be deployed to
- `Containers.Instances.create()` and `Containers.Instances.remove()` for containers with deployment strategy of `manual`
- Added instance resource telemetry structures and calls
- Hub activity data structs and collection request
- Email added to public account struct
- Email added to hub member struct
- Added membership permissions

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

## [v1.8.2] - 2020-03-30

### Added

- New image call: `create()`
- New image call: `importImage()`

### Changed

- Adjusted stack build: removed `source` field and added `spec` field, moved git commit info into `about` field
- Images now require two steps to import - Create, then import. This puts it in line with all other processes
- Capability: `images-build` changed to `images-import`

## [v1.8.1] - 2020-03-26

### Added

- Updated stack build struct to match platform
- Added stack build create call for new workflow
- Added stack build import task for doing a build

### Changed

- Removed stack build task in favor of above

## [v1.8.0] - 2020-03-25

### Changed

- Removed job block from state

### Added

- Added job lookup call

## [v1.7.49] - 2020-03-21

### Added

- Added AWS definition to hub provider object

## [v1.7.44] - 2020-03-18

### Fixed

- Fixed type definitions for websocket requests

## [v1.7.43] - 2020-03-18

### Fixed

- Updated all modules to match platform
- Fix websocket definition to import from isomorphic-ws to support node clients

## [v1.3.1] - 2019-06-18

First Major Public Release
