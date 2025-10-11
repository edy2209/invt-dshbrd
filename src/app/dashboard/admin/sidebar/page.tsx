"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminSidebar() {
	const path = usePathname() ?? "/dashboard/admin";

	function Item({ href, children }: { href: string; children: React.ReactNode }) {
		const active = path === href || path.startsWith(href + "/");
		return (
			<Link
				href={href}
				className={`block px-4 py-3 rounded-md mb-2 transition-colors ${
					active ? "bg-indigo-600 text-white" : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
				}`}
			>
				{children}
			</Link>
		);
	}

	return (
		<nav className="sticky top-6">
			<div className="mb-6 px-3">
				<h3 className="text-sm uppercase tracking-wider text-slate-500">Admin</h3>
				<p className="text-xs text-slate-400">Dashboard</p>
			</div>

			<div className="px-2">
				<Item href="/dashboard/admin/page/manageclient">Manage Client</Item>
				<Item href="/dashboard/admin/page/tambahclient">Tambah Client Baru</Item>
				<Item href="/dashboard/admin/page/statistic">Statistik</Item>
			</div>
		</nav>
	);
}
