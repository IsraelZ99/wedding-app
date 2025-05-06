interface Guests {
  name: string;
  wishes: string;
}

interface FirebaseInvitation {
  guests: Guests[];
  isConfirmed: boolean;
}

interface Invitation {
  id: string;
  guests: Guests[];
  isInvitationConfirmed: boolean;
}

export type { Invitation, FirebaseInvitation };
