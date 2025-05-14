import { creationInviteInformation } from "../services/InvitationService";
import { EXPRESS } from "../../__mocks__/data";

const InviteCreation: React.FC = () => {
  const hanldeUserCreation = async () => {
    for (const invitation of EXPRESS) {
      await creationInviteInformation(invitation);
    }
  };
  return (
    <div>
      <button onClick={hanldeUserCreation}>Crear invitaciones</button>
    </div>
  );
};

export default InviteCreation;
