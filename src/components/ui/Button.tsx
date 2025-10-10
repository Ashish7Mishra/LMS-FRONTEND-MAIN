import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
}

export default function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  const base = "px-5 py-2 rounded-lg font-medium transition shadow";

  const styles = {
  primary: "bg-brand text-white hover:bg-brand-dark shadow-button",
  secondary: "bg-white text-brand border border-brand hover:bg-brand-light/20",
  danger: "bg-danger text-white hover:bg-danger-dark shadow-button",
  success: "bg-accent text-white hover:bg-accent-dark shadow-button",
};


  return (
    <button {...props} className={clsx(base, styles[variant], className)}>
      {children}
    </button>
  );
}
