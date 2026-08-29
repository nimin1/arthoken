import Hero from "@/components/sections/Hero";
import Offer from "@/components/sections/Offer";
import Pains from "@/components/sections/Pains";
import Engagement from "@/components/sections/Engagement";
import Imagine from "@/components/sections/Imagine";
import AiControl from "@/components/sections/AiControl";
import Capabilities from "@/components/sections/Capabilities";
import Pricing from "@/components/sections/Pricing";
import Why from "@/components/sections/Why";
import ContactCta from "@/components/sections/ContactCta";

/**
 * The order is an argument, not a list of topics:
 *   the promise → the offer → is this you? → how it runs →
 *   how we think → where AI sits → what we build → what it costs →
 *   who you're dealing with → come and talk.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Offer />
      <Pains />
      <Engagement />
      <Imagine />
      <AiControl />
      <Capabilities />
      <Pricing />
      <Why />
      <ContactCta />
    </>
  );
}
