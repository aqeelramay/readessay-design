# ReadEssay Admin Dashboard — Design Specification

**Document purpose:** Visual and interaction reference for implementing the approved ReadEssay admin dashboard in Next.js.

**Source of truth:** The approved dashboard screenshot supplied by the project owner. Where this document does not specify a detail, follow the screenshot and ask before introducing a new visual pattern.

## 1. Product context

The ReadEssay Admin Panel is an internal content and operations dashboard. It provides navigation to the main management modules. The dashboard landing page is an overview and module launcher, not an order-management screen.

The admin application will be a separate Next.js application located at `backend/admin` and will consume the NestJS backend API. Do not put admin UI code inside the NestJS API application.

## 2. Visual direction

- Professional, modern SaaS administration interface.
- Light content canvas with a dark navy navigation shell.
- Orange is the primary brand/action accent.
- White cards, subtle cool-grey borders, restrained shadows and rounded corners.
- Clear hierarchy, compact metadata and readable body text.
- Avoid unnecessary charts, oversized statistics, decorative gradients or dense data visualizations.

## 3. Brand palette

The following values are the initial implementation tokens, based on the supplied screenshot. Treat them as the dashboard reference palette and centralize them as CSS variables or design tokens.

| Token | Value | Usage |
|---|---|---|
| Navy | `#243445` | Sidebar and top header |
| Navy dark | `#1D2B39` | Sidebar footer / darker navigation areas |
| Orange | `#FF641A` | Primary actions, active navigation, highlights |
| Page background | `#F7F9FC` | Main application canvas |
| Surface | `#FFFFFF` | Cards and panels |
| Border | `#E3EAF1` | Card and divider borders |
| Primary text | `#101828` | Headings and important content |
| Secondary text | `#64748B` | Descriptions and metadata |
| Muted text | `#94A3B8` | Supporting labels |
| Success | `#10B981` | System status and live indicator |

Use semantic color tokens rather than repeating raw hex values throughout components.

## 4. Application shell

### Top header

- Full-width horizontal header, approximately 56px high in the desktop reference.
- Navy background.
- Left side: orange square brand mark with the `R` letter, ReadEssay wordmark and compact `STUDIO` label.
- Include a sidebar collapse control.
- Breadcrumb area follows the brand/navigation controls.
- Right side: command/search field, LIVE status indicator, notification control with unread badge, and user profile menu.
- Keep controls aligned vertically and avoid crowding.
- On narrow screens, collapse or hide nonessential header controls while preserving access to navigation and the account menu.

### Left sidebar

- Fixed-width desktop sidebar, approximately 228px in the reference.
- Navy background with white/light navigation labels and icons.
- Small uppercase `NAVIGATION` section label.
- Navigation order:
  1. Dashboard
  2. Services
  3. Reviews
  4. Samples
  5. Top Experts
  6. Orders
  7. Blog
  8. Pages
  9. Users
- Active item uses an orange background, white icon/text and rounded corners.
- Inactive items use light text/icons with consistent spacing.
- Sidebar collapse control is anchored at the bottom.
- Collapsed state should show icons with accessible tooltips; expanded state shows icons and labels.
- On mobile, use an accessible drawer/overlay rather than allowing the sidebar to consume the content width.

### Main content area

- Light cool-grey page background.
- Desktop content has consistent horizontal padding and a comfortable maximum usable width.
- Use responsive spacing; avoid hard-coded positioning that breaks at other viewport sizes.
- Main content scrolls independently where appropriate.

## 5. Dashboard landing page

The dashboard page contains two main sections.

### Welcome panel

- White rounded card with a subtle border and very light shadow.
- Top metadata row: green `Systems Nominal` status, date and queue synchronization message.
- Prominent heading: `Welcome to ReadEssay Operations Studio`.
- Short explanatory paragraph describing the administrative hub.
- Right side actions:
  - Primary orange `Open Orders View` button.
  - Secondary neutral `Export Audit` button.
- On smaller screens, stack actions below the introductory text.

### Studio Management Modules

- Section heading: `Studio Management Modules`.
- Supporting sentence: `Select any workspace module below to jump directly into full control mode.`
- A muted module-count label may appear aligned to the right on wide screens.
- Display nine module cards in a three-column desktop grid.
- Cards should become two columns on medium screens and one column on narrow screens.

### Module cards

Each card contains:
- A small colored icon tile.
- Module title.
- Optional compact status/count badge.
- One or two lines of explanatory text.
- A subtle divider.
- A short action label and right-arrow affordance.

The nine cards are:
- Dashboard
- Services
- Reviews
- Samples
- Top Experts
- Orders
- Blog
- Pages
- Users

Use restrained, distinct icon accent colors. Keep card heights visually consistent within each grid row.

**Important:** Orders is one module among the nine. Do not make orders the visual focus of the dashboard. Do not add an order chart, order statistics panel, payment chart or order-centric dashboard layout unless explicitly requested later.

## 6. Interaction requirements

These controls must be functional, not decorative:

- Sidebar collapse/expand.
- Sidebar navigation and active route state.
- Mobile navigation drawer.
- User profile dropdown.
- Notification control and its menu/panel.
- Search/command field with a functional search or navigation behavior.
- Breadcrumb links where applicable.
- Module cards navigate to their corresponding module routes.
- `Open Orders View` navigates to the Orders listing.
- `Export Audit` must either perform a real supported export or remain clearly disabled until that feature is implemented. Do not show a fake success state.

Use semantic buttons and links, keyboard-accessible interactions, visible focus states and appropriate accessible labels.

## 7. Responsive behavior

- Desktop: expanded sidebar and three-column module grid.
- Tablet: collapsible sidebar and two-column module grid.
- Mobile: drawer navigation, one-column cards, stacked welcome panel actions and compact header controls.
- Prevent horizontal overflow at all viewport sizes.
- Preserve readable text sizes and touch-friendly control targets.

## 8. Component guidance

Build reusable components rather than a single large dashboard page. Suggested components:

- `AdminLayout`
- `AdminHeader`
- `AdminSidebar`
- `Breadcrumbs`
- `CommandSearch`
- `UserMenu`
- `NotificationMenu`
- `WelcomePanel`
- `ModuleGrid`
- `ModuleCard`
- `StatusBadge`

Keep navigation definitions in one central configuration so the sidebar and dashboard cards can use consistent labels and routes.

## 9. Implementation constraints

- Implement the dashboard in the separate Next.js admin application at `backend/admin`.
- Keep NestJS API code in `backend/api`.
- Do not connect the dashboard directly to PostgreSQL.
- Do not invent live counts, users, orders, ratings or system status. Use clearly identified mock data during the UI-only stage, then replace it with API data.
- Do not implement authentication as part of the initial visual shell unless that stage has been explicitly approved.
- Preserve the approved layout and visual hierarchy. Ask before making significant design changes.

## 10. Scope boundary

This document currently specifies the **admin dashboard shell and dashboard landing page only**. It does not define the detailed UI for Services, Reviews, Samples, Top Experts, Orders, Blog, Pages or Users. Those screens will receive their own requirements when each module is designed and implemented.

The public ReadEssay website has a separate design reference and should not be inferred from this admin dashboard document.
