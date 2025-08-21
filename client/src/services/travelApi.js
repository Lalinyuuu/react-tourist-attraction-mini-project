export async function fetchTravelPlaces(query = "") {
  try {
    const res = await fetch(`http://localhost:4001/trips?keywords=${query}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}