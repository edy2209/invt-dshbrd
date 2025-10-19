"use client";

import { useState } from "react";

interface RSVPResponse {
  id: number;
  guestName: string;
  email: string;
  phone: string;
  status: "Hadir" | "Tidak Hadir" | "Belum Merespon";
  responseDate: string | null;
  message: string;
  attendeeCount: number;
  dietaryRestrictions: string;
  accommodation: boolean;
  giftType: "Angpao" | "Barang" | "Tidak Memberi";
  giftAmount?: number;
}

const mockRSVPResponses: RSVPResponse[] = [
  {
    id: 1,
    guestName: "Andi Saputra",
    email: "andi@email.com",
    phone: "08123456789",
    status: "Hadir",
    responseDate: "2024-11-15",
    message: "Selamat untuk kalian berdua! Sangat senang bisa hadir.",
    attendeeCount: 2,
    dietaryRestrictions: "Vegetarian",
    accommodation: false,
    giftType: "Angpao",
    giftAmount: 250000,
  },
  {
    id: 2,
    guestName: "Budi Santoso",
    email: "budi@email.com",
    phone: "08123456790",
    status: "Tidak Hadir",
    responseDate: "2024-11-14",
    message: "Maaf tidak bisa hadir karena ada acara keluarga. Semoga acara berjalan lancar!",
    attendeeCount: 0,
    dietaryRestrictions: "",
    accommodation: false,
    giftType: "Angpao",
    giftAmount: 150000,
  },
  {
    id: 3,
    guestName: "Cindy Oktavia",
    email: "cindy@email.com",
    phone: "08123456791",
    status: "Hadir",
    responseDate: "2024-11-16",
    message: "Wah akhirnya! Selamat ya teman. Tunggu aku datang.",
    attendeeCount: 1,
    dietaryRestrictions: "Tidak ada",
    accommodation: true,
    giftType: "Barang",
  },
  {
    id: 4,
    guestName: "Dewi Puspita",
    email: "dewi@email.com",
    phone: "08123456792",
    status: "Belum Merespon",
    responseDate: null,
    message: "",
    attendeeCount: 0,
    dietaryRestrictions: "",
    accommodation: false,
    giftType: "Tidak Memberi",
  },
];

export default function RSVPPage() {
  const [responses, setResponses] = useState<RSVPResponse[]>(mockRSVPResponses);
  const [selectedResponse, setSelectedResponse] = useState<RSVPResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (response: RSVPResponse) => {
    setSelectedResponse(response);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResponse(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hadir":
        return "bg-green-100 text-green-800";
      case "Tidak Hadir":
        return "bg-red-100 text-red-800";
      case "Belum Merespon":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredResponses = responses.filter(response => {
    const matchesSearch = response.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         response.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || response.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: responses.length,
    attending: responses.filter(r => r.status === "Hadir").length,
    notAttending: responses.filter(r => r.status === "Tidak Hadir").length,
    pending: responses.filter(r => r.status === "Belum Merespon").length,
    totalAttendees: responses.filter(r => r.status === "Hadir").reduce((sum, r) => sum + r.attendeeCount, 0),
    totalGifts: responses.filter(r => r.giftType === "Angpao" && r.giftAmount).reduce((sum, r) => sum + (r.giftAmount || 0), 0),
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Lihat RSVP
            </h1>
            <p className="text-gray-600">
              Monitor respon tamu dan kelola konfirmasi kehadiran
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export Data</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 font-medium text-sm uppercase mb-2">Total Undangan</p>
            <p className="text-4xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 font-medium text-sm uppercase mb-2">Akan Hadir</p>
            <p className="text-4xl font-bold text-green-600">{stats.attending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 font-medium text-sm uppercase mb-2">Tidak Hadir</p>
            <p className="text-4xl font-bold text-red-600">{stats.notAttending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 font-medium text-sm uppercase mb-2">Belum Respon</p>
            <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 font-medium text-sm uppercase mb-2">Total Kehadiran</p>
            <p className="text-4xl font-bold text-indigo-600">{stats.totalAttendees}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 font-medium text-sm uppercase mb-2">Total Angpao</p>
            <p className="text-2xl font-bold text-green-600">
              Rp {stats.totalGifts.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="All">Semua Status</option>
                <option value="Hadir">Akan Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Belum Merespon">Belum Merespon</option>
              </select>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                Kirim Reminder
              </button>
            </div>
          </div>
        </div>

        {/* RSVP Responses Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Tamu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status RSVP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Respon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah Kehadiran
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hadiah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResponses.map((response) => (
                  <tr key={response.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{response.guestName}</div>
                        <div className="text-sm text-gray-500">{response.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(response.status)}`}>
                        {response.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {response.responseDate ? new Date(response.responseDate).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {response.attendeeCount > 0 ? `${response.attendeeCount} orang` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {response.giftType === "Angpao" && response.giftAmount ? 
                        `Rp ${response.giftAmount.toLocaleString('id-ID')}` : 
                        response.giftType
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(response)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Detail
                      </button>
                      {response.status === "Belum Merespon" && (
                        <button className="text-blue-600 hover:text-blue-900">
                          Reminder
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {isModalOpen && selectedResponse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Detail RSVP - {selectedResponse.guestName}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Informasi Tamu</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Nama:</span> {selectedResponse.guestName}</p>
                        <p><span className="font-medium">Email:</span> {selectedResponse.email}</p>
                        <p><span className="font-medium">Telepon:</span> {selectedResponse.phone}</p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedResponse.status)}`}>
                            {selectedResponse.status}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Detail Kehadiran</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Tanggal Respon:</span> {
                          selectedResponse.responseDate ? 
                          new Date(selectedResponse.responseDate).toLocaleDateString('id-ID') : 
                          'Belum merespon'
                        }</p>
                        <p><span className="font-medium">Jumlah Kehadiran:</span> {selectedResponse.attendeeCount} orang</p>
                        <p><span className="font-medium">Akomodasi:</span> {selectedResponse.accommodation ? 'Ya' : 'Tidak'}</p>
                        <p><span className="font-medium">Pantangan Makanan:</span> {selectedResponse.dietaryRestrictions || 'Tidak ada'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Hadiah</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><span className="font-medium">Jenis Hadiah:</span> {selectedResponse.giftType}</p>
                      {selectedResponse.giftAmount && (
                        <p><span className="font-medium">Jumlah:</span> Rp {selectedResponse.giftAmount.toLocaleString('id-ID')}</p>
                      )}
                    </div>
                  </div>

                  {selectedResponse.message && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Pesan dari Tamu</h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-800">{selectedResponse.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-6">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}