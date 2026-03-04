; File: installer.iss
; Purpose: Inno Setup script that packages the Poetry app bundle
; into a professional Windows installer EXE. Handles shortcuts,
; registry, uninstall, and U.are.U RTE silent driver install.
; All Rights Reserved. Arodi Emmanuel

[Setup]
AppName=Poetry
AppVersion=1.0.0
AppPublisher=Arodi Emmanuel
DefaultDirName={autopf}\Poetry
DefaultGroupName=Poetry
OutputDir=Output
OutputBaseFilename=PoetrySetup-1.0.0
Compression=lzma2/ultra64
SolidCompression=yes
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64
PrivilegesRequired=admin
WizardStyle=modern
UninstallDisplayName=Poetry
MinVersion=10.0

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Files]
Source: "bundle\Poetry\*"; DestDir: "{app}"; \
  Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\Poetry"; Filename: "{app}\Poetry.bat"
Name: "{group}\Uninstall Poetry"; \
  Filename: "{uninstallexe}"
Name: "{autodesktop}\Poetry"; Filename: "{app}\Poetry.bat"; \
  Tasks: desktopicon

[Tasks]
Name: "desktopicon"; \
  Description: "Create desktop shortcut"; \
  GroupDescription: "Additional shortcuts:"

[Run]
; Silent install U.are.U RTE drivers
Filename: "msiexec"; \
  Parameters: "/i ""{app}\native\rte-x64\setup.msi"" /qn /norestart"; \
  StatusMsg: "Installing fingerprint drivers..."; \
  Flags: runhidden waituntilterminated; \
  Check: not IsRteInstalled

; Launch app after install
Filename: "{app}\Poetry.bat"; \
  Description: "Launch Poetry"; \
  Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: "msiexec"; \
  Parameters: "/x ""{app}\native\rte-x64\setup.msi"" /qn /norestart"; \
  Flags: runhidden waituntilterminated

[Code]
function IsRteInstalled: Boolean;
var
  KeyExists: Boolean;
begin
  KeyExists := RegKeyExists(
    HKLM, 'SOFTWARE\DigitalPersona'
  );
  Result := KeyExists;
end;
