import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  onClick: () => void;
  bootstrap_style?: string;
}

const MButton = ({
  children,
  onClick,
  color = "primary",
  bootstrap_style,
}: Props) => {
  return (
    <>
      <div>
        <button
          type="button"
          className={"btn btn-" + color + " " + bootstrap_style}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    </>
  );
};

export default MButton;
