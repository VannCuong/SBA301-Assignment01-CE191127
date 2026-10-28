/**
 * @author Tran Van Cuong
 */
import { useMemo, useState } from "react";
import newsService from "../services/newsService";
import categoryService from "../services/categoryService";
import userService from "../services/userService";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import SearchBox from "../components/SearchBox";
import StatusBadge from "../components/StatusBadge";

function NewsForm({ mode, item, categories, users, currentUser, onSubmit, onCancel }) {
  const [title, setTitle] = useState(item ? item.title : "");
  const [content, setContent] = useState(item ? item.content : "");
  const [categoryId, setCategoryId] = useState(item ? item.categoryId : (categories[0] ? categories[0].id : ""));
  const [createdBy, setCreatedBy] = useState(item ? item.createdBy : currentUser.username);
  const [status, setStatus] = useState(item ? item.status : 1);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    if (!categories.some((c) => c.id === Number(categoryId))) {
      setError("Please select a valid category.");
      return;
    }
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      categoryId: Number(categoryId),
      createdBy,
      status: Number(status),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="alert alert-error">{error}</div>}
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Content</label>
      <textarea rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
      <label>Category</label>
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <label>Created by</label>
      <select value={createdBy} onChange={(e) => setCreatedBy(e.target.value)}>
        {users.map((u) => (
          <option key={u.id} value={u.username}>{u.username}</option>
        ))}
      </select>
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

export default function NewsManagement({ user }) {
  const [items, setItems] = useState(() => newsService.getAll());
  const categories = useMemo(() => categoryService.getAll(), []);
  const users = useMemo(() => userService.getAll(), []);
  const [keyword, setKeyword] = useState("");
  const [dialog, setDialog] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [message, setMessage] = useState(null);

  const categoryName = (id) => {
    const found = categories.find((c) => c.id === id);
    return found ? found.name : "Unknown";
  };

  const displayed = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return items;
    return items.filter(
      (n) => n.title.toLowerCase().includes(k) || n.content.toLowerCase().includes(k)
    );
  }, [items, keyword]);

  const handleSubmit = (data) => {
    if (dialog.mode === "create") {
      setItems(newsService.create(data));
      setMessage({ type: "success", text: "News created." });
    } else {
      setItems(newsService.update(dialog.item.id, data));
      setMessage({ type: "success", text: "News updated." });
    }
    setDialog(null);
  };

  const confirmDelete = () => {
    setItems(newsService.remove(toDelete.id));
    setToDelete(null);
    setMessage({ type: "success", text: "News deleted." });
  };

  return (
    <div>
      <div className="page-head">
        <h2>News Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setDialog({ mode: "create", item: null })}
          disabled={categories.length === 0}
          title={categories.length === 0 ? "Create a category first" : ""}
        >
          + Add News
        </button>
      </div>

      {message && <div className={"alert alert-" + message.type}>{message.text}</div>}
      <SearchBox value={keyword} onChange={setKeyword} placeholder="Search by title or content..." />

      <table className="table">
        <thead>
          <tr><th>ID</th><th>Title</th><th>Category</th><th>Created by</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {displayed.map((n) => (
            <tr key={n.id}>
              <td>{n.id}</td>
              <td>{n.title}</td>
              <td>{categoryName(n.categoryId)}</td>
              <td>{n.createdBy}</td>
              <td><StatusBadge status={n.status} /></td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => setDialog({ mode: "update", item: n })}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => setToDelete(n)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {displayed.length === 0 && (
        <p className="empty">{items.length === 0 ? "No news yet." : "No news match your search."}</p>
      )}

      {dialog && (
        <Modal title={dialog.mode === "create" ? "Add News" : "Edit News"} onClose={() => setDialog(null)}>
          <NewsForm
            mode={dialog.mode}
            item={dialog.item}
            categories={categories}
            users={users}
            currentUser={user}
            onSubmit={handleSubmit}
            onCancel={() => setDialog(null)}
          />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          message={'Delete news "' + toDelete.title + '"?'}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
