import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import Philosophy from "@/components/sections/Philosophy";
import Talent from "@/components/sections/Talent";
import ContactCta from "@/components/sections/ContactCta";
import { site } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Arthoken is an engineering company. Small senior teams, deep software foundations, and AI applied where it changes an outcome.",
};

const statements = [
  {
    label: "The name",
    body: "Artha means purpose and value. A token is the smallest unit modern intelligence is built from. Arthoken sits where the two meet, building systems that carry meaning rather than whatever happens to be fashionable.",
  },
  {
    label: "What we are",
    body: "An engineering company first. We take on difficult technology and business problems and stay accountable for the result, rather than supplying capacity and leaving the hard decisions with you.",
  },
  {
    label: "How we sell",
    body: "We don\u2019t pitch. We ask what has to change, then go and build a version of it so you can see whether we understood you. You pay when you decide you want it built properly, and not before.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        label="Company"
        headline="Built with meaning."
        lede={site.description}
      />

      <section className="section section--tight">
        <div className="shell grid12">
          {statements.map((s, i) => (
            <div
              key={s.label}
              className={styles.statement}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <p className="label">{s.label}</p>
              <p className={styles.body}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Philosophy />
      <Talent />
      <ContactCta />
    </>
  );
}
