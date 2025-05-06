import { FirebaseInvitation, Invitation } from "../types/api";

const createPayload = (
  invitationId: string,
  invitationDoc: FirebaseInvitation
): Invitation => {
  const id = invitationId as string;
  const invitationData: Invitation = {
    id,
    guests: invitationDoc.guests,
    isInvitationConfirmed: invitationDoc.isConfirmed,
  };
  return invitationData;
};

export { createPayload };
