import spouseIcon from "/spouse-icon.png";
import { FaRegHeart } from "react-icons/fa";
import theme from "../styles/_base-theme.module.scss";
import "../styles/itinerary.scss";

const Itinerary: React.FC = () => {
  const itineraryData = [
    {
      id: 1,
      header: "Recepción",
      instruction: "05:00 pm",
      className: "reception",
    },
    {
      id: 2,
      header: "Ceremonia",
      instruction: "05:30 pm",
      className: "start",
    },
    {
      id: 3,
      header: "Término",
      instruction: "10:00 pm",
      className: "ending",
    },
  ];
  return (
    <div id="itinerary">
      <section id="dress-code">
        <h1>Dress Code</h1>
        <div id="icon-container">
          <img src={spouseIcon} />
        </div>
        <p id="first-instruction">Semi-formal / Cocktail</p>
        {/* <div id="second-instruction-container">
          <p>
            <b>Hombres:</b> Traje corte basico, colores neutros
          </p>
          <p>
            <b>Mujeres:</b> Vestidos corte midi o pantalon a medida, colores
            neutros
          </p>
        </div> */}
        <div id="important-instruction">
          <span id="important-instruction-asterisk">*</span>
          <p>Color blanco y similares se reservan para la novia.</p>
        </div>
      </section>
      <section id="information-timeline">
        <ul>
          {itineraryData.map((data) => (
            <li key={data.id}>
              <div className={data.className}>
                <p>{data.header}</p>
                <p>{data.instruction}</p>
              </div>
              <span>
                <FaRegHeart
                  size="30px"
                  className="heart-icon"
                  color={`${theme.white}`}
                />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Itinerary;
