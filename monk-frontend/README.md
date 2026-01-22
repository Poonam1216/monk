# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
Absolutely.
Below is a **fully polished README** that sounds **human, honest, and believable** — like a real frontend engineer explaining their work, not an AI or a tutorial.

# Bundle Product Builder – Frontend Task

This project is a frontend implementation of a **bundle / offer product builder** similar to what merchants use in e-commerce tools to create bundled products or upsell offers.

The focus of this task was handling **complex UI state**, especially around product selection, variant management, and edit flows, while keeping the implementation simple and readable.

---

## What the app does

-   Allows adding **up to 4 products** to a bundle
-   Each product can have **one or more variants**
-   Products and variants can be:

    -   Selected
    -   Edited
    -   Reordered using drag & drop
    -   Removed individually

-   Discounts can be applied per product
-   Previously selected products and variants remain selected when editing

All logic is handled on the frontend using local state.

---

## Key interactions & behavior

### Product & Variant Selection

-   Clicking a **product checkbox** selects all its variants
-   Clicking a **variant checkbox** automatically selects the parent product
-   Variants can be individually toggled on or off

### Edit Flow

-   Clicking the ✏️ edit icon opens the product picker
-   Existing selections are **pre-filled**
-   Users can add new variants without losing previously selected ones

This was one of the more complex parts of the task and required careful state handling to avoid accidental resets.

---

### Variant Handling

-   Selected variants are shown under each product
-   Variants can be:

    -   Reordered
    -   Removed using the ❌ icon

-   Variant order is preserved across edits

---

### Discounts

-   Discounts are optional per product
-   Supports both:

    -   Percentage discount
    -   Flat discount

-   Discount state remains intact when products are edited or reordered

---

## Pagination (Mocked)

The product picker implements **scroll-based pagination** using mocked data:

-   Initially loads 10 products
-   Loads additional products as the user scrolls
-   Pagination resets when searching

This mirrors real API-based pagination behavior and can be easily replaced with backend pagination when integrated.

---

## Component Overview

### `ProductList`

-   Maintains the main list of selected products
-   Handles adding new product slots (up to 4)
-   Renders individual product rows

### `ProductItem`

-   Represents a single selected product
-   Handles:

    -   Edit modal
    -   Discount logic
    -   Variant visibility
    -   Drag & drop reordering

### `ProductPicker`

-   Modal used to select products and variants
-   Handles:

    -   Search
    -   Selection logic
    -   Scroll-based pagination

-   Returns selected products and variants back to the list

### `VariantItem`

-   Displays individual variants
-   Supports reordering and removal

---

## Tech Stack

-   React
-   JavaScript (ES6+)
-   CSS
-   No external UI or drag-and-drop libraries

The goal was to keep dependencies minimal and focus on interaction logic.

---

## Trade-offs & Notes

-   Product data is mocked (no backend/API integration)
-   State resets on page refresh
-   UI styling is functional but not pixel-perfect
-   Focus was placed on correctness and interaction over visual polish

If this were production code, the next steps would be:

-   API integration
-   Better accessibility
-   Unit tests for edit and selection flows
-   Extracting complex logic into reusable hooks

---

## How to run the project

```bash
npm install
npm run dev
```

Open the app in the browser using the local development URL.

---

## Final thoughts

This task was primarily about **state management and user interaction**, especially handling edits without breaking existing selections.
The implementation aims to balance correctness, readability, and realistic UX behavior within a limited scope.
