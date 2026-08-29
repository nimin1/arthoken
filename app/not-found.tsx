import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section" style={{ paddingBlockStart: "clamp(9rem, 20vh, 14rem)" }}>
      <div className="shell">
        <p className="eyebrow">
          <span className="label">404</span>
        </p>
        <h1 className="display-2" style={{ maxInlineSize: "18ch" }}>
          That page doesn&rsquo;t exist.
        </h1>
        <p className="lede" style={{ marginBlockStart: "1.5rem" }}>
          The link may be out of date, or the page may not be published yet.
        </p>
        <div style={{ marginBlockStart: "2.5rem" }}>
          <Button href="/">Back to the homepage</Button>
        </div>
      </div>
    </section>
  );
}
