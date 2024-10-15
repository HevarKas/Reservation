import { useTranslation } from 'react-i18next';

function MoreInformation() {
  const { t } = useTranslation();

  return (
    <section className="py-[100px] lg:py-[150px]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">
          {t('safeHealthyBite.whyChooseUs.header')}
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          {t('safeHealthyBite.whyChooseUs.content')}
        </p>

        <h2 className="text-4xl font-bold text-blue-600 mb-6">
          {t('safeHealthyBite.callToAction.header')}
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          {t('safeHealthyBite.callToAction.content')}
        </p>
      </div>
    </section>
  );
}

export default MoreInformation;
