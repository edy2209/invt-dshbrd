"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function AddClientModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subscription, setSubscription] = useState("premium");
  const [theme, setTheme] = useState("fairytale");
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [weddingTime, setWeddingTime] = useState("");
  const [weddingLocation, setWeddingLocation] = useState("");
  const [addons, setAddons] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add logic
    onClose();
  };

  const handleAddonChange = (addon: string) => {
    if (addons.includes(addon)) {
      setAddons(addons.filter(item => item !== addon));
    } else {
      setAddons([...addons, addon]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New Client</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Client</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">No Telepon / WA</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type Subscription</label>
              <select
                value={subscription}
                onChange={(e) => setSubscription(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="premium">Premium</option>
                <option value="standar">Standar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="fairytale">Fairytale</option>
                <option value="vintage">Vintage</option>
                <option value="modern">Modern</option>
              </select>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-4">Wedding Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Pengantin Wanita</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nama Pengantin Pria</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tanggal Pernikahan</label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Waktu Pernikahan</label>
                <input
                  type="time"
                  value={weddingTime}
                  onChange={(e) => setWeddingTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Lokasi Pernikahan</label>
                <textarea
                  value={weddingLocation}
                  onChange={(e) => setWeddingLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-4">Add-ons</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={addons.includes("galeri")}
                  onChange={() => handleAddonChange("galeri")}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Galeri Foto</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={addons.includes("liveStreaming")}
                  onChange={() => handleAddonChange("liveStreaming")}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Live Streaming</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={addons.includes("music")}
                  onChange={() => handleAddonChange("music")}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Custom Music</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}