
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PlusCircle,
  Calendar,
  Users,
  MapPin,
  Clock,
  FileEdit,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  capacity: number;
}

const SAMPLE_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title: 'کارگاه اصول اکوکاردیوگرافی',
    date: '۱۰ خرداد ۱۴۰۳',
    time: '۱۴:۰۰ - ۱۸:۰۰',
    location: 'آمفی تئاتر بیمارستان امام',
    attendees: 18,
    capacity: 30
  },
  {
    id: '2',
    title: 'دوره آموزشی الکتروفیزیولوژی قلب',
    date: '۲۵ خرداد ۱۴۰۳',
    time: '۹:۰۰ - ۱۵:۰۰',
    location: 'دانشکده پزشکی - سالن کنفرانس',
    attendees: 12,
    capacity: 20
  },
  {
    id: '3',
    title: 'سمینار تازه‌های درمان فشار خون',
    date: '۵ تیر ۱۴۰۳',
    time: '۱۰:۰۰ - ۱۳:۰۰',
    location: 'مرکز همایش‌های دانشگاه',
    attendees: 25,
    capacity: 40
  }
];

const Workshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>(SAMPLE_WORKSHOPS);
  const { toast } = useToast();

  const handleCreateWorkshop = () => {
    toast({
      title: "ایجاد کارگاه جدید",
      description: "فرم ایجاد کارگاه جدید در نسخه بعدی در دسترس خواهد بود."
    });
  };

  const handleEditWorkshop = (id: string) => {
    toast({
      title: "ویرایش کارگاه",
      description: `ویرایش کارگاه با شناسه ${id}`
    });
  };

  const handleDeleteWorkshop = (id: string) => {
    toast({
      title: "حذف کارگاه",
      description: "آیا از حذف این کارگاه اطمینان دارید؟",
      variant: "destructive"
    });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">مدیریت کارگاه‌ها و دوره‌ها</h1>
        <Button onClick={handleCreateWorkshop}>
          <PlusCircle className="h-4 w-4 ml-2" />
          کارگاه جدید
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop) => (
          <Card key={workshop.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{workshop.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                  <span>{workshop.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 ml-2 text-muted-foreground" />
                  <span>{workshop.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 ml-2 text-muted-foreground" />
                  <span>{workshop.attendees} از {workshop.capacity} شرکت‌کننده</span>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm" onClick={() => handleEditWorkshop(workshop.id)}>
                  <FileEdit className="h-4 w-4 ml-1" />
                  ویرایش
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteWorkshop(workshop.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 ml-1" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Workshops;
