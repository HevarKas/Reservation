import { useTranslation } from 'react-i18next';

interface Service {
  header: string;
  items: string[];
}

const Services= () => {
  const { t } = useTranslation();

  const generalHealth: Service = {
    header: t('safeHealthyBite.services.generalHealth.header'),
    items: t('safeHealthyBite.services.generalHealth.items', { returnObjects: true }) as string[],
  };

  const foodSafety: Service = {
    header: t('safeHealthyBite.services.foodSafety.header'),
    items: t('safeHealthyBite.services.foodSafety.items', { returnObjects: true }) as string[],
  };

  const naturalRemedies: Service = {
    header: t('safeHealthyBite.services.naturalRemedies.header'),
    items: t('safeHealthyBite.services.naturalRemedies.items', { returnObjects: true }) as string[],
  };

  return (
    <section id="services" className="bg-blue-50 py-[100px] lg:py-[150px]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-600">
          {t('safeHealthyBite.services.header')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {/* General Health & Nutrition Consulting */}
        <div className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">{generalHealth.header}</h3>
          <ul className="text-gray-600 flex-grow">
            {generalHealth.items.map((item, index) => (
              <li key={index} className="mb-2">
                - {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Food Safety Consulting */}
        <div className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">{foodSafety.header}</h3>
          <ul className="text-gray-600 flex-grow">
            {foodSafety.items.map((item, index) => (
              <li key={index} className="mb-2">
                - {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Natural Remedies for Health Improvement */}
        <div className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">{naturalRemedies.header}</h3>
          <ul className="text-gray-600 flex-grow">
            {naturalRemedies.items.map((item, index) => (
              <li key={index} className="mb-2">
                - {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
