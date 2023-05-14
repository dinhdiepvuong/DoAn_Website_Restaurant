import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import Router from "./routes";
import "./theme/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/js/src/collapse.js";
import "rsuite/dist/rsuite.min.css";
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/antd.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Redux from "./utils/Redux";
import BaseLoading2 from "./base/BaseLoading2";
import { isLoadingAuthSelector } from "./redux/slices/authSlice";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const isLoading = useSelector(isLoadingAuthSelector);

  return (
    <QueryClientProvider client={queryClient}>
      <Redux />
      {!isLoading ? (
        <Router />
      ) : (
        <BaseLoading2
          top="mt_40vh"
          size="100px"
          justify="justify-content-center"
          display="d-flex"
          align="align-items-center"
        />
      )}
    </QueryClientProvider>
  );
}

export default App;
