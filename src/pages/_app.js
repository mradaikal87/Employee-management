import { queryClient } from "@/queries/queryClient";
import "@/styles/globals.css";
import { QueryClientProvider } from "react-query";


export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
