import { useEffect, useState } from "react";

type Spell = {
  spell: string;
  use: string;
  index: number;
};

const fetchUsers = async (): Promise<Spell[]> => {
  const res = await fetch(
    "https://potterapi-fedeperin.vercel.app/en/spells?search="
  );
  const data = await res.json();
  console.log(data);
  return data;
};

export default function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [filter, setFilter] = useState({ search: "" });

  useEffect(() => {
    fetchUsers().then((data) => {
      setSpells(data);
    });
  }, [filter]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => setFilter({ search: e.target.value })}
        placeholder="Search Spells"
      />
      <ol>
        {spells.map((s) => (
          <li key={s.index}>
            <h3>{s.spell}</h3> - {s.use}
          </li>
        ))}
      </ol>
    </>
  );
}
