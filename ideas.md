# NDA II 2026 Study Tracker — Design Brainstorm

## Approach 1
**Theme Name:** Field Manual Progress Deck

**Very Brief Intro:** A disciplined, paper-and-ink command center inspired by military field notebooks and exam prep binders. It makes a demanding 28-day plan feel navigable, calm, and actionable rather than intimidating.

**Probability:** 0.07

## Approach 2
**Theme Name:** Observatory of Small Wins

**Very Brief Intro:** A soft editorial dashboard using midnight navy, constellations, and quietly glowing progress signals. The emotional emphasis is on steady momentum and long-view confidence.

**Probability:** 0.03

## Approach 3
**Theme Name:** Tactile Exam Studio

**Very Brief Intro:** A warm, academic workspace with clipped paper cards, annotation marks, and study-desk materiality. It frames revision as a personal ritual with visible evidence of progress.

**Probability:** 0.09

## Chosen Approach: Field Manual Progress Deck

### Design Movement
Contemporary **editorial utilitarianism** with references to field manuals, technical wayfinding, and well-worn examination folders.

### Core Principles
1. Information is arranged as an operational briefing: scan first, then act.
2. Every visual detail must make progress, priority, or time feel clearer.
3. The interface uses warm paper surfaces against deep ink to lower anxiety without becoming playful or childish.
4. Completion is celebrated with restrained motion and clear numerical feedback, never gamified clutter.

### Color Philosophy
The base is **ink navy** for focus and authority, paired with **warm parchment** for readability and a concentrated **signal orange** for action, urgency, and exam-day milestones. Sage green is reserved for completion so it never competes with the primary call to action.

### Layout Paradigm
A fixed, narrow briefing rail anchors the desktop experience, while the main panel reads like a layered operational dossier: a high-level command strip, an asymmetric active-day card, then a modular schedule stream. The phone version collapses the rail into a compact top briefing bar rather than forcing a miniature desktop layout.

### Signature Elements
1. Day-number markers styled as stamped field labels.
2. Thin contour-line / grid texture behind the hero and progress panel.
3. Small monospaced metadata chips for dates, durations, and question targets.

### Interaction Philosophy
Actions should feel decisive. Ticking off a task produces a small check-and-fill transition; filtering is instantaneous; the active study day can be opened as an inspection card. The dashboard uses visible state, not hidden menus, for its core controls.

### Animation
Use a 180–240ms custom ease-out for card entrance, checkbox completion, progress fills, and filter transitions. Stagger the schedule cards subtly on first load. Respect reduced-motion preferences; no looping decorative animation.

### Typography System
**DM Serif Display** is used selectively for the hero figure and major section titles, adding a purposeful editorial voice. **Manrope** handles controls and body copy for clarity; **IBM Plex Mono** labels dates, targets, time commitments, and other metadata. Headlines are compact, high contrast, and not center-aligned by default.

### Brand Essence
An operational, exam-focused planning deck for school-going NDA aspirants who need a realistic path from today to test day.

**Personality:** disciplined, reassuring, lucid.

### Brand Voice
Headlines are brief, direct and grounding. CTAs acknowledge effort without empty motivation.

Example lines:

> "Today is a mission, not a mountain."

> "Finish the set. Capture the error. Move forward."

### Wordmark & Logo
The mark is a bold, geometric **compass-card / check signal**: a clipped orange chevron embedded in an ink-navy navigation diamond. It appears without text as the app icon and favicon; the wordmark is constructed from Manrope and mono metadata rather than a default logo treatment.

### Signature Brand Color
**Signal Orange — #F06B3A**

## Style Decisions

- Use only sharp-to-gently-rounded corners; avoid pill-shaped cards as the dominant motif.
- Never use purple gradients or generic blue SaaS styling.
- Use generated visual assets in the high-visibility briefing/hero region, with dark overlay treatment to retain reliable text contrast.
- The schedule must stay immediately usable: all core information and completion state remain readable without opening a modal.
- The desktop briefing rail is a persistent dossier spine: it must show the compass/check mark, campaign status, day count, exam date and navigation cues at first glance.
- Repeat the compass/check mark at command moments (hero, progress, footer) to build recognisable brand memory.
- Divide the 28-day schedule into four named operational phases so the campaign progression is apparent before a user reads individual cards.
- Treat the dossier spine as an unmistakable command surface with an orange edge, a field-identification tab and visible route cues on every desktop page.
- Reserve Signal Orange for primary actions, P1 urgency, day stamps and milestones; keep P2 and P3 technical and subdued, reserving sage for completion only.
