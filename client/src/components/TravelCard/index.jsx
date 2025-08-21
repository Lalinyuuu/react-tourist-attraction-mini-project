import "./styles.css";

export default function TravelCard({ trip, onTagClick }) {
  const title = trip.title;
  const url = trip.url;
  const tags = trip.tags ?? [];
  const photos = trip.photos ?? [];
  const cover = photos[0];
  const thumbs = photos.slice(1, 4);
  const desc = String(trip.description ?? "");

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      alert("คัดลอกลิงก์แล้ว ");
    } catch (err) {
      alert("คัดลอกไม่สำเร็จ ");
      console.error(err);
    }
  }

  return (
    <article className="tcard">
      {cover ? (
        <img className="tcard__cover" src={cover} alt={title} loading="lazy" />
      ) : (
        <div className="tcard__cover tcard__cover--placeholder" />
      )}

      <div className="tcard__content">
        <h3 className="tcard__title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>

        <p className="tcard__desc">
          {desc.length > 100 ? desc.slice(0, 100) + "…" : desc}
        </p>

        <div className="tcard__actions">
          <a className="tcard__read" href={url} target="_blank" rel="noopener noreferrer">
            อ่านต่อ
          </a>
          <button className="tcard__copy" type="button" onClick={copyLink}>
            คัดลอกลิงก์
          </button>
        </div>

        {!!tags.length && (
          <div className="taglist">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className="taglist__tag"
                onClick={() => onTagClick?.(t)}
                title={`เพิ่มคำค้น: ${t}`}
              >
                #{t}
              </button>
            ))}
          </div>
        )}

        {!!thumbs.length && (
          <div className="imagelist">
            {thumbs.map((src, i) => (
              <img key={i} className="imagelist__img" src={src} alt="" loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}