import SubHeading from "../Typography/Subheading";

interface Props {
  subHeading?: string;
}

export default function Section(props: React.PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-1 py-5">
      {props.subHeading && <SubHeading>{props.subHeading}</SubHeading>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {props.children}
      </div>
    </div>
  );
}
