import axios from 'axios';
import { useCallback, useState } from 'react';
import { INTERVAL } from '../utils/constants';

interface IStatus {
  success: boolean;
  message: string;
  hostname: string;
  time: number;
}

const BASE_URL = `https://api.factoryfour.com/`;

export const useFetchApiName = (apiName: string) => {
  const [status, setStatus] = useState<IStatus>();
  const [error, setError] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(INTERVAL);

  const fetchStatus = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}${apiName}/health/status`);
      setError(false);
      setCounter(INTERVAL);
      setStatus(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(true);
      }
    }
  }, [apiName]);

  return {
    fetchStatus,
    status,
    counter,
    error,
    setCounter,
  };
};
