/**
 * @author Tran Van Cuong
 */
import logo from "../assets/logo.svg";

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} alt="FUNews logo" />
        <span>FUNewsManagementSystem</span>
      </div>
      <div className="header-user">
        <span>{user.fullName} ({user.username})</span>
        <button className="btn btn-light" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}
