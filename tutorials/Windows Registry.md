[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

# Windows Registry

This SDK must be able to read data from the Windows Registry while the application is running.

The data that is read from the Registry is not added automatically by the SDK or other Ribbon software, so it must be added by some other means.

## The Registry Data

When used in [Electron](https://www.electronjs.org/), the data that must be read from the Registry is simply the application's name as it exists on disk, such as "myElectronApp.exe".

When used in a browser, the data that must be read from the Registry is the name of the browser's executable file, such as "chrome.exe".

The .exe extension must always be included.

## Registry Path

On a 64-bit Windows 10 system, this data is to be added to the Registry under Computer\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Citrix\WebSocketService\ProcessWhitelist.

The "WebSocketService" key must be added if it doesn't already exist. Under WebSocketService, a new Multi-String entry (REG_MULTI_SZ) entitled "ProcessWhitelist" must be added. The value for this key is your application name (e.g. myElectronApp.exe).

Note that other versions of Windows may use path 'Wow6432Node' instead of 'WOW6432Node'. The path may also be different for a 32-bit Windows machine.

## Writing the data in the Registry

The application's name can simply be added to the Registry manually using the Windows Registry Editor. For a single user or a standalone system, this is easiest.

On a Windows Enterprise network, other alternatives such as Group Policies may be used to create or modify Registry entries. This should be discussed with your IT department.

## Writing the data programmatically

It is possible to write the data to the Registry directly from Electron's main process when the app starts up using a Registry tool such as [node-winreg](https://fresc81.github.io/node-winreg/). Popular Electron application builders such as [electron-builder](https://github.com/electron-userland/electron-builder) provide the ability to include [NSIS](https://nsis-dev.github.io/) scripts that can add and remove Registry entries when the application is installed/removed.

However, **note that "elevated" (i.e. Administrator) Windows priviledges are required to modify the HKLM Registry path**. If your Electron app attempts to modify data under HKLM, it will fail unless the app is run as Administrator, which is likely not desirable. The NSIS approach described next requires that the application **installer** and uninstaller be run with elevated priviledges. While this also may not be desirable, it's certainly better than having users run the app as Administrator all the time.

### NSIS

A sample NSIS script is provided [here](./registry/installer.nsh).

### Formatting the application name for use in NSIS

Unfortunately, in order use an NSIS script to write any data to the Registry in REG_MULTI_SZ or other "binary" formats (REG_BINARY, REG_QWORD, REG_EXPAND_SZ, etc.), it must first be converted to 'Regedit Version 5.0 format'.

In the sample script, you'll see a long hex-like string following WriteRegMultiStr: `6d,00,79,00,45,00,6c,00,65,00,63,00,74,00,72,00,6f,00,6e,00,41,00,70,00,70,00,2e,00,65,00,78,00,65,00,00,00,00,00`. This is the string "myElectronApp.exe" converted to the required format. The process conversion is as follows:

#### Conversion example

The first step in converting your application's name to the required format is to first convert it from an ASCII string to regular hexadecimal, i.e. 'a' = 0x61, 'b' = 0x62, etc.

A good online converter can be found at https://www.branah.com/ascii-converter.

Here is a full example with all the steps required to convert the string 'myElectronApp.exe' into the format required for use in an NSIS script.

1. Go to https://www.branah.com/ascii-converter
2. Enter 'myElectronApp.exe' in the ASCII box.
3. Click the "Convert" button above the Hex box (if it doesn't convert automatically). The result should be `0x6d0x790x450x6c0x650x630x740x720x6f0x6e0x410x700x700x2e0x650x780x65`
   Paste this value into an editor of your choice.
4. Remove the leading "0x" (Result is now `6d0x790x450x6c0x650x630x740x720x6f0x6e0x410x700x700x2e0x650x780x65`)
5. Convert the rest of the instances of "0x" to "," (`6d,79,45,6c,65,63,74,72,6f,6e,41,70,70,2e,65,78,65`)
6. Make each character 2 bytes wide, so `6d` becomes `6d,00` (`6d,00,79,00,45,00,6c,00,65,00,63,00,74,00,72,00,6f,00,6e,00,41,00,70,00,70,00,2e,00,65,00,78,00,65,00`)
7. Append `00,00,00,00` to signify the end of the entry

Using bash, you could do all of these changes at once in a single command:

```
~  # echo "0x6d0x790x450x6c0x650x630x740x720x6f0x6e0x410x700x700x2e0x650x780x65" | sed -e 's/0x//' -e 's/0x/,00,/g' -e 's/$/,00,00,00,00,00/'
6d,00,79,00,45,00,6c,00,65,00,63,00,74,00,72,00,6f,00,6e,00,41,00,70,00,70,00,2e,00,65,00,78,00,65,00,00,00,00,00
```

This output is what you would use in your NSIS script.

**WARNING** Setting the ProcessWhitelist registry value as shown in the example will overwrite any data that previously existed for that key. This is only a concern if more than one application that uses this SDK will be run on the same PC (e.g. on an application development machine, where the entry 'electron.exe' may also have to be added). NSIS does provided other commands that can be used to read any pre-existing data, so that the new data can be appended to it. Details can be found at the nsis link above.

#### Including the NSIS script in the application build

For an application built using electron-builder, your NSIS script could be included in the build process by adding it to the electron-builder configuration, for example:

```
  "nsis": {
    "include": "nsis-script/installer.nsh"
  }
```

Note that after modifying the Registry, the PC must be restarted for the changes to take effect.
