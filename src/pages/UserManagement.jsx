/**
 * @author Tran Van Cuong
 */
import { useMemo, useState } from "react";
import userService from "../services/userService";
import newsService from "../services/newsService";
import { ROLE_LABEL } from "../utils/constants";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import SearchBox from "../components/SearchBox";
import StatusBadge from "../components/StatusBadge";

function UserForm({ mode, item, existing, onSubmit, onCancel }) {
  const [username, setUsername] = useState(item ? item.username : "");
  const [password, setPassword] = useState(item ? item.password : "");
  const [fullName, setFullName] = useState(item ? item.fullName : "");
  const [role, setRole] = useState(item ? item.role : 2);
  const [status, setStatus] = useState(item ? item.status : 1);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const uname = username.trim();
    if (!uname || !password || !fullName.trim()) {
      setError("Username, password and full name are required.");
      return;
    }
    const duplicate = existing.some(
      (u) => u.username.toLowerCase() === uname.toLowerCase() && (!item || u.id !== item.id)
    );
    if (duplicate) {
      setError("Username already exists.");
      return;
    }
    onSubmit({
      username: uname,
      password,
      fullName: fullName.trim(),
      role: Number(role),
      status: Number(status),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="alert alert-error">{error}</div>}
      <label>Username</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Full name</label>
      <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <label>Role</label>
      <select value={role} onChange={(e) => setRole(Number(e.target.value))}>
        <option value={1}>Admin</option>
        <option value={2}>Staff</option>
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

export default function UserManagement({ user }) {
  const [items, setItems] = useState(() => userService.getAll());
  const [keyword, setKeyword] = useState("");
  const [dialog, setDialog] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [message, setMessage] = useState(null);

  const displayed = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return items;
    return items.filter(
      (u) => u.username.toLowerCase().includes(k) || u.fullName.toLowerCase().includes(k)
    );
  }, [items, keyword]);

  const handleSubmit = (data) => {
    if (dialog.mode === "create") {
      setItems(userService.create(data));
      setMessage({ type: "success", text: "User created." });
    } else {
      setItems(userService.update(dialog.item.id, data));
      setMessage({ type: "success", text: "User updated." });
    }
    setDialog(null);
  };

  const handleDeleteClick = (item) => {
    if (item.username === user.username) {
      setMessage({ type: "error", text: "Cannot delete the account you are logged in with." });
      return;
    }
    if (newsService.getAll().some((n) => n.createdBy === item.username)) {
      setMessage({ type: "error", text: "Cannot delete: this user has created news articles." });
      return;
    }
    setToDelete(item);
  };

  const confirmDelete = () => {
    setItems(userService.remove(toDelete.id));
    setToDelete(null);
    setMessage({ type: "success", text: "User deleted." });
  };

  return (
    <div>
      <div className="page-head">
        <h2>User Management</h2>
        <button className="btn btn-primary" onClick={() => setDialog({ mode: "create", item: null })}>
          + Add User
        </button>
      </div>

      {message && <div className={"alert alert-" + message.type}>{message.text}</div>}
      <SearchBox value={keyword} onChange={setKeyword} placeholder="Search by username or full name..." />

      <table className="table">
        <thead>
          <tr><th>ID</th><th>Username</th><th>Full name</th><th>Role</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {displayed.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td>{ROLE_LABEL[u.role] ?? "Unknown"}</td>
              <td><StatusBadge status={u.status} /></td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => setDialog({ mode: "update", item: u })}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClick(u)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {displayed.length === 0 && (
        <p className="empty">{items.length === 0 ? "No users yet." : "No users match your search."}</p>
      )}

      {dialog && (
        <Modal title={dialog.mode === "create" ? "Add User" : "Edit User"} onClose={() => setDialog(null)}>
          <UserForm
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
          message={'Delete user "' + toDelete.username + '"?'}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
