
import { CalendarDays, Users, FileCheck, MessageSquare } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { WeeklySchedule } from '@/components/dashboard/WeeklySchedule';
import { QRCodeGenerator } from '@/components/dashboard/QRCodeGenerator';
import { MainLayout } from '@/components/layout/MainLayout';

const Dashboard = () => {
  return (
    <MainLayout>
      <DashboardHeader userName="دکتر حمید احمدی" department="گروه قلب" />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="کلاس‌های هفته"
          value="5"
          icon={<CalendarDays className="h-4 w-4" />}
          description="3 کلاس در روزهای آینده"
        />
        <StatCard
          title="کارگاه‌های فعال"
          value="2"
          icon={<Users className="h-4 w-4" />}
          description="1 کارگاه در هفته جاری"
        />
        <StatCard
          title="لاگ‌بوک‌های در انتظار"
          value="12"
          icon={<FileCheck className="h-4 w-4" />}
          description="نیاز به بررسی و تایید"
        />
        <StatCard
          title="پیام‌های جدید"
          value="8"
          icon={<MessageSquare className="h-4 w-4" />}
          description="4 پیام خوانده نشده"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <WeeklySchedule />
        </div>
        <div>
          <QRCodeGenerator />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
