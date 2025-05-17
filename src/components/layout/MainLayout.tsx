
import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CalendarDays, 
  FileText, 
  Home, 
  LogOut, 
  MessageSquare, 
  Settings, 
  Users, 
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link to={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 text-muted-foreground hover:text-primary hover:bg-secondary",
          active && "bg-primary/10 text-primary font-medium"
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  
  // Check if we're on the login page
  const isLoginPage = location.pathname === '/';
  
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "بستن منو" : "باز کردن منو"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static left-0 top-0 z-40 h-full w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-primary">پنل اساتید پزشکی</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              <SidebarItem 
                icon={Home} 
                label="داشبورد" 
                href="/dashboard" 
                active={location.pathname === '/dashboard'} 
              />
              <SidebarItem 
                icon={CalendarDays} 
                label="برنامه هفتگی" 
                href="/schedule" 
                active={location.pathname === '/schedule'} 
              />
              <SidebarItem 
                icon={Users} 
                label="کارگاه‌ها و دوره‌ها" 
                href="/workshops" 
                active={location.pathname === '/workshops'} 
              />
              <SidebarItem 
                icon={FileText} 
                label="صدور گواهی" 
                href="/certificates" 
                active={location.pathname === '/certificates'} 
              />
              <SidebarItem 
                icon={MessageSquare} 
                label="چت و گفتگو" 
                href="/chat" 
                active={location.pathname === '/chat'} 
              />

              <Separator className="my-4" />
              
              <SidebarItem 
                icon={Settings} 
                label="تنظیمات" 
                href="/settings" 
                active={location.pathname === '/settings'} 
              />
            </div>
          </nav>

          {/* User section */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">دکتر حمید احمدی</p>
                <p className="text-xs text-muted-foreground">استاد گروه قلب</p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="container p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
};
