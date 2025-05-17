
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Simulate QR code image (would use qrcode.react in a real app)
export const QRCodeGenerator = () => {
  const [qrUpdated, setQrUpdated] = useState(false);
  const { toast } = useToast();

  const handleRefreshQR = () => {
    setQrUpdated(true);
    
    // Reset after visual feedback
    setTimeout(() => {
      setQrUpdated(false);
    }, 2000);
    
    toast({
      title: "کد QR بروز شد",
      description: "اطلاعات جدید در کد QR شما اعمال شد"
    });
  };

  const handleShareQR = () => {
    toast({
      title: "اشتراک‌گذاری",
      description: "لینک کد QR کپی شد"
    });
  };

  const handleDownloadQR = () => {
    toast({
      title: "دانلود",
      description: "کد QR با موفقیت دانلود شد"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">کد QR شخصی شما</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Simulated QR Code - in a real app we would use qrcode.react */}
        <div className={`w-48 h-48 bg-white p-3 rounded-md shadow-sm border flex items-center justify-center mb-4 transition-all duration-300 ${qrUpdated ? 'scale-105' : ''}`}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 grid grid-cols-7 grid-rows-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`
                    ${Math.random() > 0.7 ? 'bg-medicalblue' : 'bg-transparent'}
                    ${[0, 1, 2, 4, 5, 6, 7, 13, 21, 27, 35, 41, 42, 43, 45, 46, 47, 48].includes(i) ? 'bg-medicalblue' : ''}
                  `}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-medicalblue"></div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-center text-muted-foreground mb-4">
          اسکن این کد برای دسترسی به پروفایل و برنامه شما
        </p>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshQR}>
            بروزرسانی
          </Button>
          <Button variant="outline" size="sm" onClick={handleShareQR}>
            <Share2 className="h-4 w-4 ml-2" />
            اشتراک‌گذاری
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadQR}>
            <Download className="h-4 w-4 ml-2" />
            دانلود
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
