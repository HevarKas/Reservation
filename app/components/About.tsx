import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileImage from '~/assets/doctor.png';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [showMoreAboutMe, setShowMoreAboutMe] = useState(false);
  const [showMoreVision, setShowMoreVision] = useState(false);

  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12"
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row max-w-6xl w-full p-6">
        <div className="flex-shrink-0">
          {/* Center image on small screens */}
          <img
            src={ProfileImage}
            alt="Profile"
            className="w-64 h-64 object-cover border-4 border-blue-500 rounded-full m-6 shadow-md mx-auto lg:m-0 lg:mr-6"
          />
        </div>
        <div className="flex flex-col justify-center p-6 space-y-4">
          {/* About Me Section */}
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
            {t('safeHealthyBite.aboutMe.header')}
          </h2>
          <p
            className={`text-lg sm:text-xl text-gray-700 leading-relaxed ${
              showMoreAboutMe ? '' : 'line-clamp-2'
            }`}
          >
            {t('safeHealthyBite.aboutMe.content')}
          </p>
          <button
            className="mt-2 text-blue-600 hover:underline"
            onClick={() => setShowMoreAboutMe(!showMoreAboutMe)}
          >
            {showMoreAboutMe ? t('hide') : t('showMore')}
          </button>

          <div className="border-t border-gray-300 my-6"></div>

          {/* Vision Section */}
          <h3 className="text-3xl sm:text-4xl font-semibold text-blue-600 mb-4">
            {t('safeHealthyBite.vision.header')}
          </h3>
          <p
            className={`text-lg sm:text-xl text-gray-700 leading-relaxed ${
              showMoreVision ? '' : 'line-clamp-2'
            }`}
          >
            {t('safeHealthyBite.vision.content')}
          </p>
          <button
            className="mt-2 text-blue-600 hover:underline"
            onClick={() => setShowMoreVision(!showMoreVision)}
          >
            {showMoreVision ? t('hide') : t('showMore')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
