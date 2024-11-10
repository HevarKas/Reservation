import { useEffect, useState, memo, FC } from "react";
import PropTypes from 'prop-types';
import SliderOne from '~/assets/slider-1.png';
import SliderTwo from '~/assets/slider-2.png';
import SliderThree from '~/assets/slider-3.png';
import { useLanguage } from "./LanguageContext";

interface ImageProps {
  src: string;
  alt: string;
}

const Image: FC<ImageProps> = memo(({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="min-w-full object-cover h-[700px] transition-opacity duration-500 ease-in-out"
    loading="lazy"
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.onerror = null; // Prevent looping
      target.src = '/path/to/fallback-image.png'; // Fallback image path
    }}
  />
));
Image.displayName = 'Image';

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const images = [
  { src: SliderOne, alt: 'Slide 1' },
  { src: SliderTwo, alt: 'Slide 2' },
  { src: SliderThree, alt: 'Slide 3' },
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { rtl } = useLanguage(); 

  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }, 3000);
    return () => clearInterval(autoSlide);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'ArrowRight') {
      rtl ? prevSlide() : nextSlide(); // Reverse navigation for RTL
    } else if (event.key === 'ArrowLeft') {
      rtl ? nextSlide() : prevSlide(); // Reverse navigation for RTL
    }
  };

  return (
    <div
      className="relative w-full max-w-full mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="button" // Make the div focusable and interactive
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(${rtl ? (currentSlide * 100) : (-currentSlide * 100)}%)`,
          width: '100%',
        }}
      >
        {images.map((image, index) => (
          <Image key={index} src={image.src} alt={image.alt} />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Previous Slide"
      >
        {rtl ? ">" : "<"}
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Next Slide"
      >
        {rtl ? "<" : ">"}
      </button>

      <div className={`absolute bottom-4 ${rtl ? 'right-1/2' : 'left-1/2'} transform ${rtl ? 'translate-x-1/2' : '-translate-x-1/2'} flex ${rtl ? 'space-x-reverse' : 'space-x-2'} space-x-2`}>
  {images.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentSlide(index)}
      className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-blue-500" : "bg-gray-400"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>

    </div>
  );
}
