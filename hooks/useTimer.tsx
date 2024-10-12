import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { decrementTime } from '~/redux/slices/surveySlice';
import { RootState } from '~/redux/store';

const useTimer = () => {
  const dispatch = useAppDispatch();
  const remainingTime = useAppSelector((state: RootState) => state.survey.remainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime, dispatch]);

  return remainingTime;
};

export default useTimer;
