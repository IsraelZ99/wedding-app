import { IconBaseProps, IconType } from "react-icons";
import "../../styles/icon-button.scss";

import theme from "../../styles/_base-theme.module.scss";

interface IconButtonStylesProps {
  button: React.CSSProperties;
  icon: {
    styles: React.CSSProperties;
    props: IconBaseProps;
  };
}

interface IconButtonProps {
  IconComponent: IconType;
  styles: IconButtonStylesProps;
  type: "primary" | "secondary";
  onButtonClick: () => void;
  text: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  IconComponent,
  onButtonClick,
  text,
  type,
  styles: {
    button: buttonStyles,
    icon: { props: iconProps, styles: iconStyles },
  },
}) => {
  let iconColor = "";
  if (type === "primary") {
    iconColor = theme.fifth;
  } else if (type === "secondary") {
    iconColor = theme.gray;
  }
  return (
    <div
      className={`icon-button ${type}`}
      role="button"
      onClick={onButtonClick}
    >
      <IconComponent
        {...iconProps}
        color={iconColor}
        style={iconStyles}
        className="icon"
      />
      <span className="button" style={buttonStyles}>
        <p>{text}</p>
      </span>
    </div>
  );
};

export default IconButton;
