/**
 * @author Tran Van Cuong
 */
import { STATUS_LABEL } from "../utils/constants";

export default function StatusBadge({ status }) {
  return (
    <span className={status === 1 ? "badge badge-active" : "badge badge-inactive"}>
      {STATUS_LABEL[status] ?? "Unknown"}
    </span>
  );
}
