import { Header, Footer, LeftSidebar, RightSidebar } from '@/components/layout';
import { UIProvider } from '@/contexts/UIProvider';
import { AIChatbot } from '@/components/AI';
import NotificationPrompt from '@/components/NotificationPrompt';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UIProvider>
      <div className="flex flex-col min-h-screen bg-white relative">
        {/* Fixed Sidebar sits outside the main flow */}
        <LeftSidebar />

        {/* Main Content Wrapper - Padded to make room for 60px sidebar */}
        <div className="flex flex-col flex-1 w-full lg:pl-[60px] relative transition-all duration-300">
          
          {/* Header */}
          <Header />

          <div className="flex flex-1 w-full max-w-[1920px] mx-auto relative">
            {/* Main Content */}
            <main className="flex-1 pb-20 lg:pb-0 min-w-0">
              {children}
            </main>

            {/* Right Social Sidebar - Fixed/Floating */}
            <RightSidebar />
          </div>

          {/* Footer */}
          <Footer />
        </div>

        {/* Global AI Shopping Assistant */}
        <AIChatbot />
        
        {/* Notification Permission Prompt for logged-in users */}
        <NotificationPrompt />
      </div>
    </UIProvider>
  );
}

