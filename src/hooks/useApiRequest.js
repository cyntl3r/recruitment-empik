import { useCallback, useState } from 'react';

export const useApiRequest = ({
  service,
  initialData,
  initialLoading = false,
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialLoading);
  const [requestResponse, setRequestResponse] = useState();
  const [error, setError] = useState(false);

  const makeRequest = async (...params) => {
    try {
      setError(false);
      setLoading(true);
      const response = await service(...params);
      setRequestResponse(response);
      if (response.data) {
        setData(response.data);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    makeRequest,
    data,
    loading,
    requestResponse,
    error,
  };
};
