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
SetupIconFile=bundle\Poetry\poetry.ico

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Files]
Source: "bundle\Poetry\*"; DestDir: "{app}"; \
  Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\Poetry"; Filename: "{app}\Poetry.bat"; \
  IconFilename: "{app}\poetry.ico"
Name: "{group}\Uninstall Poetry"; \
  Filename: "{uninstallexe}"
Name: "{autodesktop}\Poetry"; Filename: "{app}\Poetry.bat"; \
  IconFilename: "{app}\poetry.ico"; \
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

procedure StopPoetryProcesses;
var
  AppRoot: String;
  ScriptPath: String;
  ScriptText: String;
  Args: String;
  ResultCode: Integer;
begin
  AppRoot := Lowercase(ExpandConstant('{app}'));
  ScriptPath := ExpandConstant('{tmp}\poetry-stop.ps1');
  ScriptText :=
    '$app=$args[0].ToLowerInvariant();' + #13#10 +
    '$procs=Get-CimInstance Win32_Process | Where-Object {' +
    '$n=$_.Name.ToLowerInvariant();' +
    '(($n -eq ''java.exe'') -or ($n -eq ''javaw.exe'') ' +
    '-or ($n -eq ''postgres.exe'') -or ($n -eq ''pg_ctl.exe'')) ' +
    '-and ((($_.ExecutablePath) -and ' +
    '$_.ExecutablePath.ToLowerInvariant().StartsWith($app+''\'')) ' +
    '-or (($_.CommandLine) -and ' +
    '$_.CommandLine.ToLowerInvariant().Contains($app)))};' + #13#10 +
    '$ids=@($procs | Select-Object -Expand ProcessId -Unique);' + #13#10 +
    'if($ids.Count -gt 0){' +
    'Stop-Process -Id $ids -Force -ErrorAction SilentlyContinue;' +
    'Start-Sleep -Seconds 2}';
  SaveStringToFile(ScriptPath, ScriptText, False);
  Args := '-NoProfile -ExecutionPolicy Bypass -File "' +
    ScriptPath + '" "' + AppRoot + '"';
  Exec('powershell.exe', Args, '', SW_HIDE,
    ewWaitUntilTerminated, ResultCode);
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep = usUninstall then begin
    StopPoetryProcesses;
  end else if CurUninstallStep = usPostUninstall then begin
    if DirExists(ExpandConstant('{app}')) then
      DelTree(ExpandConstant('{app}'), True, True, True);
  end;
end;
