import { useState } from 'react';
import person1Image from "~/assets/person-1.png";
import person2Image from "~/assets/person-2.png";
import person3Image from "~/assets/person-3.png";

const testimonials = [
  {
    name: "Galawish",
    location: "Sulaimani, Iraq",
    message: "God bless you dear Dr. Hazhaow. However, I am still in the middle of the tailored program. But I feel so much better already because you looked for the source of pain and illness and tried to start avoiding and healing from scratch, and all the remedies and advice that you use are so natural and organic; I wish you good health and success, Inshallah.",
    image: person1Image
  },
  {
    name: "Abdullah",
    location: "Iraq",
    message: "I am Abdullah from Iraq and the food culture here is unhealthy to say the least. I have always heard that you are what you eat, so I figured I’d try to take this course and see what happens and I am more than happy I did! The course helped me re-build my eating habits and improved every hour of my life from the moment I wake up where I no longer get muscle cramps and no longer feel lethargic upon waking up at all, to my working hours where I stay focused all day without getting a foggy mind, to even my gym sessions where I have a burst of energy going in each time.",
    image: person2Image
  },
  {
    name: "Razia Mohammed",
    location: "Iraq",
    message: "Salam alikom. I am Razia Mohammed, a client of Dr. Hazhaw, from Iraq. I was under her supervision and guidance for many years, and I have benefited greatly from her giving nutrition advice and suggested food intake councils. She is really a very caring person. May god bless her.",
    image: person3Image
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="bg-white py-[100px] px-8 text-center">
      <div className="relative">
        <div className="p-4 transition-opacity duration-500 mx-8 lg:mx-[170px]">
          <img
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p className="text-lg md:text-xl text-gray-700 italic mb-2">{testimonials[currentIndex].message}</p>
          <p className="text-sm md:text-base text-gray-500">
            - {testimonials[currentIndex].name}, {testimonials[currentIndex].location}
          </p>
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSlider;
