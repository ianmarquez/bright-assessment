const Layout = (props: React.PropsWithChildren) => {
  return (
    <div className="w-full h-full flex flex-col align-middle justify-center max-w-[1640px] mx-auto">
      <div className="flex lg:flex-row flex-col-reverse">{props.children}</div>
    </div>
  );
};

export default Layout;
