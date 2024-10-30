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
      phoneNumber: "9999999",
      address: {
        homeName: "home name",
        street: "street",
        suburb: "suburb",
        state: "state",
        postcode: "1700",
        country: "australia",
      },
    },
    {
      id: 2,
      name: "John",
      surname: "Johnson",
      email: "jh@email12.com",
      phoneNumber: "9999999",
      address: {
        homeName: "home name",
        street: "street",
        suburb: "suburb",
        state: "state",
        postcode: "1700",
        country: "australia",
      },
    },
    {
      id: 3,
      name: "John",
      surname: "Johnson",
      email: "jh@email12.com",
      phoneNumber: "9999999",
      address: {
        homeName: "home name",
        street: "street",
        suburb: "suburb",
        state: "state",
        postcode: "1700",
        country: "australia",
      },
    },
    {
      id: 4,
      name: "John",
      surname: "Johnson",
      email: "jh@email12.com",
      phoneNumber: "9999999",
      address: {
        homeName: "home name",
        street: "street",
        suburb: "suburb",
        state: "state",
        postcode: "1700",
        country: "australia",
      },
    },
  ];
  return (
    <Layout>
      <Form />
      <Table
        headers={["given name", "surname", "email", "phoneNumber", "actions"]}
        content={dummyData}
      />
    </Layout>
  );
}

export default App;
