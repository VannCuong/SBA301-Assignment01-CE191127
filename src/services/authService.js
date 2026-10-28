/**
 * @author Tran Van Cuong
 */
import { remove } from "../utils/storage";
import { CATEGORY_KEY } from "./categoryService";
import { NEWS_KEY } from "./newsService";
import { USER_KEY } from "./userService";

const SESSION_KEY = "funews_session";

// Mock authentication required by the assignment: Admin / Admin.
const MOCK_ACCOUNT = { username: "Admin", password: "Admin", fullName: "Administrator", role: 1 };

export function login(username, password) {
  if (username.trim() === MOCK_ACCOUNT.username && password === MOCK_ACCOUNT.password) {
    const session = {
      username: MOCK_ACCOUNT.username,
      fullName: MOCK_ACCOUNT.fullName,
      role: MOCK_ACCOUNT.role,
    };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // session only kept in React state
    }
    return { ok: true, user: session };
  }
  return { ok: false, error: "Invalid username or password." };
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  remove(SESSION_KEY);
}

// Clears demo data so every list is re-seeded on next load.
export function resetDemoData() {
  remove(CATEGORY_KEY);
  remove(NEWS_KEY);
  remove(USER_KEY);
}
