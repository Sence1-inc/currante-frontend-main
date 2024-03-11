import plumber1 from "/images/img_services_plumbing_1.jpg";
import plumber2 from "/images/img_services_plumbing_2.jpg";
import carpenter1 from "/images/img_services_carpentry_1.jpg";
import carpenter2 from "/images/img_services_carpentry_2.jpg";
import cleaner1 from "/images/img_services_cleaning_1.jpg";
import cleaner2 from "/images/img_services_cleaning_2.jpg";

export const SERVICES: ServiceItem[] = [
  {
    order: 1,
    service: "plumber",
    description:
      "Dealing with plumbing issues? Have peace of mind and a seamlessly operating home. Book an inspection now!",
    image: plumber1,
  },
  {
    order: 3,
    service: "plumber",
    description:
      "From simple leak repairs to fixture installations, trust us to handle all your plumbing needs with expertise and care.",
    image: plumber2,
  },
  {
    order: 4,
    service: "carpenter",
    description:
      "Planning a major home project? Schedule your inspection today for expert carpentry assistance.",
    image: carpenter1,
  },
  {
    order: 5,
    service: "carpenter",
    description:
      "Unlock the potential of your space! Experience top-notch carpentry solutions tailored to your short-term goals.",
    image: carpenter2,
  },
  {
    order: 6,
    service: "cleaner",
    description:
      "Finishing touches matter! Elevate your space with our swift and expert post-construction cleaning services.",
    image: cleaner1,
  },
  {
    order: 7,
    service: "cleaner",
    description:
      "Refresh your space in a flash! Experience the sparkle with our efficient general cleaning services.",
    image: cleaner2,
  },
];
