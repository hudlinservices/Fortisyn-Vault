---
title: "Home Assistant Z-Stick setup"
date: "2026-06-15"
category: chatgpt-export
source: "Full ChatGPT export"
messages: 17
entity: hudlin-services
---

# Home Assistant Z-Stick setup

**Messages:** 17 | **Entity:** hudlin-services

### 1
Home Assistant and connecting a Z-Stick 10 Pro

### 2
ls -l /dev/serial/by-id/

I cannot seem to copy the lines from the terminal in home assistant

### 3
ttyUSB0
/dev/serial/by-id/usb-Silicon_Labs_CP2105_Dual_USB_to_UART_Bridge_Controller_00C3AB07-if00-port0
Subsystem:
tty
Device path:
/dev/ttyUSB0
ID:
/dev/serial/by-id/usb-Silicon_Labs_CP2105_Dual_USB_to_UART_Bridge_Controller_00C3AB07-if00-port0
Attributes:
DEVLINKS: >-
  /dev/serial/by-i

### 4
i opened the "configuration.yml" and did not see a serial port setting, just this

# Configure a default setup of Home Assistant (frontend, api, etc)
default_config:

# Text to speech
tts:
  - platform: google_translate

http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 172.30.33.

### 5
Z-Wave JS UI
The add-on is not running. Do you want to start it now?


*Full conversation in `/home/royhudlin/chatgpt-extract/`.*
