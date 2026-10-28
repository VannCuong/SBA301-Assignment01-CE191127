# FUNewsManagementSystem - Admin Frontend (SBA301 Assignment 01)

Author: Tran Van Cuong

ReactJS + Vite admin frontend with mock authentication and CRUD + Search for Category, News and Users.

## Run
```
npm install
npm run dev
```
Open the URL shown in the terminal (default http://localhost:5173).

## Test account
Username: `Admin` - Password: `Admin` (case-sensitive)

## Features
- Login (validation, wrong credential error), logout, session kept after reload
- Header with AI-style logo, sidebar menu: Dashboard, Category, News, Users, Settings
- Category / News / Users: list, create and update in a popup dialog, delete with confirmation, search
- Dashboard counts (total / active / inactive), Settings (account info, reset demo data)

## Project structure
```
src/
  App.jsx                  auth switch: LoginPage or AdminLayout
  components/              LoginPage, AdminLayout, Header, Sidebar, Modal, ConfirmDialog, SearchBox, StatusBadge
  pages/                   DashboardPage, CategoryManagement, NewsManagement, UserManagement, SettingsPage
  services/                crudService (generic), category/news/user services, authService, mockData
  utils/                   constants, storage (localStorage helpers)
```

## Design decisions
| Decision | Choice | Reason |
|---|---|---|
| Navigation | `page` state in AdminLayout | Small scope, no router needed; add a route table later if deep links are required |
| State ownership | List, keyword, dialog, selected item live in each management page; auth lives in App | Only that page uses them; auth decides which top-level view renders |
| Persistence | localStorage via service layer, seeded on first run | Data survives reload; the service layer can be swapped for a REST API |
| Dialog reuse | One Modal; form component per entity with `mode` = create/update | Same fields, different initial values and submit action |
| Search | `useMemo` derives `displayed` from source `items` + keyword | Source list is never overwritten |
| Delete rules | Block deleting a category/user referenced by news and the logged-in account | Keeps categoryId / createdBy relations valid |

## Data model
- Category: id, name, status (1 Active / 0 Inactive)
- News: id, title, content, categoryId, createdBy (username), status
- User: id, username, password (mock), fullName, role (1 Admin / 2 Staff), status

## Limitations
- Mock data only, no backend; passwords are stored in plain text in localStorage (demo only)
- Only the Admin / Admin account can log in
- Layout is custom CSS (the provided HTML/CSS template was not available when this was written)

## Testing
See `docs/TEST_MATRIX.md` (fill the Actual / Pass columns when you run each case).

## AI usage
Fill in here if your class requires an AI usage log (prompt, purpose, what was verified, what was changed).
