import Pusher from "pusher-js";

interface IntroProps {
  introduction: IntroItem[];
}

interface IntroItem {
  title: string;
  desc: string;
  image: string;
}

interface WhyCurranteProps {
  whyCurrante: WhyCurranteItem[];
}

interface WhyCurranteItem {
  title: string;
  desc: string;
  image: string;
}

interface FaqItem {
  id: string;
  title: string;
  content: string;
}

interface ServiceItem {
  order: number;
  service: string;
  description: string;
  image: string;
}

declare global {
  interface Window {
    Pusher: any;
  }
}
