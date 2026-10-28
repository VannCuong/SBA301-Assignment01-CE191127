/**
 * @author Tran Van Cuong
 */
import { load, save } from "../utils/storage";

// Generic CRUD service over localStorage. Every operation builds a NEW array
// (no mutation), persists it, and returns it so the UI can set state directly.
// To use a real REST API later, only this layer needs to change.
export function createCrudService(storageKey, seed) {
  const getAll = () => load(storageKey, seed);

  const nextId = (items) => items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

  const create = (data) => {
    const items = getAll();
    const updated = [...items, { ...data, id: nextId(items) }];
    save(storageKey, updated);
    return updated;
  };

  const update = (id, data) => {
    const updated = getAll().map((item) => (item.id === id ? { ...item, ...data, id } : item));
    save(storageKey, updated);
    return updated;
  };

  const remove = (id) => {
    const updated = getAll().filter((item) => item.id !== id);
    save(storageKey, updated);
    return updated;
  };

  return { getAll, create, update, remove };
}
