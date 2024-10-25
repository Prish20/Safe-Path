import FloatingShape from "@/components/common/FloatingShape";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import ContainerLayout from "./layouts/ContainerLayout";
import { MediaQueryProvider } from "@/contexts/MediaQueryContext";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <MediaQueryProvider>
        <BrowserRouter>
          <ContainerLayout>
            <Router />
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: '#2d3748',
                  color: '#ffffff',
                  border: '1px solid #4a5568',
                },
                className: 'my-custom-toast',
              }}
            />
          </ContainerLayout>
        </BrowserRouter>
      </MediaQueryProvider>
    </div>
  );
};

export default App;
