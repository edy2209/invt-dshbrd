"use client";

import React, { useState } from "react";
import AdminSidebar from "./sidebar/page";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Mobile header */}
      <div className="flex items-center h-16 px-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 md:hidden">
        <h1 className="text-lg font-semibold">Owner Dashboard</h1>
        <button
          aria-label="Open sidebar"
          onClick={() => setOpen(true)}
          className="ml-auto p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="12" r="1.75" fill="currentColor" />
            <circle cx="12" cy="12" r="1.75" fill="currentColor" />
            <circle cx="19" cy="12" r="1.75" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="flex">
        {/* Sidebar - desktop */}
        <aside className="hidden md:block w-[280px] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <AdminSidebar />
          </div>
        </aside>

        {/* Mobile overlay sidebar */}
        {open ? (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)}></div>
            <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-slate-800 overflow-auto">
              <div className="flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button 
                  onClick={() => setOpen(false)} 
                  className="ml-auto p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <AdminSidebar />
            </div>
          </div>
        ) : null}

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
