import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
interface Props {
  content: string[];
}

export default function Row(props: Props) {
  return (
    <tr className="hover">
      {props.content.map((value, index) => (
        <th key={index + value} className="font-semibold text-slate-400">
          {value}
        </th>
      ))}
      <th>
        <div className="flex gap-2">
          <button
            className="hover:text-primary duration-300"
            onClick={() => console.log("clicked")}
          >
            <FaTrashAlt className="h-4 w-4" />
          </button>
          <button className="hover:text-primary duration-300">
            <FaPencilAlt className="h-4 w-4" />
          </button>
        </div>
      </th>
    </tr>
  );
}
