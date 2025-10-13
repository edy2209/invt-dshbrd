import React from "react";

export default function DataReceptionistPage() {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Data Receptionist</h2>
			<p className="text-sm text-slate-500">Kelola data resepsionis yang terdaftar dalam sistem.</p>
			
			<div className="mt-6">
				<div className="bg-white rounded-lg shadow dark:bg-slate-800">
					<div className="p-6 border-b border-slate-200 dark:border-slate-700">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium">Daftar Resepsionis</h3>
							<button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
								Tambah Resepsionis
							</button>
						</div>
					</div>
					
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-slate-50 dark:bg-slate-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Nama
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Telepon
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
								<tr>
									<td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
										Belum ada data resepsionis
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}