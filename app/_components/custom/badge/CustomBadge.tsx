import { Badge } from "@/app/_components/ui/badge";
import clsx from "clsx";
import { CircleIcon } from "lucide-react";

export type CustomBedgeType =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "white";
interface CustomBadgeProps {
  type: CustomBedgeType;
  text: string;
}

const colors = {
  success: {
    background: "bg-primary bg-opacity-10",
    text: "text-primary",
    icon: "fill-primary",
    hover: "hover:bg-primary hover:bg-opacity-10",
  },
  danger: {
    background: "bg-danger bg-opacity-10",
    text: "text-danger",
    icon: "fill-danger",
    hover: "hover:bg-danger hover:bg-opacity-10",
  },
  white: {
    background: "bg-white bg-opacity-10",
    text: "text-white",
    icon: "fill-white",
    hover: "hover:bg-white hover:bg-opacity-10",
  },
  warning: {
    background: "bg-yellow-100 bg-opacity-10",
    text: "text-yellow-700",
    icon: "fill-yellow-700",
    hover: "hover:bg-yellow-100 hover:bg-opacity-10",
  },
  info: {
    background: "bg-blue-100  bg-opacity-10",
    text: "text-blue-700",
    icon: "fill-blue-700",
    hover: "hover:bg-blue-100 hover:bg-opacity-10",
  },
};

export const CustomBadge = ({ type, text }: CustomBadgeProps) => {
  const { background, text: textColor, hover, icon } = colors[type];

  return (
    <Badge
      className={clsx(background, textColor, hover, "font-bold")}
      style={{}}
    >
      <CircleIcon className={clsx(icon, "mr-1")} size={8} />
      {text}
    </Badge>
  );
};
