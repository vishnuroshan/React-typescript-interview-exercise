import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
const fetchUsers = async (search = "") => {
    const res = await fetch(`https://potterapi-fedeperin.vercel.app/en/spells?search=${encodeURIComponent(search)}`);
    const data = await res.json();
    return data;
};
export default function App() {
    const [spells, setSpells] = useState([]);
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
    return (_jsxs("div", { style: { maxWidth: 600, margin: "2rem auto", padding: "1rem" }, children: [_jsx("input", { type: "text", value: filter.search, onChange: (e) => setFilter({ search: e.target.value }), placeholder: "Search Spells", style: {
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    marginBottom: "1rem",
                    boxSizing: "border-box"
                } }), loading && (_jsx("div", { style: { marginBottom: "1rem", color: "#555" }, children: "Loading..." })), _jsx("ol", { style: { paddingLeft: "1.5rem" }, children: spells.map((s) => (_jsxs("li", { style: { marginBottom: "1rem" }, children: [_jsx("h3", { style: { margin: 0 }, children: s.spell }), _jsxs("span", { style: { color: "#666" }, children: ["- ", s.use] })] }, s.index))) })] }));
}
