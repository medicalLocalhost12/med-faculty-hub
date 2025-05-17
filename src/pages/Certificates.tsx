
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { 
  FileText,
  Download,
  Send,
  Search,
  Plus,
  Calendar,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Certificate {
  id: string;
  title: string;
  recipientName: string;
  date: string;
  type: string;
}

const SAMPLE_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'گواهی شرکت در کارگاه اکوکاردیوگرافی',
    recipientName: 'دکتر مهدی حسینی',
    date: '۱۵ اردیبهشت ۱۴۰۳',
    type: 'workshop'
  },
  {
    id: '2',
    title: 'گواهی تدریس دوره آموزشی آناتومی قلب',
    recipientName: 'دکتر زهرا محمدی',
    date: '۵ خرداد ۱۴۰۳',
    type: 'teaching'
  },
  {
    id: '3',
    title: 'گواهی حضور در سمینار فشار خون',
    recipientName: 'دکتر علی رضایی',
    date: '۲۰ اردیبهشت ۱۴۰۳',
    type: 'seminar'
  }
];

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(SAMPLE_CERTIFICATES);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDownload = (id: string) => {
    toast({
      title: "دانلود گواهی",
      description: "گواهی با موفقیت دانلود شد"
    });
  };

  const handleSendEmail = (id: string) => {
    toast({
      title: "ارسال گواهی",
      description: "گواهی با موفقیت به ایمیل ارسال شد"
    });
  };

  const handleCreateCertificate = () => {
    toast({
      title: "ایجاد گواهی جدید",
      description: "فرم صدور گواهی جدید در نسخه بعدی در دسترس خواهد بود"
    });
  };

  const filteredCertificates = searchTerm 
    ? certificates.filter(cert => 
        cert.title.includes(searchTerm) || 
        cert.recipientName.includes(searchTerm)
      )
    : certificates;

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">صدور و مدیریت گواهی‌ها</h1>
        <Button onClick={handleCreateCertificate}>
          <Plus className="h-4 w-4 ml-2" />
          گواهی جدید
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">جستجو در گواهی‌ها</CardTitle>
          <CardDescription>
            بر اساس عنوان یا نام دریافت‌کننده جستجو کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredCertificates.map((cert) => (
          <Card key={cert.id}>
            <CardContent className="flex items-center p-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                <FileText className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium">{cert.title}</h3>
                <div className="flex text-sm text-muted-foreground mt-1">
                  <div className="flex items-center ml-4">
                    <User className="h-3 w-3 ml-1" />
                    {cert.recipientName}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 ml-1" />
                    {cert.date}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDownload(cert.id)}>
                  <Download className="h-4 w-4 ml-2" />
                  دانلود
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSendEmail(cert.id)}>
                  <Send className="h-4 w-4 ml-2" />
                  ارسال
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            هیچ گواهی‌ای یافت نشد.
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Certificates;
