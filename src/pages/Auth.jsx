import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Lock, Image, Eye, EyeOff, Chrome } from 'lucide-react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
const passwordSchema = z.string().regex(passwordRegex, {
  message: "Password must contain at least 6 characters, one uppercase and one lowercase letter"
});

const emailSchema = z.string().trim().email({ message: "Invalid email address" });
const nameSchema = z.string().trim().min(2, { message: "Name must be at least 2 characters" });
const photoURLSchema = z.string().url({ message: "Please enter a valid image URL" }).optional().or(z.literal(''));

const Auth = () => {
  const { signIn, signUp, signInWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login | ToyTopia';
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const validatePasswordRealtime = (password) => {
    setPasswordValidation({
      hasMinLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password)
    });
  };
  const [signupName, setSignupName] = useState('');
  const [signupPhotoURL, setSignupPhotoURL] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
      await signIn(loginEmail, loginPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      nameSchema.parse(signupName);
      emailSchema.parse(signupEmail);
      passwordSchema.parse(signupPassword);
      if (signupPhotoURL) photoURLSchema.parse(signupPhotoURL);
      await signUp(signupEmail, signupPassword, signupName, signupPhotoURL);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setErrors({ google: error.message || "Google login failed" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-8 sm:py-12">
        <Card className="w-full max-w-sm sm:max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <img src="/logo.png" alt="ToyTopia" className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Welcome to ToyTopia
            </CardTitle>
            <CardDescription className="text-sm">
              Sign in to explore amazing toys from local sellers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10 text-sm"
                        required
                      />
                    </div>
                    {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 pr-10 text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs sm:text-sm text-destructive">{errors.password}</p>}
                    <p className="text-xs text-gray-500">
                      Password must contain at least 6 characters, one uppercase and one lowercase letter
                    </p>
                  </div>
                  <Button type="submit" className="w-full text-sm">
                    Login
                  </Button>
                  
                  <div className="text-center text-xs sm:text-sm mt-1 sm:mt-2">
                    <Link 
                      to={`/forgot-password?email=${encodeURIComponent(loginEmail)}`} 
                      className="text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  
                  {/* Google Login Button */}
                  <div className="relative my-3 sm:my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full text-sm"
                    onClick={handleGoogleLogin}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Google Login
                  </Button>
                  
                  {errors.google && <p className="text-xs sm:text-sm text-destructive text-center">{errors.google}</p>}
                  
                  <div className="text-center text-xs sm:text-sm mt-3 sm:mt-4">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <TabsList className="p-0 h-auto bg-transparent">
                      <TabsTrigger 
                        value="signup" 
                        className="p-0 h-auto text-primary hover:underline font-medium text-sm"
                      >
                        Sign Up
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-sm">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="pl-10 text-sm"
                        required
                      />
                    </div>
                    {errors.name && <p className="text-xs sm:text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="pl-10 text-sm"
                        required
                      />
                    </div>
                    {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-photoURL" className="text-sm">Photo URL (Optional)</Label>
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-photoURL"
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        value={signupPhotoURL}
                        onChange={(e) => setSignupPhotoURL(e.target.value)}
                        className="pl-10 text-sm"
                      />
                    </div>
                    {errors.photoURL && <p className="text-xs sm:text-sm text-destructive">{errors.photoURL}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => {
                          setSignupPassword(e.target.value);
                          validatePasswordRealtime(e.target.value);
                        }}
                        className={`pl-10 pr-10 text-sm ${
                          signupPassword && !(passwordValidation.hasMinLength && passwordValidation.hasUppercase && passwordValidation.hasLowercase)
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : signupPassword && passwordValidation.hasMinLength && passwordValidation.hasUppercase && passwordValidation.hasLowercase
                            ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                            : ''
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                      >
                        {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs sm:text-sm text-destructive">{errors.password}</p>}
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full sm:w-2 sm:h-2 ${
                          passwordValidation.hasMinLength ? 'bg-green-500' : signupPassword ? 'bg-red-500' : 'bg-gray-300'
                        }`} />
                        <span className={passwordValidation.hasMinLength ? 'text-green-600' : signupPassword ? 'text-red-600' : 'text-gray-500'}>
                          At least 6 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full sm:w-2 sm:h-2 ${
                          passwordValidation.hasUppercase ? 'bg-green-500' : signupPassword ? 'bg-red-500' : 'bg-gray-300'
                        }`} />
                        <span className={passwordValidation.hasUppercase ? 'text-green-600' : signupPassword ? 'text-red-600' : 'text-gray-500'}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full sm:w-2 sm:h-2 ${
                          passwordValidation.hasLowercase ? 'bg-green-500' : signupPassword ? 'bg-red-500' : 'bg-gray-300'
                        }`} />
                        <span className={passwordValidation.hasLowercase ? 'text-green-600' : signupPassword ? 'text-red-600' : 'text-gray-500'}>
                          One lowercase letter
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full text-sm">
                    Sign Up
                  </Button>
                  
                  {/* Google Login Button */}
                  <div className="relative my-3 sm:my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full text-sm"
                    onClick={handleGoogleLogin}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Google Sign Up
                  </Button>
                  
                  {errors.google && <p className="text-xs sm:text-sm text-destructive text-center">{errors.google}</p>}
                  
                  <div className="text-center text-xs sm:text-sm mt-3 sm:mt-4">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <TabsList className="p-0 h-auto bg-transparent">
                      <TabsTrigger 
                        value="login" 
                        className="p-0 h-auto text-primary hover:underline font-medium text-sm"
                      >
                        Login
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;