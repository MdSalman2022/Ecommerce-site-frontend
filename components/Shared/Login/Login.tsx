'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthProvider';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormData>();
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();

  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  // Check for OAuth errors
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setLoginError('OAuth authentication failed. Please try again.');
      toast.error('OAuth authentication failed');
    }
  }, [searchParams]);

  const handleLogin = async (data: LoginFormData) => {
    setLoginError('');
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      
      if (result.success) {
        toast.success('Welcome back!');
        router.push(from);
      } else {
        setLoginError(result.message || 'Invalid credentials');
      }
    } catch (error: any) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    loginWithGoogle(); // Redirects to backend OAuth
  };

  const handleFacebookSignIn = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    loginWithFacebook(); // Redirects to backend OAuth
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="text-center text-white z-10 max-w-md">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Image 
                src="https://i.ibb.co/xSLpY24/logo-colored.webp" 
                alt="BestDeal" 
                width={50} 
                height={50}
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to BestDeal</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Your one-stop destination for the best electronics deals. 
            Login to access exclusive offers and track your orders.
          </p>
          
          {/* Features List */}
          <div className="mt-10 space-y-4 text-left">
            {['Track your orders in real-time', 'Exclusive member discounts', 'Fast & secure checkout'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" />
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image 
                src="https://i.ibb.co/xSLpY24/logo-colored.webp" 
                alt="BestDeal" 
                width={40} 
                height={40}
              />
              <span className="text-2xl font-bold text-gray-800">BestDeal</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="pl-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary/20"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: 'Password must be 6+ characters' }
                  })}
                  className="pl-10 pr-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{loginError}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="flex-1 h-12 border-gray-200 hover:bg-gray-50 font-medium transition-all hover:border-gray-300"
            >
              <FaGoogle className="mr-2 text-red-500" />
              Google
            </Button>
            <Button
              onClick={handleFacebookSignIn}
              disabled={isLoading}
              variant="outline"
              className="flex-1 h-12 border-gray-200 hover:bg-gray-50 font-medium transition-all hover:border-gray-300"
            >
              <FaFacebook className="mr-2 text-blue-600" />
              Facebook
            </Button>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
