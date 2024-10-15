import { useTranslation } from "react-i18next";

function Title() {
    const { t } = useTranslation("");

    return (
      <section className="bg-blue-50 pt-[150px] pb-[100px] px-8 text-center">
        <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-8">
            {t("companyName")}
        </div>
        <div className="text-xl md:text-2xl text-gray-700 mb-8 uppercase tracking-wide">
            {t("services.foodSafety")} | {t("services.nutritionAdvisory")}
        </div>
        <div className="text-lg md:text-xl text-blue-500 italic mb-10">
            {t("slogan")}
        </div>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t("description")}
        </p>
      </section>
    );
  }
  
  export default Title;
  