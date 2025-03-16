import { useEffect } from 'react';
import useAuthStore from '@/src/store';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authState = useAuthStore((state) => state.isLoggedIn);
    if (!authState) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login', { replace: true });
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;
