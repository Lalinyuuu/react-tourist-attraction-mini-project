import "./styles.css";

export default function SearchBar({ value, onChange, placeholder = "ค้นหาที่เที่ยว..." }) {
  return (
    <div className="searchbar">
      <input
        className="searchbar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}