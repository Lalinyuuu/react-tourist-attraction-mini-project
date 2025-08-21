import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./components/SearchBar";
import TravelCard from "./components/TravelCard";

const API = "http://localhost:4001";

export default function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchTrips(q = "") {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/trips`, {
        params: { keywords: (q ?? "").trim() },
      });
      setItems(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      setError(err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchTrips(""); }, []);

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    if (query.trim() === "") { fetchTrips(""); return; }
    const t = setTimeout(() => fetchTrips(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  function handleTagClick(tag) {
    const tokens = query.trim().split(/\s+/).filter(Boolean);
    if (!tokens.includes(tag)) {
      setQuery(tokens.length ? `${tokens.join(" ")} ${tag}` : tag);
    }
  }

  async function handleCopyLink(url) {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("คัดลอกลิงก์แล้ว!", { autoClose: 1800 });
    } catch {
      toast.error("คัดลอกไม่สำเร็จ");
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">เที่ยวไหนดี</h1>
        <SearchBar value={query} onChange={setQuery} />
        <hr className="app__divider" />
      </header>

      <main className="app__main">
        {isLoading && <p className="app__info">กำลังโหลดข้อมูล…</p>}
        {error && (
          <p className="app__error">
            เกิดข้อผิดพลาด: {error?.response?.data?.message ?? error?.message ?? "ไม่ทราบสาเหตุ"}
          </p>
        )}
        {!isLoading && !error && items.length === 0 && (
          <p className="app__info">
            ไม่พบสถานที่ที่ตรงกับคำค้นหา{query.trim() ? ` "${query.trim()}"` : ""}
          </p>
        )}

        <section className="app__list">
          {items.map((trip) => (
            <TravelCard
              key={trip.eid ?? trip.url}
              trip={trip}
              onTagClick={handleTagClick}
              onCopyLink={() => handleCopyLink(trip.url)}
            />
          ))}
        </section>
      </main>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}