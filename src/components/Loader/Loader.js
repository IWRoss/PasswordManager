import "./Loader.css";

export default function Loader({ message = "Nearly there…" }) {
  return (
    <div className="loader">
      <div className="loader-content">
        <div className="loader-title">Loading...</div>
        <div className="loader-message">{message}</div>
      </div>
    </div>
  );
}
