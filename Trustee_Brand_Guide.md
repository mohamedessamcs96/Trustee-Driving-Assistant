# **ṫrustee** — Driver Assistant App
### Brand Guide & Feature Documentation

---

## The Logo

The **Trustee** wordmark features a lowercase **`t`** with a **dot placed above the crossbar** — a visual metaphor for a road marking or a navigation pin. It signals precision, guidance, and forward motion.

```
  ·         ← road dot (Road Gold #F5C842)
  t rustee  ← logotype (Trustee Green or white)
```

**Usage rules:**
- Always render the road dot above the `t` crossbar, not as a standard tittle
- Minimum clear space: equal to the cap-height of the `t` on all sides
- Never distort, rotate, or apply drop shadows to the logotype itself
- Approved on: **deep green**, **charcoal**, and **white** backgrounds only

---

## Color System

### Primary Palette

| Name | Hex | Usage |
|---|---|---|
| **Deep Forest** | `#1A4731` | Primary backgrounds, dark surfaces |
| **Trustee Green** | `#2E7D52` | Brand primary, interactive elements |
| **Leaf Accent** | `#4CAF7D` | CTAs, highlights, icon fills |
| **Mint Mist** | `#D6EFE1` | Cards, light surface backgrounds |

### Secondary Palette

| Name | Hex | Usage |
|---|---|---|
| **Road Gold** | `#F5C842` | Logo dot, road markings, warnings |
| **Alert Red** | `#E84545` | Danger alerts, pedestrian zone overlays |
| **Charcoal** | `#1C2826` | Dark panels, screens, UI backgrounds |
| **Sage Gray** | `#6B8C7E` | Body text, captions, secondary info |

### Typography
- **Display / Headings:** Georgia (serif) — communicates trust and authority
- **Body / UI:** Calibri — clean, legible at small sizes
- **Monospace accents:** Consolas — for data, speed readouts, technical labels

---

## Features

### 1 — Lane Detection & Road AI

Trustee uses the device camera paired with the **Google Maps API** to understand the road environment in real time.

**What it does:**
- Segments the road into zones: driving lane, pedestrian crossing, standing area
- Detects when a person has a high probability of crossing — triggers an alert before they step out
- Provides spatial context to other Trustee features (audio unlock, speed monitoring)

---

### 2 — Traffic Sign Recognition (Text-to-Speech)

The camera continuously scans for road signs. When detected, Trustee reads them aloud so the driver never needs to look away.

**Supported sign types:**
- Speed limit signs (spoken as "Speed limit: 70")
- Warning signs (e.g., "Sharp bend ahead")
- Prohibitory signs (e.g., "No overtaking zone")
- Junction / roundabout approach signs

---

### 3 — Community Driver Feed

A real-time, location-aware social tab where drivers share conditions with nearby cars.

**How it works:**
- A driver posts: "Jam on Ring 2, avoid Schönhauser Allee"
- Only cars within a configurable radius (e.g., 5 km) see the post
- Posts expire automatically after a set time window
- Each car has a **unique name** (inspired by Donkey Republic bike naming) — e.g., *GreenDart*, *SwiftOak* — building a sense of community identity without exposing personal data

---

### 4 — News Tab

An official channel from Trustee for publishing app updates, feature launches, safety tips, and curated road-safety articles. Users stay informed about what's new without leaving the app.

---

### 5 — Smart Audio (Subscriber Feature)

Unlocks podcasts, audiobooks, and YouTube audio when all four conditions are met simultaneously:

| Condition | Description |
|---|---|
| Quiet street | Traffic density below threshold |
| Solo driver | No active conversation detected via microphone |
| Stable route | No recent U-turns or erratic movement |
| Safe speed | Driving within the permitted limit |

Content sources: **YouTube audio**, **podcasts**, **audiobooks** — linked via your existing subscriptions.

---

### 6 — Speed & Behaviour Monitoring

Trustee passively monitors driving patterns to nudge safer habits.

**Detections:**
- **Speeding** — alerts when above the posted limit
- **Hesitation** — detects repeated braking / slow acceleration patterns
- **U-turn prediction** — detects when a U-turn is likely based on heading + map data; recommends reducing speed in advance
- **Highway speed assist** — suggests safe overtaking windows based on predicted gaps

---

### 7 — Morning Assistant

When the driver starts their day, Trustee enters **Morning Mode** — a voice-first productivity layer.

**Capabilities:**
- Voice-capture tasks and reminders hands-free while driving
- Natural speech recognition builds a simple to-do list
- Reads back your tasks at destination arrival
- Optional: syncs with calendar or notes app

---

## Subscriptions

Trustee offers a free tier with core safety features and a **Pro subscription** unlocking:

- Smart Audio (podcast / audiobook playback)
- Extended community feed radius
- Detailed driving behaviour analytics
- Priority traffic sign update database

---

## Privacy Principles

- Car names are pseudonymous — no real names or plates shared in the feed
- Voice data for morning mode is processed locally and not stored
- Location is shared only in anonymized, aggregated form for feed radius matching
- Camera feed never leaves the device — all processing is on-device

---

## App Architecture (Overview)

```
Trustee
├── Camera Module       → Lane segmentation, sign recognition
├── Maps Module         → Google Maps API, route context
├── Feed Module         → Nearby driver posts, car name system
├── Audio Module        → Conditional podcast/audiobook unlock
├── Safety Monitor      → Speed, hesitation, U-turn prediction
├── Morning Mode        → Voice notes, task capture
└── News Tab            → Official Trustee updates channel
```

---

*ṫrustee — Your road. Your assistant. Always watching.*
