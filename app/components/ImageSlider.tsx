import { useEffect, useState } from "react";
import SliderOne from '~/assets/slider-1.png';
import SliderTwo from '~/assets/slider-2.png';

const images = [
  SliderOne,
  SliderTwo,
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const autoSlide = setInterval(() => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(autoSlide);
    }
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="relative w-full max-w-full mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)} 
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="min-w-full min-h-[700px] sm:h-[100px] lg:h-[190px] object-cover"
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Next Slide"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-400"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}