import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/sidebar';
import { Outlet } from 'react-router';

export function DashboardLayout() {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '350px',
                } as React.CSSProperties
            }
        >
            <AppSidebar />

            <SidebarInset className="h-svh overflow-hidden">
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
}
