import { useTranslation } from 'react-i18next';
import { FaInstagram } from 'react-icons/fa';

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
                <p className='px-3'
                >hazhaow2@gmail.com</p>
              </div>

              <div className="flex items-center space-x-2">
  <span className="text-xl font-bold">
    {t('get_in_touch.phone')}:
  </span>
  <span className="text-xl font-medium px-3">
    00358-417105564
  </span>
</div>


              <div className="flex items-start space-x-4">
                <span className="text-xl font-bold">
                  {t('get_in_touch.location')}:
                </span>
                <p className='px-3'>
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
              <p className='px-3'>
                {t('safeHealthyBite.contact.friday')}
                <br />
                {t('safeHealthyBite.contact.saturday')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg space-y-6">
            <h4 className="text-3xl font-semibold text-blue-700">
              {t('get_in_touch.follow_us')}
            </h4>
            <div className="flex space-x-8 justify-center sm:justify-start">
              <a
                href="https://www.instagram.com/safehealthybites/?igsh=YWc2YXJ4ZmFvcHJu"
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 hover:text-pink-800 transition-colors duration-300"
              >
                <FaInstagram size={48} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
