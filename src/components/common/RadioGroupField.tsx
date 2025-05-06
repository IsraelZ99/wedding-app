import { RadioGroupData } from "../../types/common";

import "../../styles/radio-group-field.scss";

interface RadioFieldProps {
  data: RadioGroupData[];
  display: "horizontal" | "vertical";
  onClickElement?: (id: string) => void;
}

const RadioGroupField: React.FC<RadioFieldProps> = ({
  data,
  display,
  onClickElement,
}) => {
  return (
    <ul className={`radio-field-container radio-field-${display}-container`}>
      {data.map((element) => (
        <li
          key={element.text}
          className={element.isChecked ? "checked" : ""}
          onClick={() => (onClickElement ? onClickElement(element.text) : {})}
        >
          <div className="fake-input-container">
            <label>{element.text}</label>
            <div className="check">
              <div className="inside"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RadioGroupField;
