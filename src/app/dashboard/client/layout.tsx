import ClientSidebar from "@/app/dashboard/client/sidebar/page";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-shrink-0 w-64">
        <ClientSidebar />
      </div>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}