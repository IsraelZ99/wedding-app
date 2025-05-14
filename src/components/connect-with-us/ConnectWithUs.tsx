import AudioPlayer from "./AudioPlayer";
import resplandor from "/Resplandor.mp3";
import mayaAlbum from "/images/Maya-Album.jpg";

import "../../styles/connect-with-us.scss";
import { useState } from "react";

const ConnectWithUs = () => {
  const [className, setClassName] = useState<string>("");

  const hanldePlaySong = () => {
    setClassName("playing-audio");
  };

  const handlePauseSong = () => {
    setClassName("");
  };

  return (
    <div id="connect-with-us" className={className}>
      <section id="connect-with-us-phrase">
        <p>"Nuestro amor florece donde el alma se siente en casa"</p>
      </section>
      <section id="connect-with-us-song">
        <AudioPlayer
          songLocation={resplandor}
          artistName="Camilo VII"
          songName="Resplandor"
          albumImage={mayaAlbum}
          onPlaySong={hanldePlaySong}
          onStopSong={handlePauseSong}
        />
        <p>Conecten un momento sus almas junto a las nuestras escuchando nuestra canción.</p>
      </section>
    </div>
  );
};

export default ConnectWithUs;
