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
  onButtonClick: () => void;
  text: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  IconComponent,
  onButtonClick,
  text,
  styles: {
    button: buttonStyles,
    icon: { props: iconProps, styles: iconStyles },
  },
}) => {
  return (
    <div id="icon-button" role="button" onClick={onButtonClick}>
      <IconComponent
        {...iconProps}
        color={`${theme.primary}`}
        style={iconStyles}
        className="icon"
      />
      <span id="button" style={buttonStyles}>
        <p>{text}</p>
      </span>
    </div>
  );
};

export default IconButton;
