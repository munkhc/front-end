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

  // DELETE
  const handleDelete = (id) => {
    setData((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-black text-white">
      
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-5">
        Medeelel
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search anything..."
        className="w-full border border-gray-700 p-3 rounded-md mb-6 bg-gray-900 text-white placeholder:text-gray-400 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const list = Array.isArray(item.ed)
            ? item.ed
            : Array.isArray(item.items)
            ? item.items
            : [];

          return (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md"
            >
              {/* IMAGE */}
              <div className="flex justify-center">
                <img
                  src={item.image || "/default-avatar.png"}
                  alt={item.ner || "user"}
                  className="w-24 h-24 rounded-full object-cover border border-gray-700 mb-3"
                />
              </div>

              {/* JOB */}
              <div className="mb-2">
                <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                  {item.mergejil}
                </span>
              </div>

              {/* INFO */}
              <p className="font-semibold text-lg">
                {item.ovog} {item.ner}
              </p>

              <p className="text-sm text-gray-400">
                {item.huis}
              </p>

              <p className="text-sm mt-1">
                Age: {item.nas}
              </p>

              <p className="text-sm">
                Height: {item.undur_sm} cm
              </p>

              <p className="text-sm break-all">
                {item.email}
              </p>

              {/* LIST */}
              <ul className="mt-3 list-disc ml-5 text-sm space-y-1">
                {list.map((ed, i) => (
                  <li key={i}>{ed?.name}</li>
                ))}
              </ul>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p className="text-gray-400 mt-6">
          No results found
        </p>
      )}
    </div>
  );
}