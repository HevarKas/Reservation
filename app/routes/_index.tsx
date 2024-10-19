import Navbar from "~/components/Navbar";
import About from "~/components/About";
import Services from "~/components/Services";
import ContactUs from "~/components/ContactUs";
import { Element } from "react-scroll";
import MoreInformation from "~/components/MoreInformation";
import PriceDetails from "~/components/PriceDetails";
import Title from "~/components/Title";
import VideoPlayer from "~/components/VideoPlayer";
import TestimonialSlider from "~/components/TestimonialSlider";
import { useTranslation } from "react-i18next";
import ImageSlider from "~/components/ImageSlider";

export default function Reservations() {
  const { t } = useTranslation();

  const title = t("navbar.title").toLowerCase().replace(" ", "")
  const about = t("navbar.about").toLowerCase().replace(" ", "")
  const service = t("navbar.service").toLowerCase().replace(" ", "")
  const information = t("navbar.information").toLowerCase().replace(" ", "")
  const testimonial = t("navbar.testimonial").toLowerCase().replace(" ", "")
  const contact = t("navbar.contact").toLowerCase().replace(" ", "")
  const price = t("navbar.price").toLowerCase().replace(" ", "")

  return (
    <article className="text-gray-700">
      <Navbar />

      <ImageSlider />

      <Element name={title}>
        <Title />
      </Element>

      <Element name={about}>
        <About />
      </Element>

      <Element name={service}>
        <Services />
      </Element>

      <Element name={information}>
        <MoreInformation />
      </Element>

      <Element name={testimonial}>
        <VideoPlayer />

        <TestimonialSlider />
      </Element>

      <Element name={contact}>
        <ContactUs />
      </Element>

      <Element name={price}>
        <PriceDetails />
      </Element>
    </article>
  );
}
