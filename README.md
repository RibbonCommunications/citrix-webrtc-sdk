# Ribbon's Citrix WebRTC JavaScript SDK

## Install

### Using npm :

`$ npm install @rbbn/citrix-webrtc-sdk`

#### Install a particular build :

To install a particular build branch or beta branch with the Github URL, run:

`$ npm install https://github.com/RibbonCommunications/citrix-webrtc-sdk#<build number or "beta"> --save`

## Documentation

The information about tutorials and documents can be found in the links below

* `Documents`: [docs](https://RibbonCommunications.github.io/citrix-webrtc-sdk/docs)

* `Tutorials`: [Getting Started](https://RibbonCommunications.github.io/citrix-webrtc-sdk/tutorials/index.html#/Getting%20Started)

## Known Issues / Limitations

#### Calls
- Replacing a Track (`call.replaceTrack()`) causes two-way audio loss. Resolved when using Citrix Workspace App for Linux 2405 or higher.
- Outgoing calls don't have remote media after being established (Electron only)

#### Devices
- Multiple devices of same type/model have identical deviceIds
- Devices not always grouped together properly

#### Media
- getUserMedia does not return a valid MediaStream object
- Direct access of AudioContext not currently supported/doesn't work as expected
- No ability to play local audio file

#### Video calls
- When this SDK is used in a browser, video calls do not work correctly. Only audio calls should be tested.
- Video calls may use the wrong camera if more than one present
- Errors may be visible in the console when ending video calls

#### HID
- No HID signalling provided by Citrix SDK
- Regular USB headset should be used
- HID SDK/Driver combination should continue to work

#### Environment
- IPC - requires addition of `winreg` dependency in Electron main process if our preloads are used (Electron only)

#### Miscellaneous
- No notification / event when Teardown completes
- Citrix Workspace App for Linux (eLux) version 2309 or higher required
- No handling or notification of Citrix lifecycle events (e.g. channel reconnect)
- E911 event & API return malformed data on eLux/Linux. Resolved when using Citrix Workspace App for Linux 2405 or higher.
