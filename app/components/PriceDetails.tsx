import { useTranslation } from 'react-i18next';

function PriceDetails() {
  const { t } = useTranslation();

  return (
    <section id="price-details" className="bg-blue-50 py-[100px] lg:py-[150px]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-10">
          {t('safeHealthyBite.prices.header')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Consultation Prices */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              {t('price.consultation.title')}
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-700">
                {t('price.consultation.options.half_hour.time')} - {t('price.consultation.options.half_hour.price')}
              </li>
              <li className="text-gray-700">
                {t('price.consultation.options.one_hour.time')} - {t('price.consultation.options.one_hour.price')}
              </li>
              <li className="text-gray-700">
                {t('price.consultation.content')}
              </li>
            </ul>
          </div>

          {/* Guts Cleansing Program Price */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              {t('price.guts_cleansing_program.title')}
            </h3>
            <p className="text-gray-700">
              {t('price.guts_cleansing_program.price')} ({t('price.guts_cleansing_program.duration')})
            </p>
          </div>

          {/* Detox Program Price */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              {t('price.detox_program.title')}
            </h3>
            <p className="text-gray-700">
              {t('price.detox_program.price')} ({t('price.detox_program.duration')})
            </p>
            <p className="text-gray-700">{t('price.detox_program.content')}</p>
          </div>

          {/* Follow-Up Program Price */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              {t('price.follow_up_program.title')}
            </h3>
            <p className="text-gray-700">
              {t('price.follow_up_program.starting.price')} ({t('price.follow_up_program.starting.with_vat')})
            </p>
            <p className="text-gray-700">{t('price.follow_up_program.starting.content')}</p>
          </div>

          {/* Follow-Up Calls Price */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              {t('price.follow_up_calls.title')}
            </h3>
            <h4 className="text-xl font-semibold text-blue-500">
              {t('price.follow_up_calls.options.monthly.frequency')}
            </h4>
            <p className="text-gray-700">
              {t('price.follow_up_calls.options.monthly.price')} ({t('price.follow_up_calls.options.monthly.with_vat')})
            </p>
            <h4 className="text-xl font-semibold text-blue-500">
              {t('price.follow_up_calls.options.three_months.frequency')}
            </h4>
            <p className="text-gray-700">
              {t('price.follow_up_calls.options.three_months.price')} ({t('price.follow_up_calls.options.three_months.with_vat')})
            </p>
          </div>

          {/* Food Safety Training Prices */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              {t('price.training.title')}
            </h3>
            <h4 className="text-xl font-semibold text-blue-500">
              {t('price.training.food_safety.individual.title')}
            </h4>
            <p className="text-gray-700">
              {t('price.training.food_safety.individual.price')}
            </p>
            <h4 className="text-xl font-semibold text-blue-500">
              {t('price.training.food_safety.company.title')}
            </h4>
            <p className="text-gray-700">
              {t('price.training.food_safety.company.price')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PriceDetails;
