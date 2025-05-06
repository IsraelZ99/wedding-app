import "../styles/itinerary.scss";
import spouseIcon from "/spouse-icon.png";
import { FaRegHeart } from "react-icons/fa";

const Itinerary: React.FC = () => {
  const itineraryData = [
    {
      id: 1,
      header: "Recepcion",
      instruction: "05:00 pm",
    },
    {
      id: 2,
      header: "Ceremonia Civil",
      instruction: "05:30 pm",
    },
    {
      id: 3,
      header: "Termino",
      instruction: "10:00 pm",
    },
  ];
  return (
    <div id="itinerary">
      <section id="dress-code">
        <h1>Dress Code</h1>
        <div id="icon-container">
          <img src={spouseIcon} />
        </div>
        <p id="first-instruction">FORMAL</p>
        <div id="second-instruction-container">
          <p>Hombres: Traje y zapatos</p>
          <p>Mujeres: Vestido largo</p>
        </div>
        <div id="important-instruction">
          <span id="important-instruction-asterisk">*</span>
          <p>Color blanco y similares se reservan para la novia</p>
        </div>
      </section>
      <section id="information-timeline">
        <ul>
          {itineraryData.map((data) => (
            <li key={data.id}>
              <div>
                <p>{data.header}</p>
                <p>{data.instruction}</p>
              </div>
              <span>
                <FaRegHeart size="30px" className="heart-icon" />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Itinerary;
