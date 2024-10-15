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

export default function Reservations() {
  return (
    <article className="text-gray-700">
      <Navbar />

      <Element name="title">
        <Title />
      </Element>

      <Element name="about">
        <About />
      </Element>

      <Element name="service">
        <Services />
      </Element>

      <Element name="information">
        <MoreInformation />
      </Element>

      <Element name="testimonial">
        <VideoPlayer />

        <TestimonialSlider />
      </Element>

      <Element name="contact">
        <ContactUs />
      </Element>

      <Element name="price">
        <PriceDetails />
      </Element>
    </article>
  );
}
