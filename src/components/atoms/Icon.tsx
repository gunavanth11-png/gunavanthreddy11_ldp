import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
};

const Icon = ({ icon }: Props) => {
  return <>{icon}</>;
};

export default Icon;