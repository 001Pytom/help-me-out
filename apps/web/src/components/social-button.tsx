import { ReactNode } from "react";
import { Button } from "./ui/button";

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const SocialButton = ({
  icon,
  label,
  onClick,
  className = "",
  disabled = false,
}: SocialButtonProps) => {
  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center font-inter border border-black hover:bg-transparent cursor-pointer ${className} `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span className="md:w-1/3 ml-2">{label}</span>
    </Button>
  );
};

export default SocialButton;
