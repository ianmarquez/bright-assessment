const Heading = (props: React.PropsWithChildren) => {
  return (
    <h1 className="font-bold text-2xl md:text-3xl text-primary-content">
      {props.children}
    </h1>
  );
};

export default Heading;
