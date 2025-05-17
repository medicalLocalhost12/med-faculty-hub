
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: 'class' | 'workshop' | 'clinical';
  location: string;
}

interface DaySchedule {
  name: string;
  date: string;
  items: ScheduleItem[];
}

// Sample data for the weekly schedule
const WEEKDAYS: DaySchedule[] = [
  {
    name: 'شنبه',
    date: '۲ خرداد',
    items: [
      { 
        id: '1', 
        title: 'فیزیولوژی قلب', 
        time: '۸:۰۰ - ۱۰:۰۰', 
        type: 'class',
        location: 'کلاس ۱۰۱' 
      },
      { 
        id: '2', 
        title: 'کارآموزی بخش قلب', 
        time: '۱۰:۳۰ - ۱۲:۳۰', 
        type: 'clinical',
        location: 'بیمارستان امام' 
      },
    ],
  },
  {
    name: 'یکشنبه',
    date: '۳ خرداد',
    items: [
      { 
        id: '3', 
        title: 'کارگاه اکو قلب', 
        time: '۹:۰۰ - ۱۲:۰۰', 
        type: 'workshop',
        location: 'آزمایشگاه مهارت' 
      },
    ],
  },
  {
    name: 'دوشنبه',
    date: '۴ خرداد',
    items: [
      { 
        id: '4', 
        title: 'درمانگاه قلب', 
        time: '۸:۰۰ - ۱۲:۰۰', 
        type: 'clinical',
        location: 'درمانگاه شماره ۲' 
      },
    ],
  },
  {
    name: 'سه‌شنبه',
    date: '۵ خرداد',
    items: [
      { 
        id: '5', 
        title: 'پاتولوژی قلب', 
        time: '۱۰:۰۰ - ۱۲:۰۰', 
        type: 'class',
        location: 'کلاس ۲۰۳' 
      },
    ],
  },
  {
    name: 'چهارشنبه',
    date: '۶ خرداد',
    items: [],
  },
  {
    name: 'پنجشنبه',
    date: '۷ خرداد',
    items: [
      { 
        id: '6', 
        title: 'ژورنال کلاب', 
        time: '۱۰:۰۰ - ۱۲:۰۰', 
        type: 'workshop',
        location: 'سالن کنفرانس' 
      },
    ],
  },
  {
    name: 'جمعه',
    date: '۸ خرداد',
    items: [],
  },
];

export const WeeklySchedule = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'clinical':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'class':
        return 'کلاس';
      case 'workshop':
        return 'کارگاه';
      case 'clinical':
        return 'بالینی';
      default:
        return type;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>برنامه هفتگی</span>
          <button className="text-sm text-primary hover:text-primary/80 font-normal">
            مشاهده کامل
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-2 min-w-[800px]">
            {WEEKDAYS.map((day) => (
              <div key={day.name} className="flex flex-col">
                <div className="text-center font-medium p-2 bg-secondary rounded-md mb-2">
                  <div>{day.name}</div>
                  <div className="text-xs text-muted-foreground">{day.date}</div>
                </div>
                
                <div className="flex-1 space-y-2">
                  {day.items.length === 0 ? (
                    <div className="h-20 border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground">
                      برنامه‌ای ندارید
                    </div>
                  ) : (
                    day.items.map((item) => (
                      <div 
                        key={item.id}
                        className="p-2 border rounded-md text-xs shadow-sm"
                      >
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-muted-foreground">{item.time}</span>
                          <span className={`px-1.5 py-0.5 rounded-sm text-[10px] ${getTypeColor(item.type)}`}>
                            {getTypeLabel(item.type)}
                          </span>
                        </div>
                        <div className="text-muted-foreground mt-1 truncate">{item.location}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
