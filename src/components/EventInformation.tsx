import { PiMapPinLineBold } from "react-icons/pi";
import IconButton from "./common/IconButton";
import "../styles/event-information.scss";

const EventInformation: React.FC = () => {
  const eventInformationCSSId = "event-information";

  const handleOnLocationClick = () => {
    window.open(
      "https://www.google.com/maps/place/Finca+la+Alameda+Tepotzotlan/@19.6963016,-99.2660434,17z/data=!4m6!3m5!1s0x85d21f047f48e5a7:0x5ae68dce85cf6938!8m2!3d19.6966753!4d-99.2657108!16s%2Fg%2F11jvb19sfy?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D"
    );
  };

  return (
    <div id={`${eventInformationCSSId}`}>
      <section id={`${eventInformationCSSId}-first-message`}>
        <p>Tenemos el agrado de invitarlos a nuestra ceremonia civil</p>
      </section>
      <section id={`${eventInformationCSSId}-date`}>
        <div id={`${eventInformationCSSId}-month-container`}>
          <p>Agosto</p>
          <div id={`${eventInformationCSSId}-lines-container`}>
            <span className={`${eventInformationCSSId}-line`}></span>
            <span className={`${eventInformationCSSId}-line`}></span>
            <span className={`${eventInformationCSSId}-line`}></span>
          </div>
        </div>
        <div id={`${eventInformationCSSId}-wdy-container`}>
          <div id={`${eventInformationCSSId}-week-container`}>
            <p>Sábado</p>
            <span className={`${eventInformationCSSId}-line`}></span>
          </div>
          <div id={`${eventInformationCSSId}-day-container`}>
            <p>23</p>
            <span className={`${eventInformationCSSId}-line`}></span>
          </div>
          <div id={`${eventInformationCSSId}-year-container`}>
            <p>2025</p>
            <span className={`${eventInformationCSSId}-line`}></span>
          </div>
        </div>
      </section>
      <section id={`${eventInformationCSSId}-location`}>
        <div>
          <p>Hora: 5:00 pm</p>
        </div>
        <div style={{ fontWeight: "bolder"}}>
          <p>Finca la Alameda, Tepotzotlan</p>
        </div>
        <div>
          <p>Calle de los Girasoles Manzana 016, 54604, Tepotzotlan, México</p>
        </div>
        <div id={`${eventInformationCSSId}-location`}>
          <IconButton
            IconComponent={PiMapPinLineBold}
            styles={{
              icon: { props: { size: "1.1em" }, styles: { top: "0.2em" } },
              button: { width: "80%", padding: "0.5em 1.5em 0.5em 3em", },
            }}
            type="primary"
            onButtonClick={handleOnLocationClick}
            text="¿Cómo llegar?"
          />
        </div>
      </section>
    </div>
  );
};

export default EventInformation;
