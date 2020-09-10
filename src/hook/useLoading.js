import {useCallback, useState} from 'react';

export default function useLoading(loadingStatus = false) {
  const [isLoading, setIsLoading] = useState(loadingStatus);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {isLoading, startLoading, stopLoading};
}
