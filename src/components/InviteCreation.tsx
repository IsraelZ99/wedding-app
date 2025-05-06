import { creationInviteInformation } from "../services/InvitationService";
import { INVITATIONS } from "../../__mocks__/data";

const InviteCreation: React.FC = () => {
  const hanldeUserCreation = async () => {
    for (const invitation of INVITATIONS) {
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
