/**
 * @author Tran Van Cuong
 */
import { useState } from "react";
import { ROLE_LABEL } from "../utils/constants";
import { resetDemoData } from "../services/authService";

export default function SettingsPage({ user }) {
  const [done, setDone] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setDone(true);
  };

  return (
    <div>
      <h2>Settings</h2>

      <div className="panel">
        <h3>Current account</h3>
        <p>Username: <strong>{user.username}</strong></p>
        <p>Full name: <strong>{user.fullName}</strong></p>
        <p>Role: <strong>{ROLE_LABEL[user.role]}</strong></p>
      </div>

      <div className="panel">
        <h3>Demo data</h3>
        <p className="muted">Data is stored in the browser (localStorage). Reset restores the original sample data.</p>
        <button className="btn btn-danger" onClick={handleReset}>Reset demo data</button>
        {done && <div className="alert alert-success">Demo data reset. Open any list to see the sample data again.</div>}
      </div>
    </div>
  );
}
