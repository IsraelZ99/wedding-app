import { LiaSadCry } from "react-icons/lia";
import "../styles/not-found.scss";
import IconButton from "./common/IconButton";
import { IoLogoWhatsapp } from "react-icons/io5";

const NotFound: React.FC = () => {
  const monsePhoneNumber = import.meta.env.VITE_WHATSAPP_MONSE_NUMBER;
  const israelPhoneNumber = import.meta.env.VITE_WHATSAPP_ISRAEL_NUMBER;

  const handleSendMessageToMonse = () => {
    window.open(`https://wa.me/${monsePhoneNumber}`);
  };

  const handleSendMessageToIsrael = () => {
    window.open(`https://wa.me/${israelPhoneNumber}`);
  };

  return (
    <div className="not-found-container">
      <div className="main-container">
        <div className="card card-photo">
          <div id="card1" className="card-photo">
            <div id="rowOne" className="firstPart">
              <h2>Esta invitación no existe </h2>
              <section>
                <LiaSadCry color="white" size="2.5rem" />
              </section>
            </div>
            <div className="main-container-text">
              <p id="main-container-tex-first">
                Confirma que sea la invitación correcta.
              </p>
              <p id="main-container-tex-second">
                Para ello, puedes contactarnos via whatsapp.
              </p>
              <div className="btn">
                <IconButton
                  IconComponent={IoLogoWhatsapp}
                  text="Monse"
                  type="secondary"
                  onButtonClick={handleSendMessageToMonse}
                  styles={{
                    icon: { props: { size: "1.4em" }, styles: { top: "0.01em" } },
                    button: { width: "50%" },
                  }}
                />
                <IconButton
                  IconComponent={IoLogoWhatsapp}
                  text="Znitch"
                  type="secondary"
                  onButtonClick={handleSendMessageToIsrael}
                  styles={{
                    icon: { props: { size: "1.4em" }, styles: { top: "0.01em" } },
                    button: { width: "50%" },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
