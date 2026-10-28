/**
 * @author Tran Van Cuong
 */
import categoryService from "../services/categoryService";
import newsService from "../services/newsService";
import userService from "../services/userService";

function countByStatus(items) {
  const active = items.filter((i) => i.status === 1).length;
  return { total: items.length, active, inactive: items.length - active };
}

export default function DashboardPage({ user }) {
  const stats = [
    { label: "Categories", ...countByStatus(categoryService.getAll()) },
    { label: "News articles", ...countByStatus(newsService.getAll()) },
    { label: "Users", ...countByStatus(userService.getAll()) },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <p className="muted">Welcome back, {user.fullName}.</p>
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-title">{s.label}</div>
            <div className="stat-number">{s.total}</div>
            <div className="muted">Active: {s.active} &middot; Inactive: {s.inactive}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
