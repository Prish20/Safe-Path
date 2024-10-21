import { BrowserRouter } from 'react-router-dom';
import Router from '@/routes';
import { MediaQueryProvider } from '@/contexts/MediaQueryContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ContainerLayout from '@/layouts/ContainerLayout';
import AuthGuard from '@/components/AuthGuard';

function App() {
  return (
    <MediaQueryProvider>
      <BrowserRouter>
        <ContainerLayout>
          <AuthProvider>
            <AuthGuard>
              <Router />
              {/* <Toaster position="top-right" richColors closeButton /> */}
            </AuthGuard>
          </AuthProvider>
        </ContainerLayout>
      </BrowserRouter>
    </MediaQueryProvider>
  );
}

export default App;
