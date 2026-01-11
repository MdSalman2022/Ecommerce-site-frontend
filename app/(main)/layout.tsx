import {Header, Footer, LeftSidebar, RightSidebar} from "@/components/layout";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import {UIProvider} from "@/contexts/UIProvider";
import {AIChatbot} from "@/components/AI";
import NotificationPrompt from "@/components/NotificationPrompt";

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <UIProvider>
      <div className="flex flex-col min-h-screen bg-white relative">
        <LeftSidebar />
        <div className="flex flex-col flex-1 w-full lg:pl-[60px] relative transition-all duration-300">
          <Header />

          <div className="flex flex-1 w-full max-w-[1920px] mx-auto relative">
            <main className="flex-1 pb-20 lg:pb-0 min-w-0">{children}</main>
            <RightSidebar />
          </div>
          <Footer />
        </div>
        <MobileBottomNav />
        <AIChatbot />
        <NotificationPrompt />
      </div>
    </UIProvider>
  );
}
