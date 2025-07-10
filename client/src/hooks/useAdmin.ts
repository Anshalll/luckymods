import { RootState } from '@/store/Store';
import { useSelector } from 'react-redux';

export const useAdmin = () => {
  const { loading, isAdmin } = useSelector((state: RootState) => state.AdminSlice);
  return { loading, isAdmin };
};
