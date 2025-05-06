import "../../styles/swipper-slide-content.scss";
import Gallery from "./Gallery";

interface ImageProps {
  imageSrc: string;
  altText: string;
}

interface ComponentProps {
  isComponentAtTop: boolean;
  isFull?: boolean;
}

interface SwiperSlideContentProps {
  imageData: ImageProps;
  component: ComponentProps;
  children?: React.ReactNode;
}

interface ContainerProps {
  children?: React.ReactNode;
  styles: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({ children, styles }) => {
  return (
    <section className="swiper-slider-content-container" style={styles}>
      {children}
    </section>
  );
};

const SwiperSlideContent: React.FC<SwiperSlideContentProps> = ({
  imageData,
  component: { isComponentAtTop, isFull = false },
  children,
}) => {
  const width = "85vw";
  const childrenStyles: React.CSSProperties = { height: "60vh", width };
  const galleryStyles: React.CSSProperties = { height: "40vh", width: "100vw" };
  return (
    <>
      {!isFull && (
        <>
          {isComponentAtTop && (
            <>
              <Container styles={childrenStyles}>{children}</Container>
              <Container styles={galleryStyles}>
                <Gallery
                  image={imageData.imageSrc}
                  altText={imageData.altText}
                />
              </Container>
            </>
          )}
          {!isComponentAtTop && (
            <>
              <Container styles={galleryStyles}>
                <Gallery
                  image={imageData.imageSrc}
                  altText={imageData.altText}
                />
              </Container>
              <Container styles={childrenStyles}>{children}</Container>
            </>
          )}
        </>
      )}
      {isFull && <Container styles={{ height: "100%" }}>{children}</Container>}
    </>
  );
};

export default SwiperSlideContent;
