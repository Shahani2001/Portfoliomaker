# Portfolio Maker - Complete Assignment Spec

**Status**: Approved - Implementing missing Create/Preview/Edit pages + full forms (dynamic arrays)

## Breakdown from Plan (to be checked off):

### Phase 1: Core Pages (Create/Preview/Edit)
- [x] Create frontend/src/pages/CreatePortfolio.jsx (full multi-section form: Personal/Contact/Skills( dynamic add/remove)/Projects(dynamic)/Experience(dynamic), useFieldArray, validation, submit to Preview)
- [x] Create frontend/src/pages/PreviewPortfolio.jsx (read-only Profile-like preview from form state, Publish button -> POST /api/portfolio)
- [x] Create frontend/src/pages/EditPortfolio.jsx (/edit/:username prefetch GET, prefill Create form, PUT update)

### Phase 2: Routing & Navigation
- [x] Update frontend/src/App.jsx (add routes: /create(protected), /preview, /edit/:username(protected); update * 404?)

- [x] Update frontend/src/pages/Home.jsx (CTA Button to /create protected)
- [x] Update frontend/src/pages/Dashboard.jsx (enhance: full Edit link to /edit/:username, projects CRUD preview)
- [x] Update frontend/src/pages/Register.jsx (after success redirect to /create)

### Phase 3: Forms & UX
- [ ] Ensure dynamic arrays in forms (skills[], projects[], experience[]) using useFieldArray
- [ ] Client-side validation (required, URLs, min lengths)
- [ ] Responsive sections, loading states, error toasts

### Phase 4: Polish & Test
- [ ] Test full flow: Register -> Create -> Preview -> Publish -> /:username -> Edit -> Update
- [ ] Fix any Profile/Dashboard field mappings (nested contact, array displays)
- [ ] README.md: Setup, .env (MONGODB_URI), screenshots, tech stack
- [ ] [Bonus] Dark mode toggle if time

**Current Progress**: Backend/API 100%, Auth/Profile/Home 100%, Missing: Create/Edit/Preview full forms.

**Next**: Phase 1 step-by-step after tool confirmations.

