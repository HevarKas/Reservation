import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import videoOne from "~/assets/video-1.mp4";
import videoTwo from "~/assets/video-2.mp4";

const VideoPlayer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ReactPlayerComponent, setReactPlayerComponent] = useState<null | any>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    import('react-player').then((module) => {
      setReactPlayerComponent(() => module.default);
    });
  }, []);

  if (!ReactPlayerComponent) {
    return <div className="flex justify-center items-center h-screen"><div className="loader">Loading...</div></div>;
  }

  const videos = [
    { url: videoOne, testimonial: t("testimonial.customer_one.content"), customer: t("testimonial.customer_one.name") },
    { url: videoTwo, testimonial: t("testimonial.customer_two.content"), customer: t("testimonial.customer_two.name") }
  ];

  return (
    <section className="bg-blue-50 py-[100px] px-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-16">
        {t('testimonial.title')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center max-w-5xl mx-auto">
        {videos.map((item, index) => (
          <div key={index} className="text-center transition-transform transform hover:scale-105">
            <ReactPlayerComponent 
              url={item.url} 
              controls 
              width="100%" 
              height="auto" 
              playing={playingIndex === index} 
              onPlay={() => setPlayingIndex(index)}
              onPause={() => setPlayingIndex(null)}
            />
            <p className="text-lg md:text-xl text-gray-700 mt-4 italic">{item.testimonial}</p>
            <p className="text-sm md:text-base text-gray-500">{item.customer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoPlayer;
