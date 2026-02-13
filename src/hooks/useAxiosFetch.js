import axios from "axios";
import { useEffect, useRef, useState } from "react";

const useAxiosFetch = (dataURL) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef();

  useEffect(() => {
    const controller = new AbortController();

    isMounted.current = true;

    const fetchData = async (url) => {
      setIsLoading(true);

      try {
        const response = await axios.get(url, { signal: controller.signal });

        if (isMounted.current) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted.current) {
          setFetchError(error.message);
          setData([]);
        }
      } finally {
        if (isMounted.current) setIsLoading(false);
      }
    };

    fetchData(dataURL);

    return () => {
      controller.abort();
      isMounted.current = false;
    };
  }, [dataURL]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
