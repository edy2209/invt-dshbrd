"use client";

import React, { useState } from "react";
import UpdateClientModal from "./UpdateClientModal";
import AddClientModal from "./AddClientModal";
import AddReceptionistModal from "./AddReceptionistModal";
import ClientInfoModal from "./ClientInfoModal";

interface Client {
  id: string;
  name: string;
  phone: string;
  subscription: string;
  theme: string;
  expiry: string;
  addons: string;
  hasReceptionist: boolean;
  active: boolean;
}

// Extended mock data with wedding details
const MOCK = [
  { 
    id: "111",
    name: "Jhon Deep",
    phone: "0821xxxx",
    subscription: "premium",
    theme: "fairytale",
    expiry: "31 D 12 H",
    addons: "-",
    hasReceptionist: true,
    active: true,
    // Wedding info
    maleName: "John Deep",
    femaleName: "Jane Deep",
    maleParents: "Mr. & Mrs. Deep Sr.",
    femaleParents: "Mr. & Mrs. Smith",
    maleSocialMedia: "@johndeep",
    femaleSocialMedia: "@janedeep",
    openingWords: "Dengan memohon Rahmat dan Ridho Allah SWT...",
    closingWords: "Merupakan suatu kebahagiaan bagi kami...",
    timeline: [
      {
        title: "Pertama Bertemu",
        date: "15 Juni 2020",
        story: "Kami bertemu pertama kali di sebuah cafe..."
      },
      {
        title: "Mulai Dekat",
        date: "1 Agustus 2020",
        story: "Setelah beberapa kali bertemu..."
      }
    ],
    ceremonyDate: "15 Oktober 2025",
    ceremonyTime: "08:00 WIB",
    ceremonyVenue: "Masjid Agung",
    ceremonyMaps: "https://maps.google.com",
    receptionDate: "15 Oktober 2025",
    receptionTime: "11:00 WIB",
    receptionVenue: "Hotel Grand Palace",
    receptionMaps: "https://maps.google.com",
    photos: [
      "/sample/photo1.jpg",
      "/sample/photo2.jpg",
      "/sample/photo3.jpg"
    ],
    gallery: [
      "/sample/moment1.jpg",
      "/sample/moment2.jpg",
      "/sample/moment3.jpg",
      "/sample/moment4.jpg"
    ],
    dressCodeColor1: "#FFD700",
    dressCodeColor2: "#B8860B",
    bankAccounts: [
      "BCA - 1234567890 - John Deep",
      "Mandiri - 0987654321 - Jane Deep"
    ],
    registry: [
      { image: "/sample/gift1.jpg", name: "Coffee Maker" },
      { image: "/sample/gift2.jpg", name: "Stand Mixer" }
    ],
    giftAddress: "Jl. Contoh No. 123, Jakarta Selatan",
    giftPhone: "08123456789",
    backgroundMusic: "Perfect - Ed Sheeran.mp3"
  },
  {
    id: "222",
    name: "Erina",
    phone: "0821xxxx",
    subscription: "standar",
    theme: "vintage",
    expiry: "31 D 12 H",
    addons: "Buku Tamu Digital",
    hasReceptionist: true,
    active: true
  },
  {
    id: "333",
    name: "Zoe",
    phone: "0821xxxx",
    subscription: "standar",
    theme: "vintage",
    expiry: "31 D 12 H",
    addons: "-",
    hasReceptionist: false,
    active: true
  }
];

export default function ManageClientPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReceptionistModal, setShowReceptionistModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleUpdate = (client: Client) => {
    setSelectedClient(client);
    setShowUpdateModal(true);
  };

  const handleManageReceptionist = (client: Client) => {
    setSelectedClient(client);
    setShowReceptionistModal(true);
  };

  const handleShowInfo = (client: Client) => {
    setSelectedClient(client);
    setShowInfoModal(true);
  };

  const handleDelete = (client: Client) => {
    if (window.confirm(`Are you sure you want to delete client ${client.name}?`)) {
      // TODO: Implement delete logic
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Manage Client</h2>
          <p className="text-sm text-slate-500">Daftar client yang terdaftar di sistem</p>
        </div>
        <div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Tambah Client
          </button>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm font-medium text-slate-600 border-b dark:border-slate-700">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Nama Klien</th>
              <th className="py-3 px-4">No telepon / WA</th>
              <th className="py-3 px-4">Type subscription</th>
              <th className="py-3 px-4">Theme</th>
              <th className="py-3 px-4">Expired in</th>
              <th className="py-3 px-4">Add on</th>
              <th className="py-3 px-4">Client info</th>
              <th className="py-3 px-4">Receptionist link</th>
              <th className="py-3 px-4">Management invitation</th>
              <th className="py-3 px-4" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map((client) => (
              <tr key={client.id} className="border-b last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700 dark:border-slate-700">
                <td className="py-3 px-4 text-sm">{client.id}</td>
                <td className="py-3 px-4 text-sm font-medium">{client.name}</td>
                <td className="py-3 px-4 text-sm">{client.phone}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.subscription === 'premium' 
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  }`}>
                    {client.subscription}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{client.theme}</td>
                <td className="py-3 px-4 text-sm">{client.expiry}</td>
                <td className="py-3 px-4 text-sm">{client.addons}</td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => handleShowInfo(client)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Information
                  </button>
                </td>
                <td className="py-3 px-4">
                  {client.hasReceptionist ? (
                    <button 
                      onClick={() => handleManageReceptionist(client)}
                      className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Manage Receptionist
                    </button>
                  ) : (
                    <span className="text-sm text-slate-400">-</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                    Manage
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleUpdate(client)}
                      className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white text-sm"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => handleDelete(client)}
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUpdateModal && selectedClient && (
        <UpdateClientModal
          client={selectedClient}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedClient(null);
          }}
        />
      )}

      {showAddModal && (
        <AddClientModal
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showReceptionistModal && selectedClient && (
        <AddReceptionistModal
          onClose={() => {
            setShowReceptionistModal(false);
            setSelectedClient(null);
          }}
        />
      )}

      {showInfoModal && selectedClient && (
        <ClientInfoModal
          client={selectedClient}
          onClose={() => {
            setShowInfoModal(false);
            setSelectedClient(null);
          }}
        />
      )}
    </div>
  );
}
