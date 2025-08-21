import "./styles.css";

export default function TagList({ tags = [] }) {
  if (!Array.isArray(tags) || tags.length === 0) return null;
  return (
    <div className="taglist">
      {tags.map((t) => (
        <span key={t} className="taglist__tag">#{t}</span>
      ))}
    </div>
  );
}