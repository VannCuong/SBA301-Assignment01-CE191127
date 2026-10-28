/**
 * @author Tran Van Cuong
 */

// Load an array from localStorage. Handles first run (null) and corrupted JSON.
export function load(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      const initial = seed.map((item) => ({ ...item }));
      save(key, initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seed.map((item) => ({ ...item }));
  } catch {
    return seed.map((item) => ({ ...item }));
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable: data lives only in React state for this session
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
