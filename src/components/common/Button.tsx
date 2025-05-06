import "../../styles/button.scss";

interface ButtonProps {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, styles, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick} style={styles}>
      {children}
    </button>
  );
};

export default Button;
