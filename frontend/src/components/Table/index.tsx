import { ReferralShape } from "../../types/Referral";
import Row from "./Row";
import RowHeading from "./RowHeading";
import { Props as RowProps } from "./Row";

export interface Props {
  headers: string[];
  content?: Array<ReferralShape>;
}

export default function Table(props: Props) {
  return (
    <div className="w-full h-full lg:w-1/2 gap-3 flex flex-col lg:px-10 lg:py-20 px-5 py-10 justify-stretch overflow-x-scroll">
      <table className="table bg-white">
        {/* head */}
        <RowHeading headers={props.headers} />
        <tbody>
          {props.content?.map((value) => {
            const { id, name, surname, email, phone } = value;
            const props: RowProps = {
              id,
              content: [name, surname, email, phone],
            };
            if (value.fileName && value.avatar) {
              props.avatar = {
                fileName: value.fileName,
                data: value.avatar,
              };
            }
            return <Row {...props} key={id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
