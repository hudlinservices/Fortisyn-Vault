---
title: "Home Automation Stack"
category: "concept"
tags:
  - infrastructure
  - home-automation
  - home-assistant
  - zwave
  - zigbee
  - matter
  - soleria
source: "WebSearch + WebFetch — Home Assistant ecosystem guides, Matter/Thread/Z-Wave/Zigbee comparisons (2026); grounded in vault ChatGPT-export conversations"
date: "2026-06-17"
---
# Home Automation Stack

The technical foundation under [[10-Projects/soleriatechnology/_corporate-hub|Soleria Technology]]'s smart-home automation products. Soleria prototypes automations, tests them at [[10-Projects/ladolceniente/_corporate-hub|La Dolce Niente]] in [[40-Resources/costa-rica|Costa Rica]], then productizes them. This page documents the protocols and the hub that make that R&D loop work.

> Soleria is described in the vault as "smart home automation — comfort, security, convenience" with no detail on *what it's built on*. Vault conversations show the real stack: **Home Assistant** as the hub, with **Z-Wave** devices. This page grounds that in the 2026 protocol landscape.

## The Hub — Home Assistant

[Home Assistant](https://www.home-assistant.io) is the open-source automation hub at the center of the stack. Why it fits Soleria's model:

- **Local control / privacy-first** — automations run on-device and keep working when internet drops. Critical for a Costa Rica property on variable [[40-Resources/network-architecture|Starlink]] connectivity.
- **Protocol-agnostic** — supports Zigbee, Z-Wave, Thread, Matter, Wi-Fi, and Bluetooth through USB-dongle expansion, so Soleria isn't locked to one device vendor.
- **Add-on architecture** — e.g. **Z-Wave JS UI** runs as an add-on that talks to a USB Z-Wave controller.

> Vault evidence: *"Home Assistant Z-Stick setup"* ([[chatgpt-conversations/hudlin-services/|Hudlin Services]]) — connecting an **Aeotec Z-Stick 10 Pro** (Silicon Labs CP2105 USB controller, `/dev/ttyUSB0`) to Home Assistant and starting the **Z-Wave JS UI** add-on. The `configuration.yaml` uses `default_config:` with a `trusted_proxies` http block — consistent with reverse-proxied/tunneled access (see [[40-Resources/cloud-deployment-infrastructure|Cloudflare Tunnel]]).

## The Protocols (2026 landscape)

| Protocol | Strengths | Trade-offs | Role in the stack |
|----------|-----------|-----------|-------------------|
| **Z-Wave** | Reliable mesh, strong interoperability, less RF congestion (sub-GHz) | Pricier devices, smaller ecosystem | Soleria's current device layer (Z-Stick + Z-Wave JS) |
| **Zigbee** | Most common in Home Assistant; cheap, reliable, huge device selection | 2.4 GHz (shares spectrum with Wi-Fi) | Default for broad device coverage |
| **Matter** | Cross-ecosystem standard — one device works with Apple Home, Google, Alexa, SmartThings, **and** Home Assistant, locally | Still maturing; fewer device types | The interoperability bet for productized Soleria kit |
| **Thread** | Low-power mesh layer under "Matter over Thread"; better mesh + battery life | Needs a Thread Border Router | Emerging transport for Matter devices |

**The Matter promise:** a Matter-certified device works across every major ecosystem simultaneously, with local control and no cloud dependency. For Soleria, productizing on Matter would let one product line drop into any client's existing smart-home ecosystem — a strong fit for "build scalable solutions others can use."

## Network Isolation

Smart-home / IoT devices are a classic security risk, so they belong on a **dedicated, firewalled VLAN** — exactly the segmentation pattern in [[40-Resources/network-architecture|Network Architecture]]. The IoT VLAN is walled off from trusted devices, so a compromised gadget can't reach the rest of the network. UniFi gateways (UDM-Pro / Dream Wall) handle this tagging.

## The R&D Loop, Grounded

| Soleria step | Stack reality |
|--------------|---------------|
| 1. Develop prototypes | Home Assistant automations + Z-Wave/Zigbee devices |
| 2. Test at La Dolce Niente | Real Costa Rica conditions, Starlink WAN, IoT VLAN |
| 3. Refine on usage data | Local logging, no cloud dependency |
| 4. Productize | Lean toward **Matter** for cross-ecosystem portability |

## Connections

- [[10-Projects/soleriatechnology/_corporate-hub|Soleria Technology]] — the entity this stack powers
- [[10-Projects/ladolceniente/_corporate-hub|La Dolce Niente]] — the physical testbed
- [[40-Resources/costa-rica|Costa Rica]] — operating environment (Starlink, variable connectivity)
- [[40-Resources/network-architecture|Network Architecture]] — IoT VLAN isolation, the UniFi layer underneath
- [[40-Resources/cloud-deployment-infrastructure|Cloud Deployment]] — secure remote access to the Home Assistant hub
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — provides the network the automation runs on

## Sources

- [Home Assistant Smart Switch Guide 2026 — sonoff.tech](https://sonoff.tech/en-us/blogs/news/home-assistant-smart-switch-guide-how-to-choose-set-up-and-automate)
- [Zigbee vs Z-Wave vs Matter in 2026 — wiredhaus.com](https://wiredhaus.com/zigbee-vs-z-wave-vs-matter-2026/)
- [Matter over Thread vs Zigbee & Z-Wave — Serenity Smart Homes](https://www.serenitysmarthomesnj.com/2025/07/10/matter-over-thread-showdown.html)
- [Best Smart Home Automation Hubs 2026 — Smart Home Explorer](https://www.smarthomeexplorer.com/guides/best-smart-home-automation-hubs-2026)
- Vault ChatGPT-export conversation: *Home Assistant Z-Stick setup*
</content>
