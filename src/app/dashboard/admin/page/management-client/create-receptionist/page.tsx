import React from "react";

export default function CreateReceptionistPage() {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Create Receptionist / Link</h2>
			<p className="text-sm text-slate-500">Buat akun resepsionis dan generate link untuk klien premium.</p>
			
			<div className="mt-6 max-w-2xl">
				<div className="bg-white rounded-lg shadow p-6 dark:bg-slate-800">
					<h3 className="text-lg font-medium mb-4">Buat Akun Resepsionis</h3>
					
					<form className="space-y-4">
						<div>
							<label htmlFor="receptionist-name" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
								Nama Resepsionis
							</label>
							<input
								type="text"
								id="receptionist-name"
								className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								placeholder="Masukkan nama resepsionis"
							/>
						</div>
						
						<div>
							<label htmlFor="receptionist-email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
								Email
							</label>
							<input
								type="email"
								id="receptionist-email"
								className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								placeholder="email@example.com"
							/>
						</div>
						
						<div>
							<label htmlFor="receptionist-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
								Nomor Telepon
							</label>
							<input
								type="tel"
								id="receptionist-phone"
								className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								placeholder="08xxxxxxxxxx"
							/>
						</div>
						
						<div className="pt-4">
							<button
								type="submit"
								className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Buat Akun & Generate Link
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}