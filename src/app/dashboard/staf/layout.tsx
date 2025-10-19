import StafSidebarComponent from "@/app/dashboard/staf/sidebar/page";

export default function StafLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-800 shadow-sm border-r border-slate-200 dark:border-slate-700">
          <div className="p-6">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Dashboard Staf
            </h1>
          </div>
          <StafSidebarComponent />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}