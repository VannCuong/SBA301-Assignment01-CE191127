/**
 * @author Tran Van Cuong
 */
import { MENU } from "../utils/constants";

export default function Sidebar({ active, onNavigate }) {
  return (
    <nav className="sidebar">
      <ul>
        {MENU.map((item) => (
          <li key={item.key}>
            <button
              className={item.key === active ? "menu-item active" : "menu-item"}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
