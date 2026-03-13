; File: uninstall.iss
; Purpose: Standalone Inno Setup script that produces un-install.exe
; for Poetry. Kills running processes, removes user data directory,
; removes the install dir, shortcuts, and the fingerprint RTE driver.
; All Rights Reserved Arodi Emmanuel

[Setup]
AppName=Poetry Uninstaller
AppVersion=1.0.0
AppPublisher=Arodi Emmanuel
OutputDir=Output
OutputBaseFilename=un-install
CreateUninstallRegKey=no
Uninstallable=no
PrivilegesRequired=admin
WizardStyle=modern
DefaultDirName={tmp}

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Code]
const
  InstallDir = 'C:\Program Files\Poetry';

procedure KillPoetryProcesses;
var
  InstallRoot: String;
  ScriptPath: String;
  ScriptText: String;
  Args: String;
  ResultCode: Integer;
begin
  InstallRoot := Lowercase(InstallDir);
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
    ScriptPath + '" "' + InstallRoot + '"';
  Exec('powershell.exe', Args,
    '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
end;

procedure RemoveRteDriver;
var
  MsiPath: String;
  ResultCode: Integer;
begin
  MsiPath := InstallDir + '\native\rte-x64\setup.msi';
  if FileExists(MsiPath) then
    Exec('msiexec', '/x "' + MsiPath + '" /qn /norestart',
      '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
end;

procedure RemoveUserData;
var
  LocalAppData: String;
begin
  LocalAppData := GetEnv('LOCALAPPDATA');
  if LocalAppData <> '' then
    DelTree(LocalAppData + '\Poetry', True, True, True);
end;

procedure RemoveShortcuts;
var
  Programs: String;
  Desktop: String;
begin
  Programs := ExpandConstant('{commonprograms}') + '\Poetry';
  Desktop  := ExpandConstant('{commondesktop}') + '\Poetry.lnk';
  if DirExists(Programs) then
    DelTree(Programs, True, True, True);
  if FileExists(Desktop) then
    DeleteFile(Desktop);
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssInstall then begin
    KillPoetryProcesses;
    RemoveRteDriver;
    RemoveUserData;
    RemoveShortcuts;
    if DirExists(InstallDir) then
      DelTree(InstallDir, True, True, True);
    MsgBox('Poetry has been fully removed from this computer.',
      mbInformation, MB_OK);
    Abort;
  end;
end;
