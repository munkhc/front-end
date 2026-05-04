"use client";

import { useState, useMemo } from "react";
import DataJson from "../utils/data.json";

export default function Home() {
  const [data, setData] = useState(DataJson);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const text = search.toLowerCase();

    return data.filter((item) => {
      const list = Array.isArray(item.ed)
        ? item.ed
        : Array.isArray(item.items)
        ? item.items
        : [];

      return (
        (item.ner || "").toLowerCase().includes(text) ||
        (item.ovog || "").toLowerCase().includes(text) ||
        (item.mergejil || "").toLowerCase().includes(text) ||
        (item.email || "").toLowerCase().includes(text) ||
        (item.huis || "").toLowerCase().includes(text) ||
        String(item.nas || "").includes(text) ||
        String(item.undur_sm || "").includes(text) ||
        list.some((ed) =>
          (ed?.name || "").toLowerCase().includes(text)
        )
      );
    });
  }, [data, search]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Medeelel</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search anything..."
        className="border p-2 rounded-md mb-5 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      {filtered.map((item) => {
        const list = Array.isArray(item.ed)
          ? item.ed
          : Array.isArray(item.items)
          ? item.items
          : [];

        return (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 mb-4 shadow-sm"
          >
            <img
              src={item.image || "/default-avatar.png"}
              alt={item.ner || "user"}
              className="w-20 h-20 object-cover rounded-full border mb-3"
            />

            {/* BADGE */}
            <span className="bg-gray-200 px-2 py-1 rounded text-sm">
              {item.mergejil}
            </span>

            <p className="mt-2 font-medium">
              {item.ovog} {item.ner}
            </p>
            <p className="text-sm text-gray-500">{item.huis}</p>
            <p className="text-sm">Age: {item.nas}</p>
            <p className="text-sm">Height: {item.undur_sm} cm</p>
            <p className="text-sm">{item.email}</p>

            {/* ITEMS */}
            <ul className="mt-2 list-disc ml-5 text-sm">
              {list.map((ed, i) => (
                <li key={i}>{ed?.name}</li>
              ))}
            </ul>

            {/* DELETE */}
            <button
              onClick={() =>
                setData((prev) =>
                  prev.filter((i) => i.id !== item.id)
                )
              }
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        );
      })}

      {/* NO RESULT */}
      {filtered.length === 0 && (
        <p className="text-gray-500">No results found</p>
      )}
    </div>
  );
}