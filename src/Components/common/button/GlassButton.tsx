interface GlassButtonProps {
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  children?: React.ReactElement | string;
}

const GlassButton = ({ className, onClick, children }: GlassButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"glassmorphism " + className}
    >
      {children}
    </button>
  );
};

export default GlassButton;
