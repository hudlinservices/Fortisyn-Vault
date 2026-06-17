---
title: "Cloud Deployment & Hosting Infrastructure"
category: "concept"
tags:
  - infrastructure
  - kubernetes
  - digitalocean
  - cloudflare
  - hosting
  - devops
source: "WebSearch + WebFetch — DigitalOcean DOKS docs, Cloudflare Tunnel guides (2026); grounded in vault ChatGPT-export conversations"
date: "2026-06-17"
---
# Cloud Deployment & Hosting Infrastructure

How Fortisyn ships software. [[10-Projects/pythonslayers/_corporate-hub|Python Slayers]] builds the applications, [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] hosts and operates them. This page documents the **cloud** half of that backbone — container orchestration and secure ingress. The **LAN** half lives in [[40-Resources/network-architecture|Network Architecture]].

> Until now "Kubernetes clusters" appeared as a one-line bullet on the Hudlin Services hub and a single row in [[40-Resources/django-platform-architecture|Django Platform Architecture]] ("Hosting: Hudlin Services (Kubernetes clusters)") with no explanation of *how*. This page fills that gap.

## The Stack

| Layer | Choice | Role |
|-------|--------|------|
| **Orchestration** | Kubernetes | Container scheduling, scaling, self-healing across all client workloads |
| **Managed K8s provider** | DigitalOcean Kubernetes (DOKS) | Managed control plane — Hudlin Services operates clusters without running masters |
| **Cluster CLI** | `doctl` + `kubectl` + `helm` | Provision (doctl), operate (kubectl), package/deploy (helm) — driven from a local laptop |
| **Packaging** | Helm charts | Pre-configured bundles of K8s resources; one chart deploys a whole app |
| **App runtime** | Docker containers (Gunicorn for Django) | 12-factor apps, containerized, see [[40-Resources/django-platform-architecture|Django triad]] |
| **Secure ingress** | Cloudflare Tunnel (`cloudflared`) | Outbound-only encrypted tunnel — no open inbound ports, works behind CGNAT/NAT |
| **Isolation** | Namespaces + [[40-Resources/network-architecture|VLANs]] | One cluster, isolated workloads per entity/client |

## Container Orchestration — DOKS

DigitalOcean Kubernetes (DOKS) gives Hudlin Services a **managed control plane**: DigitalOcean runs the Kubernetes masters, Hudlin Services manages only the workloads. Clusters are provisioned via the DigitalOcean control panel, `doctl` (the DO CLI), or Terraform, then operated locally with `kubectl` and packaged with `helm`.

The 2026 operating playbook Fortisyn follows:

- **Namespaces** organize workloads — a clean fit for Fortisyn's multi-entity model (one cluster, isolated namespaces per entity/client).
- **Horizontal Pod Autoscaler (HPA)** scales pods on demand — relevant for [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail]] storefronts during product launches.
- **Helm charts** package the repeating [[40-Resources/django-platform-architecture|Store→API→Admin triad]] so each new brand storefront deploys from the same chart.
- **Managed control plane** reduces operational burden — the team focuses on application development, not infrastructure plumbing.

> Vault evidence: the ChatGPT-export conversation *"Kubernetes Setup on DigitalOcean"* (300 messages, filed under [[chatgpt-conversations/python-slayers/|Python Slayers]]) shows the real workflow — `doctl auth init`, `kube`, `helm` driven from a local laptop. Related: *"CDN link issue Kubernetes"*, *"K8s pod shell access"*, *"Kubernetes setup on DigitalOcean"*.

## Secure Ingress — Cloudflare Tunnel

Fortisyn exposes services (and self-hosted boxes like the Plex media server on a Raspberry Pi 4) through **Cloudflare Tunnel** rather than port-forwarding. `cloudflared` establishes a secure, **outbound-only** connection to Cloudflare's edge:

- **No open inbound ports** — the origin stays hidden behind Cloudflare; nothing is exposed directly to the internet.
- **Works behind NAT / CGNAT / dynamic IP** — no port forwarding, no static IP, no DDNS. This matters for [[40-Resources/costa-rica|Costa Rica]] deployments, where [[40-Resources/network-architecture|Starlink]] hands out CGNAT addresses.
- **Zero-trust access** — identity-based, authenticated, auditable connections in front of every service.
- **Runs as a systemd service** — `cloudflared` starts on boot and reconnects automatically.

> Vault evidence: *"Plex Cloudflared Tunnel Setup"* (122 messages, [[chatgpt-conversations/hudlin-services/|Hudlin Services]]) — a Raspberry Pi 4 running Ubuntu + Plex behind a Cloudflared tunnel, administered via Cockpit. Related: *"Plex nginx cloudflared"*, *"Cockpit setup with cloudflared"*.

## Who Uses It

| Consumer | What runs here |
|----------|---------------|
| [[10-Projects/mercovaretail/_corporate-hub\|Mercova Retail]] | The Django [[40-Resources/django-platform-architecture\|Store→API→Admin triad]] + brand storefronts |
| [[10-Projects/pythonslayers/chat-assistant\|Chat Assistant]] / [[10-Projects/pythonslayers/spanish-tutor\|Spanish Tutor]] / [[10-Projects/pythonslayers/slf-for-roy\|SLF for ROY]] | Personal full-stack apps |
| [[10-Projects/innovatience/accounting\|Chart of Accounts Pro]] | Node.js consulting app |
| Self-hosted services (Plex, Cockpit) | Raspberry Pi behind Cloudflare Tunnel |

## Connections

- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — operates the clusters and tunnels (the "hosts it" in the triad)
- [[10-Projects/pythonslayers/_corporate-hub|Python Slayers]] — builds the apps that deploy here (the "builds it")
- [[40-Resources/django-platform-architecture|Django Platform Architecture]] — the apps this infrastructure hosts
- [[40-Resources/network-architecture|Network Architecture]] — the on-premises/LAN counterpart (Ubiquiti/UniFi)
- [[40-Resources/costa-rica|Costa Rica]] — why outbound-only ingress matters (Starlink CGNAT)
- [[10-Projects/pythonslayers/OneClickLM|OneClickLM]] — another deployable Node/TS service in the portfolio

## Sources

- [DigitalOcean — How To Deploy a Scalable and Secure Django Application with Kubernetes](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-scalable-and-secure-django-application-with-kubernetes)
- [DigitalOcean — From Containers to Kubernetes with Django](https://www.digitalocean.com/community/tutorial-series/from-containers-to-kubernetes-with-django)
- [Devtron — How to Deploy Applications to Kubernetes on DigitalOcean](https://devtron.ai/blog/deploy-applications-to-kubernetes-digitalocean/)
- [Cloudflare Tunnel on Raspberry Pi: Zero-Trust Access Without Ports — Brian Haman, PhD](https://www.brianhaman.com/grc-blog/cloudflare-tunnel-raspberry-pi-zero-trust)
- [Expose a Self-Hosted App with Cloudflare Tunnel — No Open Ports (RDP.sh)](https://rdp.sh/en/blog/expose-a-self-hosted-app-with-cloudflare-tunnel)
- Vault ChatGPT-export conversations: *Kubernetes Setup on DigitalOcean*, *Plex Cloudflared Tunnel Setup*
</content>
</invoke>
