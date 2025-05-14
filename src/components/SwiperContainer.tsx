// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";
import { getInviteInformation } from "../services/InvitationService";
import { useEffect, useState } from "react";
import { useInvitationContext } from "../store/wedding-context";
import { FirebaseInvitation } from "../types/api";

import SwiperSlideContent from "./common/SwiperSlideContent";
import Presentation from "./presentation/Presentation";
import ConnectWithUs from "./connect-with-us/ConnectWithUs";
import EventInformation from "./EventInformation";
import Itinerary from "./Itinerary";
import AccessPass from "./AccessPass";
import FormInput from "./FormInput";
import { ImSpinner9 } from "react-icons/im";

import FIRST_IMAGE from "/images/Monse_Isra1.webp";
import SECOND_IMAGE from "/images/Monse_Isra2.webp";
import THIRD_IMAGE from "/images/Monse_Isra3.webp";
import FOURH_IMAGE from "/images/Monse_Isra4.webp";
import FIFTH_IMAGE from "/images/Dino.webp";
import theme from "../styles/_base-theme.module.scss";
import { createPayload } from "../util/InvitationUtils";
import "../styles/main.scss";

export default function SwipperContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { invitationId } = useParams();
  const { state, setInvitationInformation } = useInvitationContext();

  useEffect(() => {
    const fetchInvitationData = async () => {
      try {
        const invitationDoc = (await getInviteInformation(
          invitationId
        )) as FirebaseInvitation;
        if (invitationDoc && invitationId) {
          const invitationData = createPayload(invitationId, invitationDoc);
          setInvitationInformation(invitationData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchInvitationData();
  }, [invitationId]);

  //TODO: Add spiner
  const isValidInvitation = state.invitation.guests.length > 0;

  return (
    <>
      {isLoading && (
        <div className="loading">
          <ImSpinner9 className="spinner" color={`${theme.white}`} size="3em" />
        </div>
      )}
      {!isLoading && (
        <>
          {(!isValidInvitation || isError) && <NotFound />}
          {isValidInvitation && (
            <Swiper
              direction={"vertical"}
              slidesPerView={1}
              spaceBetween={30}
              speed={800}
              mousewheel={true}
              parallax={true}
              pagination={{
                clickable: true,
                renderBullet: (_, className) => {
                  return `<span class="${className}">
                            <img src="/icons/valentines.webp" alt="bullet" style="width: 20px; height: 20px;" />
                          </span>`;
                },
              }}
              noSwiping
              modules={[Mousewheel, Pagination]}
              className="wedding-main-container"
            >
              <SwiperSlide>
                <SwiperSlideContent
                  imageData={{ imageSrc: FOURH_IMAGE, altText: "MYTEXT" }}
                  component={{ isComponentAtTop: true }}
                >
                  <Presentation />
                </SwiperSlideContent>
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideContent
                  imageData={{ imageSrc: THIRD_IMAGE, altText: "MYTEXT" }}
                  component={{ isComponentAtTop: false }}
                >
                  <ConnectWithUs />
                </SwiperSlideContent>
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideContent
                  imageData={{ imageSrc: FIRST_IMAGE, altText: "MYTEXT" }}
                  component={{ isComponentAtTop: true }}
                >
                  <EventInformation />
                </SwiperSlideContent>
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideContent
                  imageData={{ imageSrc: FOURH_IMAGE, altText: "MYTEXT" }}
                  component={{ isComponentAtTop: true, isFull: true }}
                >
                  <Itinerary />
                </SwiperSlideContent>
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideContent
                  imageData={{ imageSrc: SECOND_IMAGE, altText: "MYTEXT" }}
                  component={{ isComponentAtTop: false }}
                >
                  <AccessPass />
                </SwiperSlideContent>
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideContent
                  imageData={{ imageSrc: FIFTH_IMAGE, altText: "MYTEXT" }}
                  component={{ isComponentAtTop: true }}
                >
                  <FormInput />
                </SwiperSlideContent>
              </SwiperSlide>
            </Swiper>
          )}
        </>
      )}
    </>
  );
}
