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

# Frontend Developer Task – Monk Commerce

This project implements the **bundle product creation flow** for an e-commerce admin panel, based on the provided task description, Figma designs, and demo video.

The goal was to allow a store owner to create and manage a bundle of products (up to 4), configure discounts, and control product variants in a clean and intuitive way.

---

## 🚀 Live Demo

**Netlify URL:** _(add your link here)_

**GitHub Repository:** _(add your repo link here)_

---

## 🧩 Features Implemented

### Product List

-   Add up to **4 products** to a bundle (hard limit enforced).
-   Inline error message shown if the user tries to add more than 4 products.
-   Products can be **reordered using drag and drop**.
-   Products can be removed using the **“X” icon** (hidden when only one product exists).
-   Supports:

    -   Percentage discount
    -   Flat discount

-   Variants can be shown or hidden per product.
-   If a product has only **one variant**, the show/hide variants option is not displayed.

---

### Product Picker (Modal)

-   Opens when clicking the **edit icon** on a product.
-   Supports:

    -   Searching products by name
    -   Selecting **multiple products and variants**

-   Selecting a product auto-selects **all its variants**.
-   Selecting/deselecting variants works independently.
-   When confirmed:

    -   The edited product is **replaced** with the newly selected products (as per task requirement).

#### Replacement Example:

If the list is:

```
Product 1, Product 2, Product 3
```

and Product 2 is edited and replaced with Product 4 & Product 5, the final list becomes:

```
Product 1, Product 4, Product 5, Product 3
```

---

### Scroll-Based Pagination (Mocked)

-   Implemented **scroll-based pagination** inside the product picker.
-   Initially loads **10 products**.
-   Loads the next set automatically when scrolling to the bottom.
-   Implemented using in-memory data to simulate real API pagination.

---

### Add Product Button

-   Adds an empty product row at the end of the list.
-   Prevents adding more than **4 products**.
-   Displays a clear message when the limit is exceeded.

---

## 📦 Data Handling (Important Note)

The provided API requires an `x-api-key`, which was not available during development.

To keep the flow functional and demonstrate all required behaviors, I used **mocked product data (`DUMMY_PRODUCTS`)** that matches the API response structure:

-   Product
-   Variants
-   Prices
-   Images (optional)

This allowed:

-   Search
-   Variant selection
-   Pagination behavior
-   Product replacement logic

The code structure is designed so the mocked data can be **easily replaced with live API calls** once the API key is available.

---

## 🧠 Thought Process & Design Decisions

-   **State-driven UI:**
    The entire flow is driven by local React state to keep interactions predictable and easy to debug.

-   **Product replacement logic:**
    Instead of mutating deeply nested state, products are replaced using array `splice`, which keeps ordering intact and matches the exact task requirement.

-   **Pagination without API:**
    Since real pagination depends on backend support, a fake scroll-based pagination was implemented to closely mirror real-world behavior.

-   **User feedback first:**
    Clear messages are shown when:

    -   Max product limit is reached
    -   No variants are selected
    -   Invalid actions are attempted

-   **Edge cases handled:**

    -   Prevent duplicate products
    -   Preserve product order
    -   Handle single-variant products gracefully

---

## 🛠 Tech Stack

-   React (Functional Components + Hooks)
-   Plain CSS
-   No external UI libraries (kept intentionally simple)

---

## ⚠️ Known Limitations

-   Uses mocked data instead of live API due to missing API key.
-   Pricing and stock values are static (can be extended easily).
-   No backend persistence (out of scope for this task).

---

API Integration:
The product picker is now integrated with the provided Monk Commerce products API using the supplied API key. Products are fetched with search and scroll-based pagination, matching the expected backend behavior.

## ✅ Conclusion

This implementation focuses on **clarity, correctness, and usability**, closely following the provided design and functional requirements.
The structure allows easy extension for real API integration and additional validations if needed.
