interface Props {
  headers: Array<string>;
}

export default function RowHeading(props: Props) {
  return (
    <thead>
      <tr>
        {props.headers.map((value, index) => (
          <th
            className="uppercase text-slate-500 text-center"
            key={value + index}
          >
            {value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
