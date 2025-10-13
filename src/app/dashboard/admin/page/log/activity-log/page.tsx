import React from "react";

export default function ActivityLogPage() {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Activity Log</h2>
			<p className="text-sm text-slate-500">Log aktivitas pengguna dalam sistem.</p>
			
			<div className="mt-6">
				<div className="bg-white rounded-lg shadow dark:bg-slate-800">
					<div className="p-6 border-b border-slate-200 dark:border-slate-700">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium">Log Aktivitas Terbaru</h3>
							<div className="flex space-x-2">
								<select className="border border-slate-300 rounded-md px-3 py-1 text-sm dark:border-slate-600 dark:bg-slate-700">
									<option>Semua Aktivitas</option>
									<option>Login</option>
									<option>CRUD Client</option>
									<option>CRUD Undangan</option>
								</select>
								<button className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 text-sm">
									Filter
								</button>
							</div>
						</div>
					</div>
					
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-slate-50 dark:bg-slate-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Waktu
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										User
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Aktivitas
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										IP Address
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
								<tr>
									<td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
										Belum ada log aktivitas
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