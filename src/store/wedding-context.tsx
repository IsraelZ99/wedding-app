import { createContext, ReactNode, useContext, useReducer } from "react";
import { Invitation } from "../types/api";

interface InvitationState {
  invitation: Invitation;
}

type InviteAction =
  | { type: "SET_INVITATION_STATUS"; payload: boolean }
  | { type: "SET_WISHES"; payload: { name: string; wish: string } }
  | { type: "SET_INVITATION_INFORMATION"; payload: Invitation };

const invitationReducer = (
  state: InvitationState,
  action: InviteAction
): InvitationState => {
  switch (action.type) {
    case "SET_WISHES": {
      const { guests, ...rest } = { ...state.invitation };
      const guestInformationEdited = guests.map((guest) => {
        if (guest.name === action.payload.name)
          return { ...guest, wishes: action.payload.wish };
        return { ...guest };
      });
      return {
        invitation: {
          ...rest,
          guests: guestInformationEdited,
        },
      };
    }
    case "SET_INVITATION_STATUS":
      return {
        invitation: {
          ...state.invitation,
          isInvitationConfirmed: action.payload,
        },
      };
    case "SET_INVITATION_INFORMATION":
      return {
        invitation: action.payload,
      };
    default:
      return state;
  }
};

const InvitationContext = createContext<{
  state: InvitationState;
  setInvitationInformation: (information: Invitation) => void;
  setInvitationStatus: (status: boolean) => void;
  setWishes: (guestName: string, wish: string) => void;
} | null>(null);

export const InvitationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(invitationReducer, {
    invitation: {
      guests: [],
      isInvitationConfirmed: false,
      id: "",
    },
  });

  const setInvitationInformation = (information: Invitation) =>
    dispatch({ type: "SET_INVITATION_INFORMATION", payload: information });
  const setInvitationStatus = (status: boolean) =>
    dispatch({ type: "SET_INVITATION_STATUS", payload: status });
  const setWishes = (guestName: string, wish: string) =>
    dispatch({ type: "SET_WISHES", payload: { name: guestName, wish } });

  return (
    <InvitationContext.Provider
      value={{
        state,
        setInvitationStatus,
        setWishes,
        setInvitationInformation,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitationContext = () => {
  const context = useContext(InvitationContext);
  if (!context)
    throw new Error("InvitationContext must be used within InvitationProvider");
  return context;
};
