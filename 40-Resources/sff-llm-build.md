---
title: "SFF LLM Machine — Carry-On Build"
category: "reference"
tags:
  - hardware
  - llm
  - ollama
  - sff
  - costa-rica
date: "2026-06-13"
---
# SFF LLM Machine — Carry-On Build

Portable, powerful, repairable. A small-form-factor PC that fits in a carry-on, runs any LLM model via Ollama, and can be fixed with a screwdriver anywhere in the world.

## Why Build

- **Fast:** RTX 3090 24GB runs Llama 3 70B at 15-20 tok/s
- **Upgradeable:** Standard parts — swap GPU, RAM, storage anytime
- **Repairable:** No soldered components. Any PC shop can fix it
- **Portable:** 12.6L console-shaped case fits in carry-on luggage
- **Under $2,100:** Comparable to a Mac Mini M4 Pro 32GB but dramatically more capable

## The Build

```
Case:       Fractal Design Ridge                       $150
CPU:        AMD Ryzen 7 9700X (65W, AM5, AVX-512)     $330
Cooler:     Noctua NH-L12S (air, no pump failures)      $65
GPU:        Used RTX 3090 24GB                         $650
Board:      ASRock B650E PG-ITX (PCIe 5.0)             $220
RAM:        64GB (2x32GB) DDR5-6000                    $200
Storage:    WD Black SN850X 2TB NVMe                    $150
PSU:        Corsair SF750 (SFX, Platinum)              $185
Fans:       2x Noctua NF-A12x15 + 1x NF-A6x25           $65
Thermal:    Kryonaut paste + GPU pad kit                 $35
            ─────────────────────────────────
TOTAL:      ~$2,050
```

## Ollama Performance

| Model | VRAM | tok/s |
|-------|------|-------|
| Mistral 7B Q4 | ~4GB | 90+ |
| Llama 3 8B Q4 | ~5GB | 80+ |
| DeepSeek 14B Q4 | ~8GB | 50+ |
| Qwen 2.5 32B Q4 | ~18GB | 25-30 |
| Llama 3 70B Q4 | ~40GB | 15-20 |
| Mixtral 8x7B Q4 | ~26GB | 20-25 |

## vs Alternatives

| Metric | This Build | Mac Mini M4 Pro | x86 Mini PC |
|--------|-----------|-----------------|-------------|
| 70B models | ✓ 15-20 tok/s | ✗ Won't load | 2-3 tok/s |
| GPU upgrade | ✓ Swap card | ✗ Soldered | ✗ Soldered |
| RAM upgrade | ✓ To 96GB | ✗ Soldered | ✓ DDR5 SODIMM |
| Linux | ✓ Native | Asahi (hobby) | ✓ Native |
| Repair | Any PC shop | Apple only | Manufacturer |
| Power idle | ~40W | 4W | 25W |
| Carry-on | ✓ Console-shaped | ✓ Tiny | ✓ Tiny |

## Packing for Costa Rica

- **Remove GPU** for transport (reseat on arrival)
- Pack case between soft clothes in carry-on
- Carry thermal paste + screwdriver in checked bag
- UPS goes in carry-on (APC 450 is shoebox-sized)
- Bring compressed air for quarterly cleaning (humidity + dust)

## Timeline

**Build window: August 15 — September 12, 2026 (Canada)**
Parts to be purchased during this window. Re-check before buying:
- Used RTX 3090 prices (likely lower by August)
- RTX 5060/5070 launch status (may shift GPU choice)
- Framework Desktop availability (fallback option)
- AMD Zen 6 / Intel Arrow Lake-S pricing

## Related

- [[40-Resources/django-platform-architecture|Django Platform Architecture]]
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — IT infrastructure
- [[10-Projects/pythonslayers/_corporate-hub|Python Slayers]] — Software for the LLM
- Notebook: "Mini Server Research" (`54cc4ac9`)
