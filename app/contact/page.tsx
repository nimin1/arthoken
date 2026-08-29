import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import ContactForm from "@/components/site/ContactForm";
import TextLink from "@/components/ui/TextLink";
import { site } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Start a conversation",
  description:
    "Tell us about the problem. We will tell you honestly whether Arthoken is the right firm for it.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        headline="Tell us what the problem is."
        lede="One conversation, then we go and build something you can click. Nothing is invoiced until you have seen it work."
      />

      <section className="section section--tight">
        <div className="shell grid12">
          <div className={styles.formWrap}>
            <ContactForm />
          </div>

          <aside className={styles.aside}>
            <div className={styles.asideBlock}>
              <p className="label">Direct</p>
              <p className={styles.asideBody}>
                <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
              </p>
            </div>
            <div className={styles.asideBlock}>
              <p className="label">What helps</p>
              <p className={styles.asideBody}>
                The outcome you need, the constraint you keep hitting, and what has already been
                tried. Detail is welcome; a paragraph is enough to start.
              </p>
            </div>
            <div className={styles.asideBlock}>
              <p className="label">What happens next</p>
              <p className={styles.asideBody}>
                A short conversation with an engineer, not a salesperson. If the problem is not
                ours to solve, we will say so and point you somewhere better.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
