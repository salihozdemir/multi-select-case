import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Example } from "./Example";

export default function App() {
  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen py-4">
        <Example />
      </div>
    </QueryClientProvider>
  );
}
