/**
 * @author Tran Van Cuong
 */

export default function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="search-box">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="btn btn-light" onClick={() => onChange("")}>Clear</button>
      )}
    </div>
  );
}
