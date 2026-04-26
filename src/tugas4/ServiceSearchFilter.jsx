import { useState } from "react";
import data from "./service.json";

export default function ServiceSearchFilter() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const filtered = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category) &&
      (rating === "" || item.rating >= rating)
    );
  });

  return (
    <div className="p-6">

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search..."
          className="border p-3 rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* <select
          className="border p-3 rounded-xl shadow-sm"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select> */}
        <select
        className="border p-3 rounded-xl shadow-sm"
        onChange={(e) => setCategory(e.target.value)}
        >
        <option value="">Category</option>
        <option value="Luxury Sedan">Luxury Sedan</option>
        <option value="Supercar">Supercar</option>
        <option value="Grand Tourer">Grand Tourer</option>
        <option value="Sports Car">Sports Car</option>
        <option value="Luxury SUV">Luxury SUV</option>
        <option value="Luxury MPV">Luxury MPV</option>
        <option value="Sports Sedan">Sports Sedan</option>
        <option value="Hypercar">Hypercar</option>
        </select>
        
        <select
          className="border p-3 rounded-xl shadow-sm"
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Rating</option>
          <option value="4">≥ 4</option>
          <option value="4.5">≥ 4.5</option>
        </select>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden 
                       hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            {/* IMAGE */}
            <div className="relative">
              <img
                src={item.image}
                className="w-full h-44 object-cover"
              />

              {/* CATEGORY */}
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                {item.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4">

              {/* NAME */}
              <h2 className="text-lg font-bold">
                {item.name}
              </h2>

              {/* PROVIDER */}
              <p className="text-gray-500 text-sm">
                🏢 {item.provider.company} • {item.provider.location}
              </p>

              {/* CONTACT */}
              <p className="text-gray-400 text-xs mt-1">
                📧 {item.contact.email}
              </p>

              <p className="text-gray-400 text-xs mb-2">
                📞 {item.contact.phone}
              </p>

              {/* FEATURES (NESTED ✔) */}
              <div className="text-xs text-gray-500 mb-2 flex flex-wrap gap-1">
                {Object.entries(item.features).map(([key, value]) => (
                  <span
                    key={key}
                    className="bg-gray-100 px-2 py-1 rounded"
                  >
                    {key}: {value.toString()}
                  </span>
                ))}
              </div>

              {/* PRICE + RATING */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-blue-600 font-semibold">
                  Rp {item.price.toLocaleString()}
                </p>

                <p className="text-yellow-500 font-medium">
                  ⭐ {item.rating}
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}