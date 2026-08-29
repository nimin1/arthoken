import Hero from "@/components/sections/Hero";
import Pains from "@/components/sections/Pains";
import Imagine from "@/components/sections/Imagine";
import Engagement from "@/components/sections/Engagement";
import AiControl from "@/components/sections/AiControl";
import Capabilities from "@/components/sections/Capabilities";
import Pricing from "@/components/sections/Pricing";
import Why from "@/components/sections/Why";
import ContactCta from "@/components/sections/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pains />
      <Imagine />
      <Engagement />
      <AiControl />
      <Capabilities />
      <Pricing />
      <Why />
      <ContactCta />
    </>
  );
}
