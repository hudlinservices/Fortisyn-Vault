---
title: "Network Architecture (Ubiquiti / UniFi)"
category: "concept"
tags:
  - infrastructure
  - networking
  - ubiquiti
  - unifi
  - vlan
  - starlink
source: "WebSearch + WebFetch — Ubiquiti Help Center, UniFi planning guides (2026); grounded in vault ChatGPT-export conversations"
date: "2026-06-17"
---
# Network Architecture (Ubiquiti / UniFi)

The on-premises networking platform behind Fortisyn's connectivity. Where [[40-Resources/cloud-deployment-infrastructure|Cloud Deployment]] covers how software is *hosted*, this page covers how sites are *connected and segmented* — the LAN, WAN, and remote-management layer. The platform of choice across [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] and the [[10-Projects/innovatience/lab-network|Innovatience lab-network]] client work is **Ubiquiti UniFi**.

## Why UniFi

UniFi is a single-vendor ecosystem — gateway, switches, access points, cameras, and the management controller all integrate through one console (`ui.com` / the UniFi Network controller). For a managed-IT shop serving many entities and a remote testbed in [[40-Resources/costa-rica|Costa Rica]], that consolidation is the value: one pane of glass, remote management, consistent VLAN/firewall policy across sites.

## Core Hardware

| Device | Role | Vault context |
|--------|------|---------------|
| **UniFi Dream Machine Pro (UDM-Pro)** | All-in-one gateway/router/controller for a site | The reference gateway for VLAN segmentation |
| **UniFi Dream Wall (UDW-US)** | Wall-mounted all-in-one gateway + switch + Wi-Fi | Deployed at a client site, set up remotely over Starlink (vault conversation) |
| **UniFi switches / APs** | 802.1Q-aware switching, Wi-Fi with per-SSID VLAN tagging | Carry the segmented networks to ports and SSIDs |

## VLAN Segmentation

The backbone technique. UniFi gateways support native **802.1Q VLAN tagging** (VLAN IDs 1–4094). Segmentation is created in the controller's **Networks** tab, then tagged onto switch ports and Wi-Fi SSIDs, with firewall rules controlling inter-VLAN traffic. Purpose:

- **Security** — isolate device classes so a compromise in one segment can't spread. IoT and smart-home gear (see [[40-Resources/home-automation-stack|Home Automation Stack]]) sits on its own VLAN, walled off from trusted devices.
- **Performance** — contain broadcast traffic per segment.
- **Multi-tenancy** — one physical network, isolated logical networks per entity/client. This is the concrete mechanism behind Hudlin Services' "VLAN segmentation — isolated networks per entity/client" claim.

## Remote Site Management

UniFi's `ui.com` cloud console lets Hudlin Services adopt and manage gateways at remote sites without being on-premises:

- The client's gateway (e.g. a Dream Wall) is **adopted into a UniFi site** under Hudlin Services' `ui.com` account.
- An on-site contact does the initial physical hookup; Hudlin Services takes over remotely to configure everything.
- Upstream WAN is whatever the site has — including **[Starlink](https://www.starlink.com)** in connectivity-constrained locations like rural Costa Rica.

> Vault evidence: *"Starlink and Dream Wall setup"* ([[chatgpt-conversations/hudlin-services/|Hudlin Services]]) — hooking a client's Starlink to a Ubiquiti Dream Wall (UDW-US), adopting it into a `ui.com` site, and completing setup remotely. Related conversations: *"UDM Pro VPN setup"*, *"Adopt UniFi AP troubleshooting"*, *"UDW U7 Lite adoption"*, *"Assign WAN per network"*, *"Setting static IPs"*, *"AP signal improvement tips"*.

## Starlink as WAN

For [[40-Resources/costa-rica|Costa Rica]] and other low-infrastructure sites, **Starlink** provides the upstream link. Two consequences ripple through the rest of the stack:

1. Starlink uses **CGNAT** — no public inbound IP — which is exactly why Fortisyn reaches its services via [[40-Resources/cloud-deployment-infrastructure|Cloudflare Tunnel]] (outbound-only) rather than port forwarding.
2. It makes the [[10-Projects/soleriatechnology/_corporate-hub|Soleria]] smart-home testbed at [[10-Projects/ladolceniente/_corporate-hub|La Dolce Niente]] viable without local fiber.

## Connections

- [[10-Projects/innovatience/lab-network|Lab Network]] — a live Innovatience project: re-architecting client CR-LAB's network on the Ubiquiti platform (see Research Notes added there)
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — provides "Internet & Connectivity" and "VLAN segmentation" using this platform
- [[40-Resources/home-automation-stack|Home Automation Stack]] — IoT devices live on an isolated VLAN configured here
- [[40-Resources/cloud-deployment-infrastructure|Cloud Deployment]] — why CGNAT pushes ingress to Cloudflare Tunnel
- [[40-Resources/costa-rica|Costa Rica]] — Starlink WAN + remote management make the testbed work
- [[10-Projects/royhudlin/professional-history|Professional History]] — Roy's network/low-voltage design background ([[40-Resources/security-systems-consulting|systems consulting]])

## Sources

- [Ubiquiti Help Center — Creating Virtual Networks (VLANs)](https://help.ui.com/hc/en-us/articles/9761080275607-Creating-Virtual-Networks-VLANs)
- [UniFi Network Planning — Considerations for the UDM-Pro](https://unifiplanner.com/blog/network-planning-considerations-for-the-unifi-dream-machine-pro-udm-pro)
- [LazyAdmin — How to Setup and Secure UniFi VLAN](https://lazyadmin.nl/home-network/unifi-vlan-configuration/)
- [Best UniFi Smart Home Ecosystem Setup 2026 — Smart Home Explorer](https://www.smarthomeexplorer.com/guides/best-unifi-smart-home-ecosystem-2026)
- Vault ChatGPT-export conversations: *Starlink and Dream Wall setup*, *UDM Pro VPN setup*, *Adopt UniFi AP troubleshooting*
</content>
