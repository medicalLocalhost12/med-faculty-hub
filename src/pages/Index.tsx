
import { LoginForm } from '@/components/auth/LoginForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 sm:p-8">
      <div className="mb-10 text-center">
        <div className="h-20 w-20 rounded-full bg-medicalblue mx-auto mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10v6M17 22H7M12 2v20M2 16h20"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">سامانه جامع مدیریت اساتید</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          پلتفرم اختصاصی برای اساتید دانشکده پزشکی جهت مدیریت امور آموزشی و پژوهشی
        </p>
      </div>

      <LoginForm />

      <footer className="mt-10 text-center text-xs text-muted-foreground">
        <p>دانشکده پزشکی - سامانه مدیریت امور اساتید - ۱۴۰۴</p>
      </footer>
    </div>
  );
};

export default Index;
