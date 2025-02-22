import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { motion } from "framer-motion";

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  primary?: boolean;
  small?: boolean;
  large?: boolean;
}

export default function Button({
  className = "",
  primary,
  small,
  large,
  children,
  ...props
}: ButtonProps) {
  return (
    //@ts-ignore
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`${
        primary ? "bg-primary text-white" : "bg-secondary"
      } text-base font-medium rounded-lg ${
        large
          ? "px-4 py-3"
          : small
          ? "px-[10px] py-[4px] rounded-md text-sm"
          : "px-4 py-2.5"
      } disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
