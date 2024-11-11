import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import Layout from "./layout";
import { fetchReferrals } from "./api/referrals";
import { useReferralStore } from "./stores/referrals";
import { useEffect } from "react";

const queryClient = new QueryClient();

function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const { referrals, setReferrals } = useReferralStore();
  const { data } = useQuery({
    queryKey: ["referrals"],
    queryFn: fetchReferrals,
  });

  useEffect(() => {
    if (!data) return;
    setReferrals(data);
  }, [data]);

  return (
    <Layout>
      <Form />
      <Table
        headers={[
          "",
          "given name",
          "surname",
          "email",
          "phoneNumber",
          "actions",
        ]}
        content={referrals}
      />
    </Layout>
  );
}

export default Wrapper;
