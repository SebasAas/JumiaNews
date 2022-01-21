import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'

// Queries
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';

// Components
import App from "./App";

const queryClient = new QueryClient()

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong: </p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
  , document.getElementById("app"));