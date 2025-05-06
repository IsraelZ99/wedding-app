import { useEffect, useRef, useState } from "react";
import Modal from "./common/Modal";
import { CustomDialogProps } from "./common/Props";
import IconButton from "./common/IconButton";
import { BsFillPersonCheckFill } from "react-icons/bs";

import Button from "./common/Button";
import { FcOk, FcQuestions } from "react-icons/fc";
import { useInvitationContext } from "../store/wedding-context";
import {
  getInviteInformation,
  updateInviteInformation,
} from "../services/InvitationService";
import { FaRegSadCry } from "react-icons/fa";
import { RadioGroupData } from "../types/common";
import RadioGroupField from "./common/RadioGroupField";
import { FirebaseInvitation } from "../types/api";
import { createPayload } from "../util/InvitationUtils";
import theme from "../styles/_base-theme.module.scss";
import "../styles/access-pass.scss";

const AccessPass: React.FC = () => {
  const deadline = new Date("2025-06-30T23:59:59");
  // const deadline = new Date("2025-03-30T23:59:59");
  const { state, setInvitationStatus, setInvitationInformation } =
    useInvitationContext();
  const [passNumberData, setPassNumberInformation] = useState<RadioGroupData[]>(
    []
  );
  const [isDisabled, setIsDisabled] = useState(new Date() > deadline);
  const [showMessage, setShowMessage] = useState(false);
  const invitationDataHasChanged = useRef<CustomDialogProps>(null);
  const confirmationDialog = useRef<CustomDialogProps>(null);
  const cancelDialog = useRef<CustomDialogProps>(null);
  const afterCancelDialog = useRef<CustomDialogProps>(null);

  useEffect(() => {
    const data: RadioGroupData[] = [1, 2, 3, 4].map((number) => ({
      text: String(number),
      isChecked: state.invitation.guests.length === number,
    }));
    setPassNumberInformation(data);
  }, [state.invitation.guests]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now > deadline) {
        setIsDisabled(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hasInvitationStatusChanged = async () => {
    const currentInvitationDoc = (await getInviteInformation(
      state.invitation.id
    )) as FirebaseInvitation;
    if (
      currentInvitationDoc.isConfirmed !==
      state.invitation.isInvitationConfirmed
    ) {
      setInvitationInformation(
        createPayload(state.invitation.id, currentInvitationDoc)
      );
      return true;
    }
    return false;
  };

  const handleOpenConfirmationModal = async () => {
    const hasChangedInvitation = await hasInvitationStatusChanged();
    if (hasChangedInvitation) {
      invitationDataHasChanged.current?.open();
    } else {
      confirmationDialog.current?.open();
      const newInvitationInformation = { ...state.invitation };
      newInvitationInformation.isInvitationConfirmed = true;
      await updateInviteInformation(newInvitationInformation);
      setInvitationStatus(true);
    }
  };

  const handleOpenCancelModal = async () => {
    const hasChangedInvitation = await hasInvitationStatusChanged();
    if (hasChangedInvitation) {
      invitationDataHasChanged.current?.open();
    } else {
      cancelDialog.current?.open();
    }
  };

  const handleCancelAttendance = async () => {
    const newInvitationInformation = { ...state.invitation };
    newInvitationInformation.isInvitationConfirmed = false;
    await updateInviteInformation(newInvitationInformation);
    setInvitationStatus(false);
    cancelDialog.current?.close();
    afterCancelDialog.current?.open();
  };

  const showMessageForShortTime = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const names = [...state.invitation.guests].map((guest) => guest.name);
  const isConfirmed = state.invitation.isInvitationConfirmed;
  const btnText = isConfirmed ? "Cancelar asistencia" : "Confirmar asistencia";

  const handleModal = !isDisabled
    ? isConfirmed
      ? handleOpenCancelModal
      : handleOpenConfirmationModal
    : showMessageForShortTime;

  return (
    <div id="access-pass">
      <Modal
        ref={invitationDataHasChanged}
        headerText="¡Ya ha sido confirmada/cancelada!"
      >
        <div className="access-pass-modal-status-changed-text">
          <p>
            Otra persona ya ha <i>confirmado/cancelado</i> la invitacion{" "}
          </p>
          <p>Cierra esta ventana para actualizar el estatus de la asistencia</p>
        </div>
      </Modal>
      <Modal ref={confirmationDialog} headerText="Confirmacion">
        <div className="access-pass-modal-icon-container">
          <FcOk className="access-pass-modal-icon" />
        </div>
        <p className="access-pass-modal-text">
          ¡Gracias por confirmar su asistencia! <br />
          Estamos muy contentos de que puedan acompañarnos.
        </p>
      </Modal>
      <Modal ref={cancelDialog} headerText="Cancelacion">
        <div className="access-pass-modal-icon-container">
          <FcQuestions className="access-pass-modal-icon" />
        </div>
        <p className="access-pass-modal-text">
          ¿Estas seguro de cancelar la asistencia a nuestra boda?
        </p>
        <div className="access-pass-modal-extra-button">
          <Button onClick={handleCancelAttendance} styles={{ height: "3em" }}>
            Si, lo siento
          </Button>
        </div>
      </Modal>
      <Modal ref={afterCancelDialog} headerText="Condolencias">
        <div className="access-pass-modal-icon-container">
          <FaRegSadCry className="access-pass-modal-icon" color={`${theme.black}`} />
        </div>
        <p className="access-pass-modal-text">
          Lamentamos mucho que no puedas acompañarnos a nuestra boda.
        </p>
      </Modal>
      <section id="access-pass-information">
        <h2 id="access-pass-text-pass">Pases</h2>
        <div id="pass-number">
          <RadioGroupField data={passNumberData} display="horizontal" />
        </div>
        <div id="reservation-container">
          <p id="reservation-text-for">La invitación esta reservada para:</p>
          <span id="names">
            {names.map((name) => (
              <div className="name-icon-button" key={name}>
                <IconButton
                  IconComponent={BsFillPersonCheckFill}
                  styles={{
                    icon: {
                      props: { size: "1.5rem" },
                      styles: { top: "0em" },
                    },
                    button: {
                      width: "5em",
                      padding: "0.4em 2.5em 0.4em 2.5em",
                    },
                  }}
                  onButtonClick={() => {}}
                  text={name}
                />
              </div>
            ))}
          </span>
        </div>
      </section>
      <section id="access-pass-confirmation-container">
        {!showMessage && (
          <section id="access-pass-confirmation">
            <p>Su presencia es muy importante para nosotros</p>
            <p>
              Confirmen su asistencia antes del <b>30 de junio del 2025.</b>
            </p>
            <Button onClick={handleModal}>{btnText}</Button>
          </section>
        )}
        <section
          id="access-pass-not-allowed-message"
          className={showMessage ? "showMessage" : ""}
        >
          <div>
            <p>
              ¡Lo lamentamos pero ya paso la fecha limite para confirmar! 🥺
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default AccessPass;
