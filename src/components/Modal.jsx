/**
 * @author Tran Van Cuong
 */

// Generic popup dialog. Rendered only while open, so child forms start fresh each time.
export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
