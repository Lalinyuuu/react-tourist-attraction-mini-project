import "./styles.css";

export default function ImageList({ images = [], title = "" }) {
  const list = Array.isArray(images) ? images.slice(0, 3) : [];
  if (list.length === 0) return null;

  return (
    <div className="imagelist" aria-label="รูปภาพประกอบ">
      {list.map((src, i) => (
        <img key={i} className="imagelist__img" src={src} alt={`รูปประกอบ: ${title}`} loading="lazy" />
      ))}
    </div>
  );
}