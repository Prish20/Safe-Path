import FloatingShape from "@/components/common/FloatingShape";
import Router from "./routes";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";
import { BrowserRouter } from "react-router-dom";
import ContainerLayout from "./layouts/ContainerLayout";

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
      <BrowserRouter>
        <ContainerLayout>
          <AuthProvider>
            <AuthGuard>
              <Router />
            </AuthGuard>
          </AuthProvider>
        </ContainerLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
