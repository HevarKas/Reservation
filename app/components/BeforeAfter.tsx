import beforeService from "~/assets/before-service.png";
import afterService from "~/assets/after-service.png";
import { useTranslation } from "react-i18next";

function BeforeAfter() {
    const { t } = useTranslation();

  return (
    <section className="bg-white py-[100px] px-8 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-blue-600">
            {t("testimonial.before_after.title")}
        </h2>
        <p className="text-lg text-gray-700 mb-12">
            {t("testimonial.before_after.content")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Before Image */}
          <div className="relative">
            <img
              src={beforeService}
              alt="Before the Service"
              className="rounded-lg shadow-lg w-1/2 mx-auto"
            />
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-lg font-bold py-1 px-4 rounded-full">
              {t("testimonial.before_after.before")}
            </p>
          </div>

          {/* After Image */}
          <div className="relative">
            <img
              src={afterService}
              alt="After the Service"
              className="rounded-lg shadow-lg w-1/2 mx-auto"
            />
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-lg font-bold py-1 px-4 rounded-full">
              {t("testimonial.before_after.after")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
