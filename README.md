# Sell price calculator
> Sell price calculator based on price range rates

## Requirements
- `nodejs`
- `git`
- `Autohotkey` (for Windows)
- `Git-bash` (for Windows)

## Install
- clone project: `git clone https://github.com/mistical2008/calc-price-cli.git`
- `cd calc-price-cli`
- `npm i .`

## Launch instructions
- Linux:
  - `Coming soon`
- Windows:
  - Install `Autohotkey`
  - Create new `*.ahk` script
  - Paste:
    - ```autohotkey
        #NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
        ; #Warn  ; Enable warnings to assist with detecting common errors.
        SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
        SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
        ^+F12::
        Run, %A_ProgramFiles%\Git\git-cmd.exe --cd-to-home ,,, cmdPID
        WinWait, ahk_pid %cmdPID%
        SendInput, price-calc{Space}
        ```
  - Then press `Ctrl+Shift+F12` and input parameters


## TODO
- [ ] External config for input data (price ranges, rates, qty postfix, roundTo)
- [ ] Rounding for float numbers
- [ ] Set calc without tax