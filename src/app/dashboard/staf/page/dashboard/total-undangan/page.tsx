import React from "react";

export default function TotalUndanganPage() {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Total Undangan Dibuat</h2>
			<p className="text-sm text-slate-500">Statistik total undangan yang telah dibuat dalam sistem.</p>
			
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
				<div className="p-6 bg-white rounded-lg shadow dark:bg-slate-800">
					<h3 className="text-lg font-semibold mb-2">Total Undangan</h3>
					<p className="text-3xl font-bold text-indigo-600">0</p>
					<p className="text-sm text-slate-500 mt-1">Semua undangan</p>
				</div>
				<div className="p-6 bg-white rounded-lg shadow dark:bg-slate-800">
					<h3 className="text-lg font-semibold mb-2">Undangan Aktif</h3>
					<p className="text-3xl font-bold text-green-600">0</p>
					<p className="text-sm text-slate-500 mt-1">Sedang berjalan</p>
				</div>
				<div className="p-6 bg-white rounded-lg shadow dark:bg-slate-800">
					<h3 className="text-lg font-semibold mb-2">Undangan Selesai</h3>
					<p className="text-3xl font-bold text-gray-600">0</p>
					<p className="text-sm text-slate-500 mt-1">Sudah berakhir</p>
				</div>
			</div>
		</div>
	);
}