import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { FirebaseInvitation, Invitation } from "../types/api";

const getInviteInformation = async (id: string | undefined) => {
  if (!id) return null;
  const inviteDoc = await getDoc(doc(db, "invitations", id));
  if (inviteDoc.exists()) {
    return inviteDoc.data();
  }
  return null;
};

const updateInviteInformation = async (invitation: Invitation) => {
  const { id, ...rest } = invitation;
  const updatedInvitation: FirebaseInvitation = {
    guests: rest.guests,
    isConfirmed: rest.isInvitationConfirmed,
  };
  await updateDoc(doc(db, "invitations", id), { ...updatedInvitation });
};

const sendWishesByGuestName = async (
  id: string,
  guestName: string,
  wishText: string
) => {
  const inviteDoc = await getDoc(doc(db, "invitations", id));
  const inviteData: FirebaseInvitation = inviteDoc.data() as FirebaseInvitation;
  const updatedGuests = inviteData.guests.map((guest) => ({
    name: guest.name,
    wishes: guest.name === guestName ? wishText : guest.wishes,
  }));
  await updateInviteInformation({
    id,
    guests: updatedGuests,
    isInvitationConfirmed: inviteData.isConfirmed,
  });
};

const creationInviteInformation = async (invitation: FirebaseInvitation) => {
  const invitationInformation: FirebaseInvitation = {
    guests: invitation.guests,
    isConfirmed: invitation.isConfirmed,
  };
  await addDoc(collection(db, "invitations"), { ...invitationInformation });
};

export {
  getInviteInformation,
  updateInviteInformation,
  sendWishesByGuestName,
  creationInviteInformation,
};
