---
title: "WSL 24.04 VS Code Fix"
date: "2026-06-15"
category: chatgpt-export
source: "Full ChatGPT export"
messages: 25
entity: python-slayers
---

# WSL 24.04 VS Code Fix

**Messages:** 25 | **Entity:** python-slayers

### 1
Having issues starting Visual Studio Code with WSL 24.04, here are the terminal output

[2025-06-24 02:03:19.250] Extension version: 0.99.0
[2025-06-24 02:03:19.250] L10N bundle: none
[2025-06-24 02:03:19.261] authorityHierarchy: wsl+Ubuntu-24.04
[2025-06-24 02:03:19.261] WSL extension activating

### 2
Ahhhh, when I start DOcker Desktop the conflict starts

### 3
Docker Desktop encountered an unexpected error and needs to close.

Search our troubleshooting documentation to find a solution or workaround. Alternatively, you can gather a diagnostics report and submit a support request or GitHub issue.

running engine: waiting for the VM setup to be ready: c

### 4
#1) Output

PS C:\Windows\system32> wsl --shutdown 
>> taskkill /F /IM "Docker Desktop.exe"
>> taskkill /F /IM "com.docker.backend.exe"
>> taskkill /F /IM "vmmem"
>>
ERROR: The process "Docker Desktop.exe" not found.
ERROR: The process "com.docker.backend.exe" not found.
ERROR: The process "vm

### 5
Both Docker Desktop and WSL and Visual Studio Code are install, the issue is Docker Desktop using WSL. In your last set of indtruction you had wsl -list but were looking for docker information why?


*Full conversation in `/home/royhudlin/chatgpt-extract/`.*
