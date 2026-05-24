import { useState } from "react";

function GlobalSearch({ data }) {

  const [query, setQuery] = useState("");

  const filtered = data.filter(item =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((item, index) => (
        <div key={index}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}

export default GlobalSearch;