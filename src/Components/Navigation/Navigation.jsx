import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (path) => {
      navigate(path);
    };
    window.api.receive('navigate', handler);
    return () => {
      // Proper cleanup
      window.api.removeListener('navigate');
    };
  }, [navigate]);

  return null;
};

export default Navigation;
