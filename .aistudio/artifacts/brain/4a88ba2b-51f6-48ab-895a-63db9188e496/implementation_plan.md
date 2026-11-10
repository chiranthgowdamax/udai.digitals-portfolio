# UDai Digitals — Official Contact Channels Configuration Plan

This update configures the official **UDai Digitals** contact endpoints in the central studio configuration so visitors can directly start a WhatsApp chat, visit the Instagram profile, or send an email from the **Contact** and **Footer** sections.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following official contact endpoints will be wired into `STUDIO_CONFIG.contact.channels`:

- **WhatsApp Direct Chat**: `https://wa.me/916361055190` (configured with India's `+91` country code for `6361055190` so clicking the WhatsApp button immediately launches a direct WhatsApp chat across mobile and desktop).
- **Instagram Profile**: `https://instagram.com/udai.digital` (`@udai.digital`).
- **Direct Email**: `mailto:udai.digitals@gmail.com` (`udai.digitals@gmail.com`).

---

### 1. Overview & Core Concept

- **What It Does**: Activates the three primary contact buttons (**WhatsApp**, **Instagram**, and **Email**) in the **Contact** section and displays quick-access contact details in the studio base card and footer.
- **Target Audience / Persona**: Prospective clients in Hassan, Karnataka and beyond who want to immediately message **UDai Digitals** on WhatsApp, browse recent work on Instagram, or send a project inquiry by email.
- **Key Value**: Removes friction between viewing the portfolio and starting a real conversation with the studio.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Direct WhatsApp Chat**: Clicking the **WhatsApp** CTA button opens `https://wa.me/916361055190` in a new tab or the native WhatsApp app to chat directly with `+91 6361055190`.
  2. **Instagram Profile Visit**: Clicking the **Instagram** CTA button opens `https://instagram.com/udai.digital` (`@udai.digital`) in a new tab.
  3. **Email Inquiry**: Clicking the **Email** CTA button launches the user's default mail client addressed to `udai.digitals@gmail.com`.

- **Visual Identity & Theme**:
  - Preserves the **UDai Digitals** logo theme (`#07080D` obsidian background, `#111420` elevated cards, `#687DF7` periwinkle blue, and `#F59E42` amber dot accents).
  - Displays the formatted handles (`+91 6361055190`, `@udai.digital`, `udai.digitals@gmail.com`) clearly inside the Contact section for easy reference.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Automatic `+91` Country Code Normalization for WhatsApp (`wa.me`)**:
  - *Chosen Approach*: Configure `whatsapp: 'https://wa.me/916361055190'` and enhance the WhatsApp URL helper so any 10-digit Indian mobile number (`6361055190`) automatically prefixes `91` for `wa.me` compatibility.
  - *Why*: WhatsApp's `wa.me` API requires a full international dialing code without `+` or spaces; prefixing `91` guarantees the link works reliably on both mobile apps and WhatsApp Web.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                Central Studio Configuration (studioConfig.ts)           │
│  • whatsapp:  "https://wa.me/916361055190" (+91 6361055190)             │
│  • instagram: "https://instagram.com/udai.digital" (@udai.digital)      │
│  • email:     "udai.digitals@gmail.com"                                 │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     Contact & Footer Components                         │
│  • WhatsApp Direct Chat CTA  ──► Opens wa.me/916361055190               │
│  • Instagram Profile CTA     ──► Opens instagram.com/udai.digital       │
│  • Email Inquiry CTA         ──► Opens mailto:udai.digitals@gmail.com   │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Interactive Component & State Mapping**:
  - `STUDIO_CONFIG.contact.channels`: Stores the verified WhatsApp, Instagram, and Email values.
  - `Contact`: Renders interactive buttons for WhatsApp, Instagram, and Email with clear accessible labels and displays the direct contact handles in the Studio Base card.
