import Hero from "@/components/sections/Hero";
import Pains from "@/components/sections/Pains";
import Engagement from "@/components/sections/Engagement";
import AiControl from "@/components/sections/AiControl";
import Hardening from "@/components/sections/Hardening";
import Pricing from "@/components/sections/Pricing";
import Capabilities from "@/components/sections/Capabilities";
import Why from "@/components/sections/Why";
import ContactCta from "@/components/sections/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pains />
      <Engagement />
      <AiControl />
      <Hardening />
      <Pricing />
      <Capabilities />
      <Why />
      <ContactCta />
    </>
  );
}
