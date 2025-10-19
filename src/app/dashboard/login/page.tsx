"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	function validate() {
		if (!email) return "Email wajib diisi";
		// simple email check
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) return "Format email tidak valid";
		if (!password) return "Password wajib diisi";
		if (password.length < 6) return "Password minimal 6 karakter";
		return null;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		const v = validate();
		if (v) {
			setError(v);
			return;
		}

		setLoading(true);
		// mock delay to simulate request
		await new Promise((r) => setTimeout(r, 900));

			// mock success - in real app call API and handle errors
			setLoading(false);

				// simple admin shortcut: kredensial admin yang ditentukan
				const id = email.trim().toLowerCase();
				if (id === "admin@gmail.com" && password === "12345678") {
					setSuccess("Login admin terverifikasi — mengalihkan ke dashboard admin...");
					// Set authentication state
					localStorage.setItem('isAuthenticated', 'true');
					localStorage.setItem('userRole', 'admin');
					setTimeout(() => {
						try {
							router.replace("/dashboard/admin/page/management-client/manageclient");
						} catch {
							setSuccess(null);
						}
					}, 600);
					return;
				}

				// simple staf shortcut: kredensial staf yang ditentukan
				if (id === "staf@gmail.com" && password === "12345678") {
					setSuccess("Login staf terverifikasi — mengalihkan ke dashboard staf...");
					// Set authentication state
					localStorage.setItem('isAuthenticated', 'true');
					localStorage.setItem('userRole', 'staf');
					setTimeout(() => {
						try {
							router.replace("/dashboard/staf/page/management-client/manageclient");
						} catch {
							setSuccess(null);
						}
					}, 600);
					return;
				}

				// simple client shortcut: kredensial client yang ditentukan
				if (id === "client@gmail.com" && password === "12345678") {
					setSuccess("Login client terverifikasi — mengalihkan ke dashboard client...");
					// Set authentication state
					localStorage.setItem('isAuthenticated', 'true');
					localStorage.setItem('userRole', 'client');
					setTimeout(() => {
						try {
							router.replace("/dashboard/client");
						} catch {
							setSuccess(null);
						}
					}, 600);
					return;
				}

			setSuccess("Login berhasil — mengalihkan...");

			// small delay then navigate ke dashboard biasa
			setTimeout(() => {
				try {
					router.push("/dashboard/admin/page/management-client/manageclient");
				} catch {
					setSuccess(null);
				}
			}, 600);
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6">
			<div className="w-full max-w-4xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
				{/* Left / illustration */}
				<div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white">
					<div className="w-40 h-40 rounded-xl bg-white/10 flex items-center justify-center mb-6">
						<svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
							<path d="M3 8.5A3.5 3.5 0 0 1 6.5 5h11A3.5 3.5 0 0 1 21 8.5v7A3.5 3.5 0 0 1 17.5 19h-11A3.5 3.5 0 0 1 3 15.5v-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M8 11.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<h2 className="text-2xl font-semibold">Dashboard Undangan</h2>
					<p className="mt-3 text-sm opacity-90 text-white/90 max-w-xs text-center">Masuk untuk mengatur undangan digital Anda. Desain modern, responsif, dan fokus pada pengalaman pengguna.</p>
					
					{/* Test Credentials */}
					<div className="mt-8 p-4 bg-white/10 rounded-lg text-sm">
						<h3 className="font-semibold mb-2">Test Credentials:</h3>
						<div className="space-y-1">
							<div>Admin: admin@gmail.com / 12345678</div>
							<div>Staf: staf@gmail.com / 12345678</div>
							<div>Client: client@gmail.com / 12345678</div>
						</div>
					</div>
				</div>

				{/* Right / form */}
				<div className="p-8 md:p-12">
					<div className="max-w-md mx-auto">
						<h1 className="text-2xl font-bold mb-2">Masuk</h1>
						<p className="text-sm text-slate-600 dark:text-slate-300 mb-6">Masukkan email dan password Anda. Tidak ada pendaftaran — hubungi admin jika belum punya akun.</p>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
									placeholder="nama@contoh.com"
									autoComplete="email"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
								<input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
									placeholder="Masukkan password"
									autoComplete="current-password"
								/>
							</div>

											<div className="flex items-center justify-start text-sm">
												<label className="flex items-center gap-2">
													<input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
													<span className="text-slate-600 dark:text-slate-300">Ingat saya</span>
												</label>
											</div>

							{error && <div className="text-sm text-red-600">{error}</div>}
							{success && <div className="text-sm text-green-600">{success}</div>}

							<div>
								<button
									type="submit"
									disabled={loading}
									className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-60"
								>
									{loading ? (
										<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
										</svg>
									) : null}
									<span>{loading ? "Masuk..." : "Masuk"}</span>
								</button>
							</div>
						</form>

						<div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
							<span>Butuh bantuan? </span>
							<a href="#" className="text-indigo-600 hover:underline">Kontak support</a>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

