
import { User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardHeaderProps {
  userName: string;
  department: string;
}

export const DashboardHeader = ({ userName, department }: DashboardHeaderProps) => {
  const now = new Date();
  const hours = now.getHours();
  
  let greeting = '';
  if (hours < 12) {
    greeting = 'صبح بخیر';
  } else if (hours < 17) {
    greeting = 'ظهر بخیر';
  } else {
    greeting = 'عصر بخیر';
  }

  return (
    <Card className="mb-6 bg-gradient-to-r from-primary to-primary/80 text-white border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">{greeting}، {userName}</CardTitle>
          <CardDescription className="text-white/80 mt-1">
            {department} - امروز: {now.toLocaleDateString('fa-IR')}
          </CardDescription>
        </div>
        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
          <User className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/80">
          خوش آمدید. نسخه 1.0.0 پنل مدیریت اساتید دانشکده پزشکی
        </p>
      </CardContent>
    </Card>
  );
};
