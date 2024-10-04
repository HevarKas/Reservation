import { useTranslation } from 'react-i18next';

function PriceDetails() {
  const { t } = useTranslation();

  return (
    <section id="price-details" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-10">
          {t('safeHealthyBite.prices.header')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Consultation Prices */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Consultation</h3>
            <ul className="space-y-2">
              <li className="text-gray-700">{t('safeHealthyBite.prices.consultation.halfHour')}</li>
              <li className="text-gray-700">{t('safeHealthyBite.prices.consultation.oneHour')}</li>
            </ul>
          </div>

          {/* Tailored Program Price */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Tailored Program</h3>
            <p className="text-gray-700">{t('safeHealthyBite.prices.tailoredProgram')}</p>
          </div>

          {/* Following Checkup Price */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Following Checkup</h3>
            <p className="text-gray-700">{t('safeHealthyBite.prices.followingCheckup')}</p>
          </div>

          {/* Food Safety Training Prices */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Food Safety Training</h3>
            <h4 className="text-xl font-semibold text-blue-500">Individual Training</h4>
            <p className="text-gray-700">{t('safeHealthyBite.prices.foodSafetyTraining.individual')}</p>
            <h4 className="text-xl font-semibold text-blue-500">Company Training</h4>
            <p className="text-gray-700">{t('safeHealthyBite.prices.foodSafetyTraining.company')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PriceDetails;
