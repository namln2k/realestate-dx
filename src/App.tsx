import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import { LoginPage } from "@/pages/LoginPage";
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '@/types';
import { MePage } from "@/pages/MePage";
import { AdminPage } from "@/pages/AdminPage";
import { ConfigPage } from "@/pages/ConfigPage";
import { ChatPage } from "@/pages/ChatPage";
import { ReactQueryProvider } from "@/context/ReactQueryContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin';
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user.roles.includes(requiredRole as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <MePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/config"
        element={
          <ProtectedRoute requiredRole="admin">
            <ConfigPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <AppContent />
      </ReactQueryProvider>
    </AuthProvider>
  );
}

export default App;
