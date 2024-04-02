!macro customInstall
  SetRegView 64
    /**
    * This hex string is "myElectronApp.exe" encoded in Regedit Version 5.0 format.
    * Refer to the instructions in the Registry tutorial
    */
    WriteRegMultiStr /REGEDIT5 HKLM "SOFTWARE\WOW6432Node\Citrix\WebSocketService" "ProcessWhitelist" 6d,00,79,00,45,00,6c,00,65,00,63,00,74,00,72,00,6f,00,6e,00,41,00,70,00,70,00,2e,00,65,00,78,00,65,00,00,00,00,00
!macroend

!macro customUnInstall
  SetRegView 64
    DeleteRegKey HKLM "SOFTWARE\WOW6432Node\Citrix\WebSocketService"
!macroend
