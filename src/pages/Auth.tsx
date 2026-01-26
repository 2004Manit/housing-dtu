import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthCard } from "@/components/AuthCard";


const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnUrl = searchParams.get('returnUrl');

  // Check if user just completed Google auth and has a stored return URL
  // useEffect(() => {
  //   const storedReturnUrl = localStorage.getItem('auth_return_url');
  //   if (storedReturnUrl) {
  //     localStorage.removeItem('auth_return_url');
  //     navigate(storedReturnUrl);
  //   }
  // }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative">
        <AuthCard returnUrl={returnUrl || undefined} />
      </div>
    </div>
  );
};

export default Auth;