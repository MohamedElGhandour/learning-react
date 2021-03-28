import { useState, useEffect } from "react";

export default (httpClient) => {
  const [errorHandler, setErrorHandler] = useState(null);

  const reqInterceptors = httpClient.interceptors.request.use((request) => {
    setErrorHandler(null);
    return request;
  });

  const resInterceptors = httpClient.interceptors.response.use(
    (respone) => respone,
    (err) => {
      console.log(err);
      setErrorHandler(err);
      console.log(error);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptors);
      httpClient.interceptors.request.eject(resInterceptors);
    };
  }, [reqInterceptors, resInterceptors]);

  const errorConfirmedHandler = () => {
    setErrorHandler(null);
  };
  return [errorHandler, errorConfirmedHandler];
};
