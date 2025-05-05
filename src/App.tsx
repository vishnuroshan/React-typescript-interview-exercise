import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

type Spell = {
  spell: string;
  use: string;
  index: number;
};

const fetchUsers = async (search: string = ""): Promise<Spell[]> => {
  const res = await fetch(
    `https://potterapi-fedeperin.vercel.app/en/spells?search=${encodeURIComponent(
      search
    )}`
  );
  const data = await res.json();
  return data;
};

export default function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [filter, setFilter] = useState({ search: "" });
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(filter.search, 400);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchUsers(debouncedSearch).then((data) => {
      setSpells(data);
      setLoading(false);
    }).catch((err) => {
      if (err.name !== "AbortError") {
        setLoading(false);
      }
    });
    return () => controller.abort();
  }, [debouncedSearch]);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <input
        type="text"
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
        placeholder="Search Spells"
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box"
        }}
      />
      {loading && (
        <div style={{ marginBottom: "1rem", color: "#555" }}>Loading...</div>
      )}
      <ol style={{ paddingLeft: "1.5rem" }}>
        {spells.map((s) => (
          <li key={s.index} style={{ marginBottom: "1rem" }}>
            <h3 style={{ margin: 0 }}>{s.spell}</h3>
            <span style={{ color: "#666" }}>- {s.use}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
