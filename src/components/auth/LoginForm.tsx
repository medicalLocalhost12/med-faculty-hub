
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail } from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // Demo login - in a real app, we'd check with an API
      if (email.includes('@') && password.length > 3) {
        toast({
          title: 'ورود موفق',
          description: 'به پنل مدیریت خوش آمدید',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'خطا در ورود',
          description: 'اطلاعات وارد شده صحیح نیست. لطفا مجددا تلاش کنید.',
          variant: 'destructive',
        });
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">ورود به سیستم</CardTitle>
        <CardDescription>
          ایمیل و رمز عبور خود را وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">ایمیل دانشگاهی</Label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                placeholder="name@uni.ac.ir"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pr-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">رمز عبور</Label>
              <Button variant="link" size="sm" className="text-xs text-primary">
                فراموشی رمز عبور؟
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'در حال ورود...' : 'ورود به سیستم'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          این سیستم فقط برای استفاده اساتید دانشکده پزشکی طراحی شده است.
        </p>
      </CardFooter>
    </Card>
  );
};
