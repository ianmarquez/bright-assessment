import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import Layout from "./layout";
import type { Props as TableProps } from "./components/Table";

function App() {
  const dummyData: TableProps["content"] = [
    {
      id: 1,
      name: "John",
      surname: "Johnson",
      email: "jh@email12.com",
      phone: "9999999",
    },
    {
      id: 2,
      name: "John",
      surname: "Johnson",
      email: "jh@email12.com",
      phone: "9999999",
    },
    {
      id: 3,
      name: "John",
      surname: "Johnson",
      email: "jh@email12.com",
      phone: "9999999",
    },
    {
      id: 4,
      name: "John",
      surname: "Johnson",
      email: "jh@email12.com",
      phone: "9999999",
    },
  ];
  return (
    <Layout>
      <Form />
      <Table
        headers={["given name", "surname", "email", "phone", "actions"]}
        content={dummyData}
      />
    </Layout>
  );
}

export default App;
