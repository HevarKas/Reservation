import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function ContactUs() {
  const { t } = useTranslation();

  return (
    <section id="contact-us" className="py-16">
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
              {t('safeHealthyBite.contact.header')}
            </h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-4">
                <span className="text-xl font-bold">{t('address')}:</span>
                <p>{t('safeHealthyBite.contact.location')}</p>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl font-bold">{t('phone')}:</span>
                <p>{t('safeHealthyBite.contact.phone')}</p>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl font-bold">{t('email')}:</span>
                <p>{t('safeHealthyBite.contact.email')}</p>
              </div>
            </div>

            <p className="text-base text-gray-500">
              {t('safeHealthyBite.contact.businessHours')}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg space-y-6">
            <h4 className="text-3xl font-semibold text-blue-700">
              {t('safeHealthyBite.followUs')}
            </h4>
            <p className="text-gray-700">
              {t('safeHealthyBite.stayUpdated')}
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
