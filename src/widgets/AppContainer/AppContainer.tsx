import { ReactNode } from "react";

const AppContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <div className="max-w-[1440px] m-auto flex gap-7 justify-center">
        {children}
      </div>
    </div>
  );
};

export default AppContainer;
