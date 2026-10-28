/**
 * @author Tran Van Cuong
 */
import { useMemo, useState } from "react";
import categoryService from "../services/categoryService";
import newsService from "../services/newsService";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import SearchBox from "../components/SearchBox";
import StatusBadge from "../components/StatusBadge";

function CategoryForm({ mode, item, existing, onSubmit, onCancel }) {
  const [name, setName] = useState(item ? item.name : "");
  const [status, setStatus] = useState(item ? item.status : 1);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Category name is required.");
      return;
    }
    const duplicate = existing.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase() && (!item || c.id !== item.id)
    );
    if (duplicate) {
      setError("Category name already exists.");
      return;
    }
    onSubmit({ name: trimmed, status: Number(status) });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="alert alert-error">{error}</div>}
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>
      <div className="form-actions">
        <button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{mode === "create" ? "Create" : "Save"}</button>
      </div>
    </form>
  );
}

export default function CategoryManagement() {
  const [items, setItems] = useState(() => categoryService.getAll());
  const [keyword, setKeyword] = useState("");
  const [dialog, setDialog] = useState(null); // { mode: "create" | "update", item }
  const [toDelete, setToDelete] = useState(null);
  const [message, setMessage] = useState(null); // { type, text }

  // items is the source list; displayed is derived and never overwrites it.
  const displayed = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return k ? items.filter((c) => c.name.toLowerCase().includes(k)) : items;
  }, [items, keyword]);

  const handleSubmit = (data) => {
    if (dialog.mode === "create") {
      setItems(categoryService.create(data));
      setMessage({ type: "success", text: "Category created." });
    } else {
      setItems(categoryService.update(dialog.item.id, data));
      setMessage({ type: "success", text: "Category updated." });
    }
    setDialog(null);
  };

  const handleDeleteClick = (item) => {
    const inUse = newsService.getAll().some((n) => n.categoryId === item.id);
    if (inUse) {
      setMessage({ type: "error", text: "Cannot delete: this category is used by news articles." });
      return;
    }
    setToDelete(item);
  };

  const confirmDelete = () => {
    setItems(categoryService.remove(toDelete.id));
    setToDelete(null);
    setMessage({ type: "success", text: "Category deleted." });
  };

  return (
    <div>
      <div className="page-head">
        <h2>Category Management</h2>
        <button className="btn btn-primary" onClick={() => setDialog({ mode: "create", item: null })}>
          + Add Category
        </button>
      </div>

      {message && <div className={"alert alert-" + message.type}>{message.text}</div>}
      <SearchBox value={keyword} onChange={setKeyword} placeholder="Search by name..." />

      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {displayed.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td><StatusBadge status={c.status} /></td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => setDialog({ mode: "update", item: c })}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClick(c)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {displayed.length === 0 && (
        <p className="empty">{items.length === 0 ? "No categories yet." : "No categories match your search."}</p>
      )}

      {dialog && (
        <Modal title={dialog.mode === "create" ? "Add Category" : "Edit Category"} onClose={() => setDialog(null)}>
          <CategoryForm
            mode={dialog.mode}
            item={dialog.item}
            existing={items}
            onSubmit={handleSubmit}
            onCancel={() => setDialog(null)}
          />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          message={'Delete category "' + toDelete.name + '"?'}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
