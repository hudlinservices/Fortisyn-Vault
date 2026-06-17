---
name: "Lab Network"
status: "active"
priority: "P1"
corporate_entity: "[[_corporate-hub|Innovatience]]"
tags:
  - project
  - innovatience
  - networking
  - ubiquiti
created: "2026-05-27"
updated: "2026-06-09"
---
# Lab Network

- **Organization**: innovatience
- **Repository**: github.com/hudlinservices/lab-network
- **Started**: 2026-05-27

## Overview

Reviewing client CR-LAB's existing network to recommend a more secure, upgraded architecture using Ubiquiti platform.

## Key Files

- `startup.md` — Blueprint (in project repo)
- `memory.md` — Memory snapshot (in project repo)

## NotebookLM

- **Notebook ID**: `b17cfc7e-112b-4771-87c0-671af94c17d0`
- **Title**: innovatience/lab-network

## Research Notes

### 2026-06-17 (scout)
This project sits on the **Ubiquiti UniFi** platform — see [[40-Resources/network-architecture|Network Architecture]] for the full platform concept (VLAN segmentation, UDM-Pro / Dream Wall, `ui.com` remote management, Starlink WAN).

The CR-LAB engagement is a concrete instance of the pattern: review the client's existing network, then re-architect on UniFi with 802.1Q VLAN segmentation (isolate device classes, contain broadcast traffic, firewall inter-VLAN traffic) for a "more secure, upgraded architecture." The same platform underlies [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]]' connectivity offering and the [[40-Resources/home-automation-stack|home-automation]] IoT-VLAN isolation at the Soleria testbed.
