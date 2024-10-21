import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function ContactUs() {
  const { t } = useTranslation();

  return (
    <section id="contact-us" className="bg-white py-[100px] lg:py-[150px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-700">
            {t('safeHealthyBite.contact.header')}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            {t('safeHealthyBite.contact.content')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-8 rounded-xl shadow-xl space-y-6 bg-gray-50">
            <h3 className="text-3xl font-semibold text-blue-700">
              {t('get_in_touch.contact_us')}
            </h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-4">
                <span className="text-xl font-bold">
                  {t('get_in_touch.email')}:
                </span>
                <p>hazhaow2@gmail.com</p>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl font-bold">
                  {t('get_in_touch.phone')}:
                </span>
                <p>+358 417105564</p>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl font-bold">
                  {t('get_in_touch.location')}:
                </span>
                <p>
                  On-site at Pinki Salon, Itäkeskus, Helsinki
                  <br />
                  Or online, via Zoom or Teams.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-xl font-bold">
                {t('get_in_touch.calling_time')}:
              </span>
              <p>
                Friday 9-15 clock
                <br />
                Saturday 11-15 clock
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg space-y-6">
            <h4 className="text-3xl font-semibold text-blue-700">
              {t('get_in_touch.follow_us')}
            </h4>
            <p className="text-gray-700">
              {t('get_in_touch.stay_updated')}
            </p>

            <div className="flex space-x-8 justify-center sm:justify-start">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                <FaFacebook size={48} />
              </a>
              <a
                href="/"
                className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
              >
                <FaTwitter size={48} />
              </a>
              <a
                href="/"
                className="text-pink-600 hover:text-pink-800 transition-colors duration-300"
              >
                <FaInstagram size={48} />
              </a>
              <a
                href="/"
                className="text-red-600 hover:text-red-800 transition-colors duration-300"
              >
                <FaYoutube size={48} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
