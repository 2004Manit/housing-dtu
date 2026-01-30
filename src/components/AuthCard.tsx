import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";

interface AuthCardProps {
  onSuccess?: () => void;
  returnUrl?: string;
  showHeader?: boolean;
}

export const AuthCard = ({ onSuccess, returnUrl, showHeader = true }: AuthCardProps) => {
  const navigate = useNavigate();
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // Track if OAuth popup was opened
  const oauthPopupOpenedRef = useRef(false);
  const oauthTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle OAuth popup cancellation
  useEffect(() => {
    const handleWindowFocus = () => {
      // If OAuth popup was opened and we regain focus, 
      // set a timeout to reset loading if auth didn't complete
      if (oauthPopupOpenedRef.current) {
        // Clear any existing timeout
        if (oauthTimeoutRef.current) {
          clearTimeout(oauthTimeoutRef.current);
        }

        // Wait a bit to see if auth completes
        oauthTimeoutRef.current = setTimeout(() => {
          // If we're still in loading state after regaining focus,
          // it means user closed the popup without completing auth
          setLoading(false);
          oauthPopupOpenedRef.current = false;
        }, 1000); // 1 second delay to allow auth to complete
      }
    };

    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
      if (oauthTimeoutRef.current) {
        clearTimeout(oauthTimeoutRef.current);
      }
    };
  }, []);

  // Handle Login
  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(loginEmail, loginPassword);

    if (error) {
      // Check if error is about email not being confirmed
      const isEmailNotConfirmed = error.message.toLowerCase().includes('email not confirmed');

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: isEmailNotConfirmed
          ? "Email not confirmed. Sign up again and verify your email ID."
          : error.message,
      });
      setLoading(false);
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(returnUrl || "/");
      }
      setLoading(false);
    }
  };

  // Handle Signup (updated on 24jan 2026)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (signupPassword !== signupConfirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }

    if (signupPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 8 characters.",
      });
      return;
    }

    setLoading(true);

    const result = await signUp(signupEmail, signupPassword);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: result.error.message,
      });
      setLoading(false);
    } else if (result.message) {
      // Special case: confirmation email resent
      toast({
        title: "Confirmation Email Sent",
        description: "We've sent a new confirmation email. Please check your inbox. The link is active only for 15 minutes.",
      });
      setLoading(false);
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email to confirm your account. The link is active only for 15 minutes.",
      });
      setLoading(false);
    }
  };

  // Handle Google Sign In
  // const handleGoogleSignIn = async () => {
  //   setLoading(true);

  //   // Store the return URL in localStorage so we can redirect after Google auth completes
  //   if (returnUrl) {
  //     localStorage.setItem('auth_return_url', returnUrl);
  //   }

  //   try {
  //     const { error } = await signInWithGoogle();

  //     if (error) {
  //       toast({
  //         variant: "destructive",
  //         title: "Google Sign-In Failed",
  //         description: error.message,
  //       });
  //       setLoading(false);
  //     }
  //     // If successful, user will be redirected - don't reset loading
  //   } catch (err) {
  //     toast({
  //       variant: "destructive",
  //       title: "Something went wrong",
  //       description: "Please try again.",
  //     });
  //     setLoading(false);
  //   }
  // };


  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    oauthPopupOpenedRef.current = true; // Mark that OAuth popup is opening

    // Clear any stale return URLs first
    localStorage.removeItem('auth_return_url');

    // Store the NEW return URL if it exists
    if (returnUrl) {
      localStorage.setItem('auth_return_url', returnUrl);
    }

    try {
      const { error } = await signInWithGoogle();

      if (error) {
        toast({
          variant: "destructive",
          title: "Google Sign-In Failed",
          description: error.message,
        });
        localStorage.removeItem('auth_return_url'); // Clean up on error
        setLoading(false);
        oauthPopupOpenedRef.current = false; // Reset flag
      }
      // If successful, user will be redirected - don't reset loading
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again.",
      });
      localStorage.removeItem('auth_return_url'); // Clean up on error
      setLoading(false);
      oauthPopupOpenedRef.current = false; // Reset flag
    }
  };



  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 shadow-2xl border-2 border-white/20 dark:border-slate-800/50">
      {showHeader && (
        <CardHeader className="space-y-2 sm:space-y-3 text-center pb-4 sm:pb-6 px-4 sm:px-6">
          <div className="flex justify-center mb-1 sm:mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div
                className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm border border-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 93, 165, 0.95) 0%, rgba(8, 74, 132, 0.9) 100%)',
                  boxShadow: '0 4px 16px rgba(10, 93, 165, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <Logo className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base px-2">
            {isLogin
              ? "Sign in to continue your journey with Housing DTU"
              : "Join Housing DTU and find your perfect home"}
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={showHeader ? "px-4 sm:px-6" : "pt-4 px-4 sm:px-6"}>
        <Tabs value={isLogin ? "login" : "signup"} onValueChange={(v) => setIsLogin(v === "login")}>
          <TabsList className="grid w-full grid-cols-2 mb-3 sm:mb-4 bg-slate-100 dark:bg-slate-800 p-1 h-9 sm:h-10">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md transition-all text-xs sm:text-sm"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md transition-all text-xs sm:text-sm"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="login-email" className="text-xs sm:text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="pl-8 sm:pl-10 h-10 sm:h-11 text-sm sm:text-base border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="login-password" className="text-xs sm:text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="pl-8 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 text-sm sm:text-base border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xs sm:text-sm">Signing in...</span>
                  </span>
                ) : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="signup-firstname" className="text-xs sm:text-sm font-medium">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    <Input
                      id="signup-firstname"
                      placeholder="John"
                      value={signupFirstName}
                      onChange={(e) => setSignupFirstName(e.target.value)}
                      required
                      disabled={loading}
                      className="pl-8 sm:pl-10 h-10 sm:h-11 text-sm sm:text-base border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="signup-lastname" className="text-xs sm:text-sm font-medium">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    <Input
                      id="signup-lastname"
                      placeholder="Doe"
                      value={signupLastName}
                      onChange={(e) => setSignupLastName(e.target.value)}
                      required
                      disabled={loading}
                      className="pl-8 sm:pl-10 h-10 sm:h-11 text-sm sm:text-base border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="pl-10 h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="pl-10 pr-10 h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="signup-confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="pl-10 pr-10 h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Divider */}
        <div className="relative my-4 sm:my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="bg-white dark:bg-slate-900 px-3 sm:px-4 text-slate-500 dark:text-slate-400 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <Button
          variant="outline"
          className="w-full h-10 sm:h-11 text-sm sm:text-base bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700 font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md group"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm">
            {loading ? "Connecting..." : "Continue with Google"}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};