"use client";

import { useState, useEffect } from "react";

// Mock data untuk contoh
const mockGuests = [
  { id: 1, name: "Andi Saputra", status: "Hadir", giftType: "Angpao", giftValue: 250000, hadirTime: 9 },
  { id: 2, name: "Budi Santoso", status: "Belum Hadir", giftType: "Tidak Memberi Hadiah", giftValue: 0, hadirTime: null },
  { id: 3, name: "Cindy Oktavia", status: "Hadir", giftType: "Barang", giftValue: 0, hadirTime: 10 },
  { id: 4, name: "Dewi Puspita", status: "Hadir", giftType: "Angpao", giftValue: 500000, hadirTime: 11 },
  { id: 5, name: "Eko Prasetyo", status: "Hadir", giftType: "Angpao", giftValue: 100000, hadirTime: 10 },
  { id: 6, name: "Fajar Nugroho", status: "Belum Hadir", giftType: "Tidak Memberi Hadiah", giftValue: 0, hadirTime: null },
  { id: 7, name: "Gita Lestari", status: "Hadir", giftType: "Barang", giftValue: 0, hadirTime: 12 },
  { id: 8, name: "Hadi Susanto", status: "Hadir", giftType: "Angpao", giftValue: 300000, hadirTime: 11 },
  { id: 9, name: "Iwan Setiawan", status: "Belum Hadir", giftType: "Tidak Memberi Hadiah", giftValue: 0, hadirTime: null },
  { id: 10, name: "Joko Widodo", status: "Hadir", giftType: "Angpao", giftValue: 750000, hadirTime: 9 },
];

export default function ClientDashboard() {
  const [guests] = useState(mockGuests);
  const [stats, setStats] = useState({
    guestsPresent: 0,
    guestsAbsent: 0,
    guestsTotal: 0,
    angpaoCount: 0,
    itemCount: 0,
    presentPercentage: 0,
    absentPercentage: 0,
  });

  const [densityData, setDensityData] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const guestsPresent = guests.filter(g => g.status === "Hadir").length;
    const guestsAbsent = guests.filter(g => g.status === "Belum Hadir").length;
    const guestsTotal = guests.length;
    const angpaoCount = guests.filter(g => g.giftType === "Angpao").length;
    const itemCount = guests.filter(g => g.giftType === "Barang").length;

    setStats({
      guestsPresent,
      guestsAbsent,
      guestsTotal,
      angpaoCount,
      itemCount,
      presentPercentage: (guestsPresent / guestsTotal) * 100,
      absentPercentage: (guestsAbsent / guestsTotal) * 100,
    });

    // Calculate density data
    const timeData = guests.filter(g => g.status === "Hadir" && g.hadirTime).map(g => g.hadirTime!);
    const hourCounts: { [key: number]: number } = {};
    for (let i = 8; i <= 14; i++) {
      hourCounts[i] = 0;
    }
    timeData.forEach(time => {
      if (hourCounts[time] !== undefined) {
        hourCounts[time]++;
      }
    });
    setDensityData(hourCounts);
  }, [guests]);

  const StatCard = ({ title, value, subtitle, color, percentage }: {
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    percentage?: number;
  }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <p className="text-gray-500 font-medium text-sm uppercase mb-2">{title}</p>
      <p className={`text-4xl font-bold ${color} mb-2`}>{value}</p>
      {subtitle && <p className={`text-2xl font-bold ${color}`}>{subtitle}</p>}
      {percentage !== undefined && (
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              color.includes('indigo') ? 'bg-indigo-600' : 
              color.includes('red') ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Dashboard Tamu Undangan Digital
          </h1>
          <p className="text-gray-600">
            Pantau kehadiran tamu secara real-time dan kelola acara Anda dengan lebih baik.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Tamu Hadir"
            value={stats.guestsPresent}
            color="text-indigo-600"
            percentage={stats.presentPercentage}
          />
          <StatCard
            title="Tamu Belum Hadir"
            value={stats.guestsAbsent}
            color="text-red-500"
            percentage={stats.absentPercentage}
          />
          <StatCard
            title="Total Tamu"
            value={stats.guestsTotal}
            color="text-gray-800"
          />
          <StatCard
            title="Hadiah Diterima"
            value={`${stats.angpaoCount} Angpao`}
            subtitle={`${stats.itemCount} Barang`}
            color="text-green-600"
          />
        </div>

        {/* Charts and Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Density Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Grafik Kepadatan Tamu per Jam
            </h2>
            <div className="space-y-3">
              {Object.entries(densityData).map(([hour, count]) => (
                <div key={hour} className="flex items-center">
                  <div className="w-20 text-sm text-gray-600">
                    {hour}.00 - {parseInt(hour) + 1}.00
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div
                        className="bg-indigo-600 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${(count / Math.max(...Object.values(densityData))) * 100}%` }}
                      >
                        {count > 0 && (
                          <span className="text-white text-xs font-medium">{count}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Table */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Tabel Detail Tamu
            </h2>
            <div className="overflow-auto max-h-96 custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Tamu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Kehadiran
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jenis Kado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah (Angpao)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {guests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {guest.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          guest.status === 'Hadir' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {guest.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {guest.giftType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {guest.giftValue > 0 
                          ? `Rp ${guest.giftValue.toLocaleString('id-ID')}` 
                          : '-'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #f1f5f9;
        }
      `}</style>
    </div>
  );
}