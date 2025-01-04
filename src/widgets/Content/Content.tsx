import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return <div className="p-[24px]">{children}</div>;
};

export default Content;
