---
title: "Cockpit setup with cloudflared"
date: "2026-06-15"
category: chatgpt-export
source: "Full ChatGPT export"
messages: 243
entity: hudlin-services
---

# Cockpit setup with cloudflared

**Messages:** 243 | **Entity:** hudlin-services

### 1
Python, Ubuntu and cloudflared to set up multiple targets of same instance of cockpit

### 2
https://dick.hudlincloud.com/cdn-cgi/access/authorized?nonce=69de2713d519019618a1951d0e7a773f7a5eec0b3da08617b4e7a6940d6ab2f3.1754797735&state=80f04ba5ccd7ca3704f0c712983bbf4db777c72e701c7623aecf10a22782070f.JTdCJTIyaWF0JTIyJTNBMTc1NDc5NzY3NSUyQyUyMmF1dGhEb21haW4lMjIlM0ElMjJodWRsaW4uY2xvdWRmbGFyZWFj

### 3
There are three or more applications of Cloudflared, only one is the target cockpit, the others or on the same network but external to the ubuntu server that the Cloudflared is on

### 4
UDM Pro has what default on a local network?

### 5
tunnel: 86b2db60-36bc-46b1-8c5c-1bdebf4ee76e
credentials-file: /home/dev66/.cloudflared/86b2db60-36bc-46b1-8c5c-1bdebf4ee76e.json

ingress:
  # This is for the local Cockpit
  - hostname: cockpit.hudlincloud.com
    service: https://localhost:9090
    originRequest:
      noTLSVerify: true



*Full conversation in `/home/royhudlin/chatgpt-extract/`.*
