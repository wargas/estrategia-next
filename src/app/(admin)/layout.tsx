import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { QueryProvider } from "@/providers/query";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>

          {children}

        </SidebarInset>
      </SidebarProvider>
    </QueryProvider>
  )
}
