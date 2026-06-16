---
title: "Kubernetes Setup on DigitalOcean"
date: "2026-06-15"
category: chatgpt-export
source: "Full ChatGPT export"
messages: 300
entity: python-slayers
---

# Kubernetes Setup on DigitalOcean

**Messages:** 300 | **Entity:** python-slayers

### 1
Setup and manage kubernetes cluster with digital ocean doctl, kube, helm and whatever else I need running from cmder on local laptop

### 2
already setup on website and get this error when running "doctl auth init "

doctl auth init
Using token for context default

Validating token... ✘

Error: Unable to use supplied token to access API: GET https://cloud.digitalocean.com/v1/oauth/token/info: 400 (request "edf948f5-2180-4792-88b1-e

### 3
curl -I https://cloud.digitalocean.com/v1/oauth/token/info
curl: (35) schannel: next InitializeSecurityContext failed: CRYPT_E_NO_REVOCATION_CHECK (0x80092012) - The revocation function was unable to check revocation for the certificate.

### 4
λ Invoke-RestMethod -Uri https://cloud.digitalocean.com/v1/oauth/token/info
'Invoke-RestMethod' is not recognized as an internal or external command,
operable program or batch file.

### 5
Invoke-RestMethod -Uri https://cloud.digitalocean.com/v1/oauth/token/info 'Invoke-RestMethod' is not recognized as an internal or external command, operable program or batch file.
λ : The term 'λ' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spell


*Full conversation in `/home/royhudlin/chatgpt-extract/`.*
