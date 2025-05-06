import { IoLogoWhatsapp } from "react-icons/io";
import IconButton from "./common/IconButton";
import Button from "./common/Button";
import { CustomDialogProps } from "./common/Props";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal from "./common/Modal";
import { useInvitationContext } from "../store/wedding-context";
import {
  getInviteInformation,
  sendWishesByGuestName,
} from "../services/InvitationService";
import { RadioGroupData } from "../types/common";
import RadioGroupField from "./common/RadioGroupField";
import "../styles/form-input.scss";
import { FcInspection } from "react-icons/fc";
import { FirebaseInvitation } from "../types/api";
import { createPayload } from "../util/InvitationUtils";

const FormInput: React.FC = () => {
  const { state, setWishes, setInvitationInformation } = useInvitationContext();
  const [inputNames, setInputNames] = useState<RadioGroupData[]>([]);
  const [wishText, setWishText] = useState<string>();
  const [btnWishes, setBtnWishes] = useState<string>("Enviar mis deseos");
  const wishesModal = useRef<CustomDialogProps>(null);
  const selectionModal = useRef<CustomDialogProps>(null);
  const confirmationModal = useRef<CustomDialogProps>(null);
  const monsePhoneNumber = import.meta.env.VITE_WHATSAPP_MONSE_NUMBER;
  const israelPhoneNumber = import.meta.env.VITE_WHATSAPP_ISRAEL_NUMBER;

  const names = [...state.invitation.guests].map((guest) => guest.name);

  useEffect(() => {
    const inputData: RadioGroupData[] = names.map((name) => ({
      text: name,
      isChecked: false,
    }));
    setInputNames(inputData);
  }, []);

  const resetAllInputsValues = () => {
    setInputNames((prevInputs) =>
      [...prevInputs].map((inputData) => ({ ...inputData, isChecked: false }))
    );
    setWishText("");
  };

  const handleOpenSelectionModal = async () => {
    const currentInvitationDoc = (await getInviteInformation(
      state.invitation.id
    )) as FirebaseInvitation;
    setInvitationInformation(
      createPayload(state.invitation.id, currentInvitationDoc)
    );
    selectionModal.current?.open();
  };

  const handleSelectElement = (name: string) => {
    const wishTextWroteByGuest = state.invitation.guests.find(
      (guest) => guest.name === name
    )?.wishes;
    setWishText(wishTextWroteByGuest);
    setInputNames((prevInputs) => {
      return [...prevInputs].map((inputData) => {
        return {
          ...inputData,
          isChecked: inputData.text === name,
        };
      });
    });
    setTimeout(() => {
      selectionModal.current?.close();
      wishesModal.current?.open();
    }, 350);
  };

  const handleSendWishes = async () => {
    if (!wishText) return;
    const trimWishText = wishText.trim();
    const guestWhoIsSendingWishes = inputNames.find(
      (guest) => guest.isChecked
    )?.text;
    if (!guestWhoIsSendingWishes) return;
    setBtnWishes("Enviando...")
    await sendWishesByGuestName(
      state.invitation.id,
      guestWhoIsSendingWishes,
      trimWishText
    );
    setWishes(guestWhoIsSendingWishes, trimWishText);
    wishesModal.current?.close();
    confirmationModal.current?.open();
    resetAllInputsValues();
  };

  const handleChangeWishText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWishText(e.target.value);
  };

  const handleSendMessageToMonse = () => {
    window.open(`https://wa.me/${monsePhoneNumber}`);
  };

  const handleSendMessageToIsrael = () => {
    window.open(`https://wa.me/${israelPhoneNumber}`);
  };

  const handleCloseModal = () => {
    resetAllInputsValues();
  };

  return (
    <div id="form-input">
      <Modal
        ref={selectionModal}
        headerText="Selecciona tu nombre"
        onCloseModal={handleCloseModal}
      >
        <div id="form-input-selection-container">
          <RadioGroupField
            data={inputNames}
            display="vertical"
            onClickElement={handleSelectElement}
          />
        </div>
      </Modal>
      <Modal
        ref={wishesModal}
        headerText="Buzon de buenos desesos"
        onCloseModal={handleCloseModal}
      >
        <div id="form-input-modal-textarea-container">
          <textarea
            id="form-input-modal-textarea"
            placeholder="Escribe aquí el mensaje que quieras darnos"
            value={wishText}
            onChange={handleChangeWishText}
          />
        </div>
        <div id="form-input-modal-send-container">
          <Button
            onClick={handleSendWishes}
            styles={{ height: "2em", width: "80%" }}
          >
            {btnWishes}
          </Button>
        </div>
      </Modal>
      <Modal ref={confirmationModal} headerText="Agredecimiento">
        <div className="form-input-modal-confirmation-icon-container">
          <FcInspection className="form-input-modal-confirmation-icon" />
        </div>
        <p className="form-input-modal-confirmation-text">
          Hemos recibido con exito tus deseos, te agradecemos por tomarte el
          tiempo de dedicarnos unas bonitas palabras.
        </p>
      </Modal>
      <section id="form-input-lodgment">
        <p>¿Quieres hospejade para el evento?</p>
        <p>Puedes contactarnos vía Whatsapp.</p>
        <span id="form-input-contacts">
          <IconButton
            IconComponent={IoLogoWhatsapp}
            styles={{
              icon: { props: { size: "1.5rem" }, styles: { top: "0em" } },
              button: { width: "60%" },
            }}
            onButtonClick={handleSendMessageToMonse}
            text="Monse"
          />
          <IconButton
            IconComponent={IoLogoWhatsapp}
            styles={{
              icon: { props: { size: "1.5rem" }, styles: { top: "0em" } },
              button: { width: "60%" },
            }}
            onButtonClick={handleSendMessageToIsrael}
            text="Israel"
          />
        </span>
      </section>
      <section id="form-input-wishes">
        <p>¿Te gustaria dejarnos un mensaje con tus buenos deseos?</p>
        <Button onClick={handleOpenSelectionModal}>¡Da click aqui!</Button>
      </section>
    </div>
  );
};

export default FormInput;
