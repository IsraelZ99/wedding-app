import Countdown from "./Countdown";
import "../../styles/presentation.scss";

const Presentation: React.FC = () => {
  return (
    <div id="presentation">
      <span id="presentation-line"></span>
      <section id="presentation-header">
        <p>Znitch & Monse</p>
      </section>
      <section id="presentation-message">
        <p>¡Nos vamos a casar! 💒</p>
      </section>
      <section id="presentation-remaining-time">
        <Countdown targetDate="2025-08-23T17:00:00" />
      </section>
    </div>
  );
};

export default Presentation;
