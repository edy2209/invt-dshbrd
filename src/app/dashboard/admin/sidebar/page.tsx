"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function AdminSidebar() {
	const path = usePathname() ?? "/dashboard/admin";
	const [openGroups, setOpenGroups] = useState<string[]>(['dashboard', 'client']);

	const toggleGroup = (groupName: string) => {
		setOpenGroups(prev => 
			prev.includes(groupName) 
				? prev.filter(g => g !== groupName)
				: [...prev, groupName]
		);
	};

	function Item({ href, children }: { href: string; children: React.ReactNode }) {
		const active = path === href || path.startsWith(href + "/");
		return (
			<Link
				href={href}
				className={`block px-4 py-2 rounded-md mb-1 ml-6 text-sm transition-colors ${
					active ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
				}`}
			>
				{children}
			</Link>
		);
	}

	function GroupHeader({ icon, title, groupName, children }: { 
		icon: React.ReactNode; 
		title: string; 
		groupName: string; 
		children: React.ReactNode;
	}) {
		const isOpen = openGroups.includes(groupName);
		return (
			<div className="mb-4">
				<button
					onClick={() => toggleGroup(groupName)}
					className="flex items-center justify-between w-full px-3 py-2 text-left text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
				>
					<div className="flex items-center">
						<div className="mr-3 w-5 h-5 text-slate-500">{icon}</div>
						<span className="font-medium">{title}</span>
					</div>
					<svg 
						className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} 
						fill="currentColor" 
						viewBox="0 0 20 20"
					>
						<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
					</svg>
				</button>
				{isOpen && (
					<div className="mt-2">
						{children}
					</div>
				)}
			</div>
		);
	}

	return (
		<nav className="sticky top-6">
			<div className="mb-6 px-3">
				<h3 className="text-sm uppercase tracking-wider text-slate-500">Admin</h3>
				<p className="text-xs text-slate-400">Dashboard</p>
			</div>

			<div className="px-2">
				{/* Dashboard Vendor */}
				<GroupHeader 
					icon={
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						</svg>
					} 
					title="Dashboard" 
					groupName="dashboard"
				>
					<Item href="/dashboard/admin/page/dashboard/statistic">• Statistik Klien Aktif</Item>
					<Item href="/dashboard/admin/page/dashboard/total-undangan">• Total Undangan Dibuat</Item>
				</GroupHeader>

				{/* Manajemen Klien */}
				<GroupHeader 
					icon={
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
						</svg>
					} 
					title="Manajemen Klien" 
					groupName="client"
				>
					<Item href="/dashboard/admin/page/management-client/tambahclient">├── Tambah Klien Baru</Item>
					<Item href="/dashboard/admin/page/management-client/manageclient">├── Tabel Klien</Item>
					<Item href="/dashboard/admin/page/management-client/create-receptionist">├── Create Receptionist / Link</Item>
					<Item href="/dashboard/admin/page/management-client/data-receptionist">├── Data Receptionist</Item>
				</GroupHeader>

				{/* Manajemen Vendor Account */}
				<GroupHeader 
					icon={
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					} 
					title="Manajemen Vendor Account" 
					groupName="vendor"
				>
					<Item href="/dashboard/admin/page/management-vendor/tambah-vendor">├── Tambah Akun Vendor</Item>
				</GroupHeader>

				{/* LOG */}
				<GroupHeader 
					icon={
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
					} 
					title="LOG" 
					groupName="log"
				>
					<Item href="/dashboard/admin/page/log/activity-log">├── Activity Log</Item>
					<Item href="/dashboard/admin/page/log/system-log">├── System Log</Item>
				</GroupHeader>
			</div>
		</nav>
	);
}
