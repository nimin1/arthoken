import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import { EngagementModule } from "@/components/sections/Work";
import ContactCta from "@/components/sections/ContactCta";
import { work } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: work.lede,
};

export default function WorkPage() {
  return (
    <>
      <PageHeader label="Work" headline="Problems we are built for." lede={work.ledeLong} />

      <section className="section section--tight">
        <div className="shell">
          {work.items.map((item, i) => (
            <EngagementModule key={item.id} item={item} index={i} />
          ))}
          <p
            style={{
              marginBlockStart: "1.5rem",
              color: "var(--fg-3)",
              fontSize: "0.8125rem",
              maxInlineSize: "62ch",
            }}
          >
            {work.disclosure}
          </p>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
