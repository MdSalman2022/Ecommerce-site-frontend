'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthProvider';
import { useNotifications } from '@/hooks/useNotifications';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Bell, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register: registerUser, loginWithGoogle, loginWithFacebook } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [signUpError, setSignUpError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  
  const { requestPermission, isSupported, permission } = useNotifications();

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';
  
  // Invitation flow - get token and pre-filled email from URL
  const inviteToken = searchParams.get('invite');
  const inviteEmail = searchParams.get('email');
  const isInviteFlow = !!inviteToken && !!inviteEmail;

  const handleSignUp = async (data: RegisterFormData) => {
    setSignUpError('');
    setIsLoading(true);
    try {
      const result = await registerUser(data.name, data.email, data.password);
      
      if (result.success) {
        toast.success("Account created successfully!");
        
        // If this is an invite flow, redirect to accept the invitation
        if (isInviteFlow) {
          router.push(`/invite/${inviteToken}`);
          return;
        }
        
        // Show notification permission prompt if supported and not already granted
        if (isSupported && permission !== 'granted') {
          setShowNotificationPrompt(true);
        } else {
          router.push(from);
        }
      } else {
        setSignUpError(result.message || 'Registration failed');
      }
    } catch (error: any) {
      setSignUpError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChoice = async (allow: boolean) => {
    if (allow) {
      await requestPermission();
    }
    setShowNotificationPrompt(false);
    router.push(from);
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
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
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
            <h2 className="text-3xl font-bold text-gray-900">
              {isInviteFlow ? 'Join the Team' : 'Create Account'}
            </h2>
            <p className="text-gray-500 mt-2">
              {isInviteFlow 
                ? 'Create your account to accept the team invitation'
                : 'Join BestDeal for exclusive deals'
              }
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="pl-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary/20"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  defaultValue={inviteEmail || ''}
                  readOnly={isInviteFlow}
                  className={`pl-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary/20 ${isInviteFlow ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {isInviteFlow && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  This email is linked to your team invitation
                </p>
              )}
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be 6+ characters" },
                  })}
                  className="pl-10 pr-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary/20"
                  placeholder="Create a strong password"
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
            {signUpError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{signUpError}</p>
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
                  Creating account...
                </span>
              ) : (
                'Create Account'
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

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden order-1 lg:order-2">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 border-4 border-white rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 border-4 border-white rounded-full"></div>
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
          <h1 className="text-4xl font-bold mb-4">Join BestDeal Today</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Create your account and start enjoying exclusive member benefits, 
            special discounts, and a seamless shopping experience.
          </p>
          
          {/* Features List */}
          <div className="mt-10 space-y-4 text-left">
            {['Save your favorite products', 'Exclusive member-only deals', 'Easy order tracking'].map((feature, i) => (
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

      {/* Notification Permission Modal */}
      {showNotificationPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => handleNotificationChoice(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Stay Updated!
              </h3>
              <p className="text-gray-500 mb-6">
                Enable push notifications to receive order updates, exclusive deals, 
                and important announcements.
              </p>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleNotificationChoice(false)}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
                <Button
                  onClick={() => handleNotificationChoice(true)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Enable Notifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
