import { useSelector, useDispatch } from 'react-redux';

import { toggleTheme } from '~/redux/slices/themeSlice';
import { RootState } from '~/redux/store';

const useThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    theme,
    toggleTheme: handleToggleTheme,
  };
};

export default useThemeToggle;
