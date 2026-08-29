import Hero from "@/components/sections/Hero";
import Offer from "@/components/sections/Offer";
import Pains from "@/components/sections/Pains";
import Engagement from "@/components/sections/Engagement";
import Craft from "@/components/sections/Craft";
import Outcomes from "@/components/sections/Outcomes";
import Capabilities from "@/components/sections/Capabilities";
import Pricing from "@/components/sections/Pricing";
import Why from "@/components/sections/Why";
import ContactCta from "@/components/sections/ContactCta";

/**
 * The order is an argument, not a list of topics:
 *   the promise → the offer → is this you? → how it runs →
 *   how the work gets done → what we build → what it costs →
 *   how we are set up → what we measure → come and talk.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Offer />
      <Pains />
      <Engagement />
      <Craft />
      <Capabilities />
      <Pricing />
      <Why />
      <Outcomes />
      <ContactCta />
    </>
  );
}
