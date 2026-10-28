# Test Matrix

Author: Tran Van Cuong

| # | Group | Case | Action | Expected | Actual | Pass |
|---|---|---|---|---|---|---|
| 1 | Login | Empty | Submit with empty username/password | No login; validation message shown | | |
| 2 | Login | Wrong credential | Enter wrong username or password | Stay on login; error message | | |
| 3 | Login | Valid | Admin / Admin | Admin page is shown | | |
| 4 | Auth | Logout | Click Logout | Back to login; admin not accessible | | |
| 5 | Layout | Menu completeness | Look at sidebar | 5 items: Dashboard, Category, News, Users, Settings | | |
| 6 | Navigation | All menus | Click each menu | Correct page shown; no full reload | | |
| 7 | Category | Read | Open Category page | List shown with correct fields | | |
| 8 | Category | Create valid | Add -> fill valid data -> Create | New row appears; dialog closes | | |
| 9 | Category | Create invalid | Add -> leave required field empty -> Create | Not added; error message in dialog | | |
| 10 | Category | Update | Edit a row -> change a field -> Save | Only that row changes | | |
| 11 | Category | Delete cancel | Delete -> Cancel | Row remains | | |
| 12 | Category | Delete confirm | Delete (unreferenced row) -> Delete | Row removed | | |
| 13 | Category | Search hit | Type an existing keyword | List filtered correctly | | |
| 14 | Category | Search miss | Type a non-existing keyword | 'No ... match your search' message | | |
| 15 | News | Read | Open News page | List shown with correct fields | | |
| 16 | News | Create valid | Add -> fill valid data -> Create | New row appears; dialog closes | | |
| 17 | News | Create invalid | Add -> leave required field empty -> Create | Not added; error message in dialog | | |
| 18 | News | Update | Edit a row -> change a field -> Save | Only that row changes | | |
| 19 | News | Delete cancel | Delete -> Cancel | Row remains | | |
| 20 | News | Delete confirm | Delete (unreferenced row) -> Delete | Row removed | | |
| 21 | News | Search hit | Type an existing keyword | List filtered correctly | | |
| 22 | News | Search miss | Type a non-existing keyword | 'No ... match your search' message | | |
| 23 | Users | Read | Open Users page | List shown with correct fields | | |
| 24 | Users | Create valid | Add -> fill valid data -> Create | New row appears; dialog closes | | |
| 25 | Users | Create invalid | Add -> leave required field empty -> Create | Not added; error message in dialog | | |
| 26 | Users | Update | Edit a row -> change a field -> Save | Only that row changes | | |
| 27 | Users | Delete cancel | Delete -> Cancel | Row remains | | |
| 28 | Users | Delete confirm | Delete (unreferenced row) -> Delete | Row removed | | |
| 29 | Users | Search hit | Type an existing keyword | List filtered correctly | | |
| 30 | Users | Search miss | Type a non-existing keyword | 'No ... match your search' message | | |
| 31 | News | Relation | Create/Edit news and pick a category | categoryId valid; category name shown in list | | |
| 32 | Users | Role | Look at Role column | 1 -> Admin, 2 -> Staff | | |
| 33 | Status | Display | Look at Status column | 1 -> Active, 0 -> Inactive | | |
| 34 | Data | Empty state | Delete all rows of a list | No crash; 'No ... yet' message | | |
| 35 | Persistence | Reload | Create a record then press F5 | Data and session are kept (localStorage) | | |
| 36 | Rule | Delete used category | Delete category used by news | Blocked with error message | | |
| 37 | Rule | Delete used user | Delete user who created news | Blocked with error message | | |
| 38 | Rule | Delete current user | Delete the logged-in Admin | Blocked with error message | | |
