[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

# Getting Started

In this tutorial, we will cover how to get started with setting up the WebRTC JS SDK to run in Citrix proxy mode.

Alongside the WebRTC JS SDK, the library also comes with a Citrix WebRTC SDK. This new Citrix WebRTC SDK provides APIs that can be used for setting up the WebRTC JS SDK to run in Citrix proxy mode. The two main APIs in focus here are `setup` and `teardown`, responsible for setting up Citrix proxy mode and tearing it down, respectively.

## Prerequisites

There are a few prerequisite that must be satisfied before we can successfully setup Citrix proxy mode using the Citrix WebRTC SDK. See the following tutorial trails for more information.

1. [Windows Registry Setup](registry)
2. [Electron IPC](ipc)

## `setup` API

To setup the WebRTC JS SDK to run with the Citrix WebRTC SDK, we simply need to call the `setup` API, providing in the initialized WebRTC JS SDK.

```javascript exclude
// Import the WebRTC JS SDK.
import { create } from '@rbbn/citrix-webrtc-sdk/webrtc'
// Import the Citrix WebRTC SDK
import { setup, teardown } from '@rbbn/citrix-webrtc-sdk/citrix'

// Initialize the WebRTC JS SDK, passing in a configuration object.
const client = create({...})

// Setup Citrix proxy mode
try {
  await setup(client)
} catch (error) {
  // See possible errors in section below.
}
```

## `teardown` API

In order to reverse the above setup and restore the WebRTC JS SDK to normal, we can use the `teardown` API from the Citrix WebRTC SDK.

```javascript exclude
// Import the WebRTC JS SDK.
import { create } from '@rbbn/webrtc-js-sdk'
// Import the Citrix WebRTC SDK
import { setup, teardown } from '@rbbn/citrix-webrtc-sdk'

// ...Citrix proxy mode setup code...

// Teardown Citrix proxy mode from the SDK
try {
  teardown(client)
} catch (error) {
  // See possible errors in section below.
}
```

Now, calls will be made and received as regular calls without Citrix proxy mode.

### API Errors

The `setup` and `teardown` APIs may reject with several errors, as it performs some validation to ensure whether Citrix proxy mode can be setup, or tore down, properly within the WebRTC JS SDK. The `errorCodes` API documentation lists all possible error codes that the APIs may return. In regards to specific error scenarios for the two APIs, refer to the API documentation for the APIs for information on the possible error(s) that can be thrown.

Common errors can be easily avoided/handled by ensuring you are in the right state (e.g., no active calls ongoing, and not already previously setup), and by providing correct parameter(s) to the APIs.

Unlikely error scenarios (version mismatch or Citrix SDK errors) for the `setup` may be a bit trickier when trying determine the root cause and resolving it. If the following recommendations fail, contact support for more help with these errors:

- Verify you are in the correct environment for Citrix to avoid Citrix SDK errors.
- Verify you are not using files from different published versions of the SDKs to avoid version mismatch errors.
