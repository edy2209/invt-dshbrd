import React from "react";

export default function SystemLogPage() {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">System Log</h2>
			<p className="text-sm text-slate-500">Log sistem dan error aplikasi.</p>
			
			<div className="mt-6">
				<div className="bg-white rounded-lg shadow dark:bg-slate-800">
					<div className="p-6 border-b border-slate-200 dark:border-slate-700">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium">Log Sistem Terbaru</h3>
							<div className="flex space-x-2">
								<select className="border border-slate-300 rounded-md px-3 py-1 text-sm dark:border-slate-600 dark:bg-slate-700">
									<option>Semua Level</option>
									<option>Error</option>
									<option>Warning</option>
									<option>Info</option>
									<option>Debug</option>
								</select>
								<button className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 text-sm">
									Refresh
								</button>
							</div>
						</div>
					</div>
					
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-slate-50 dark:bg-slate-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Timestamp
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Level
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Message
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-200 uppercase tracking-wider">
										Source
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
								<tr>
									<td colSpan={4} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
										Belum ada log sistem
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