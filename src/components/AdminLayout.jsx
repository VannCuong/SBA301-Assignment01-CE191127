/**
 * @author Tran Van Cuong
 */
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardPage from "../pages/DashboardPage";
import CategoryManagement from "../pages/CategoryManagement";
import NewsManagement from "../pages/NewsManagement";
import UserManagement from "../pages/UserManagement";
import SettingsPage from "../pages/SettingsPage";

// Master layout shared by every admin page. Navigation uses a simple
// "current page" state (no router) because the assignment scope is small.
const PAGES = {
  dashboard: DashboardPage,
  category: CategoryManagement,
  news: NewsManagement,
  users: UserManagement,
  settings: SettingsPage,
};

export default function AdminLayout({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const CurrentPage = PAGES[page];

  return (
    <div className="layout">
      <Header user={user} onLogout={onLogout} />
      <div className="layout-body">
        <Sidebar active={page} onNavigate={setPage} />
        <main className="content">
          <CurrentPage user={user} />
        </main>
      </div>
    </div>
  );
}
