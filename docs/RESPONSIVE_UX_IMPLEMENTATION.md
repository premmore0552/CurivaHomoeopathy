# Responsive navigation and learning UX implementation

This implementation applies one information architecture across desktop, tablet and mobile, while retaining existing routes and account controls.

## Implemented in this change

- Desktop navigation uses Learn, Practice, Library and Guidance mega-menus. Menu buttons support click, pointer hover, visible focus, expanded-state semantics and Escape dismissal.
- Mobile and tablet navigation uses a full-height drawer with the active group opened, touch-sized controls, focus trapping, Escape and backdrop dismissal, scroll locking and focus restoration.
- A five-action mobile navigation bar provides Home, Learn, Practice, Search and More. It uses the device safe-area inset and is hidden in the dedicated FMT experience to prevent duplicate bars.
- Desktop and mobile search launch the existing global search console, retaining local search, filters, recent searches and Ctrl/Cmd+K.
- Desktop navigation, mobile drawer and homepage quick links share the same navigation configuration.
- The homepage quick-navigation section expands to six learning shortcuts with responsive two-, three- and six-column layouts.
- The learning sidebar collapses on smaller screens and remains sticky on desktop. Its progress indicator now exposes progressbar semantics.
- Breadcrumbs render the current page as a non-link with aria-current and decode URL segments before displaying labels.
- Route loading uses an accessible skeleton. The arbitrary 1.2-second startup delay and simulated progress indicator have been removed; lazy routes show the fallback only when they are actually loading.
- Page transitions are shorter and less spatially disruptive. Existing reduced-motion rules remain active.
- Global CSS no longer forces SVG icons to automatic height, preserving the dimensions assigned by icon classes.
- Search history writes use the existing guarded persistence helper so search remains usable when browser storage is unavailable.

## Validation added

The navigation regression suite checks route destinations, desktop and mobile layout markers, drawer dialog semantics, focus handling, search integration, thumb navigation, breadcrumb current-page behavior and accessible loading states.

## Release verification still required

- Review a deploy preview at 320–390 px, tablet widths around 768–1024 px, and desktop widths of 1280 px and above.
- Exercise keyboard-only navigation, screen-reader announcements, reduced-motion preferences, Android WebView back behavior and iOS safe-area rendering on real devices.
- Confirm that the FMT-specific bottom navigation remains the only bottom navigation on FMT routes.
- This change does not publish a production deployment or change production environment variables.