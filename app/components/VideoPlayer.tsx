import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import videoOne from "~/assets/video-1.mp4";
import videoTwo from "~/assets/video-2.mp4";
import videoThree from "~/assets/video-3.mp4";
import videoMain from "~/assets/video-main.mp4";

const VideoPlayer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ReactPlayerComponent, setReactPlayerComponent] = useState<null | any>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    import('react-player').then((module) => {
      setReactPlayerComponent(() => module.default);
    });
  }, []);

  if (!ReactPlayerComponent) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  const videos = [
    { url: videoMain, testimonial: t("testimonial.customer_main.content"), customer: t("testimonial.customer_main.title") },
    { url: videoOne, testimonial: t("testimonial.customer_one.content"), customer: t("testimonial.customer_one.name") },
    { url: videoTwo, testimonial: t("testimonial.customer_two.content"), customer: t("testimonial.customer_two.name") },
    { url: videoThree, testimonial: t("testimonial.customer_three.content"), customer: t("testimonial.customer_three.name") },
  ];

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setPlaying(false); // Pause video on changing
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    setPlaying(false); // Pause video on changing
  };

  const handlePlayClick = () => {
    setPlaying(true); // Play video on click
  };

  return (
    <section className="bg-blue-50 py-[100px] px-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-16">
        {t('testimonial.title')}
      </h1>

      <div className="relative max-w-lg mx-auto">
        <div className="text-center">
          <ReactPlayerComponent
            url={videos[currentVideoIndex].url}
            controls
            width="100%"
            height="600px" 
            playing={playing}
            onClick={handlePlayClick}
          />
          <p className="text-lg md:text-xl text-gray-700 mt-4 italic">
            {videos[currentVideoIndex].testimonial}
          </p>
        </div>

        {/* Slider Controls */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={handlePrev}
            className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 focus:outline-none"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 focus:outline-none"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer;
