import Row from "./Row";
import RowHeading from "./RowHeading";

export interface Props {
  headers: string[];
  content: Array<{
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
  }>;
}

export default function Table(props: Props) {
  return (
    <div className="w-full h-full lg:w-1/2 gap-3 flex flex-col lg:px-10 lg:py-20 px-5 py-10 justify-stretch">
      <table className="table bg-white">
        {/* head */}
        <RowHeading headers={props.headers} />
        <tbody>
          {props.content.map((value) => {
            const { id, name, surname, email, phone } = value;
            return <Row content={[name, surname, email, phone]} key={id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
