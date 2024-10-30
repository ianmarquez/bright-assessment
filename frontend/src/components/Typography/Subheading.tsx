const SubHeading = (props: React.PropsWithChildren) => {
  return (
    <h2 className="flex flex-col gap-0 font-bold text-sm md:text-md uppercase text-slate-500">
      {props.children}
      <div className="divider"></div>
    </h2>
  );
};

export default SubHeading;
