import Hero from "@/components/sections/Hero";
import Pains from "@/components/sections/Pains";
import Engagement from "@/components/sections/Engagement";
import Why from "@/components/sections/Why";
import Pricing from "@/components/sections/Pricing";
import Capabilities from "@/components/sections/Capabilities";
import ContactCta from "@/components/sections/ContactCta";

/**
 * Seven sections, and every one of them answers a question a buyer has
 * to answer before they email:
 *   what do you do → is this me → how does it run → why you →
 *   what does it cost → what do you build → let's talk.
 *
 * Anything a reader only wants in a second meeting lives on an inner
 * page: how the work gets done on /capabilities, what we measure on
 * /work, the terms of engagement on /contact.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Pains />
      <Engagement />
      <Why />
      <Pricing terms={false} />
      <Capabilities compact />
      <ContactCta />
    </>
  );
}
