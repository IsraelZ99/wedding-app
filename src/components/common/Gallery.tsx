import "../../styles/gallery.scss";

interface GalleryProps {
  image: string;
  altText: string;
}

const Gallery: React.FC<GalleryProps> = ({ image, altText }) => {
  return (
    <div className="gallery-container">
      <img src={image} alt={altText} loading="lazy" />
    </div>
  );
};

export default Gallery;
