---
title: "Hyperframes"
category: "concept"
tags:
  - hyperframes
  - video
  - remotion
  - animation
  - gsap
date: "2026-06-13"
---
# Hyperframes

**HTML is the source of truth for video.** A video composition framework built on Remotion (React → MP4 rendering). Uses `data-*` attributes for timing, GSAP timelines for animation, and CSS for appearance. The framework handles clip visibility, media playback, and timeline sync.

## How It Works

```
HTML file (composition)
  ├── data-* attributes  ← timing, scene markers
  ├── GSAP timeline      ← animation, transitions
  ├── CSS                ← visual appearance
  └── Media assets       ← audio, images, video clips
          │
          ▼
    Remotion render pipeline
          │
          ▼
       MP4 video
```

A composition is a single HTML file that defines every scene, transition, text overlay, and audio cue. The framework plays it in-browser for preview, then Remotion renders it to MP4 for distribution.

## Core Capabilities

| Capability | How |
|-----------|-----|
| **Scene composition** | HTML sections with `data-*` timing attributes |
| **Animation** | GSAP timelines — motion, scale, opacity, color |
| **Captions & subtitles** | Synced to audio waveform |
| **Text-to-speech** | Generated narration with voice selection |
| **Audio-reactive visuals** | Beat sync, glow, pulse driven by music |
| **Transitions** | Crossfades, wipes, reveals, shader transitions |
| **Animated text** | Marker sweeps, hand-drawn circles, burst lines, scribble |
| **Voiceovers** | Timed narration tracks |

## The Fortisyn Pipeline

```
Auron Media                          Mercova Retail
─────────────                        ──────────────
Limited Edition Intro                Product launches
  (Hyperframes compositions)    ──►   (video on product pages)
                                     Social media clips
Signatures                           Email campaigns
  (brand assets)                ──►   (branded templates)
```

Auron Media produces Hyperframes compositions. Mercova Retail uses them for product launches. The Limited Edition Intro project is a reusable template — swap assets, adjust branding, render for each drop.

## CLI Toolchain

| Tool | Purpose |
|------|---------|
| `hyperframes-cli` | Init, lint, inspect, preview, render |
| `hyperframes-media` | Asset preprocessing: TTS, transcribe, remove-background |

## Related Skills

13 animation/video skills active in the environment:

| Skill | Domain |
|-------|--------|
| `hyperframes` | Composition authoring, timing, full video workflow |
| `hyperframes-cli` | Dev-loop commands (init, lint, preview, render) |
| `hyperframes-media` | Asset preprocessing (TTS, transcribe, remove-background) |
| `remotion` | React → MP4 rendering engine |
| `remotion-to-hyperframes` | Migrate Remotion projects to Hyperframes |
| `gsap` | GreenSock animation library |
| `animejs` | JavaScript animation engine |
| `three` | 3D rendering and WebGL |
| `lottie` | After Effects → web animation |
| `waapi` | Web Animations API |
| `css-animations` | CSS keyframes and transitions |
| `website-to-hyperframes` | Convert websites to video compositions |
| `tailwind` | Utility-first CSS |

## Related Vault Pages

- [[10-Projects/auronmedia/limited-edition-intro|Limited Edition Intro]] — Hyperframes video project (P1)
- [[10-Projects/auronmedia/_corporate-hub|Auron Media]] — Digital creation and video production
- [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail]] — Product launches use Hyperframes intros
- [[10-Projects/auronmedia/signatures|Signatures]] — Brand assets used in compositions
