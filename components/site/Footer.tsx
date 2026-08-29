import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import styles from "./Footer.module.css";

const contactLinks = [
  { label: "Start a conversation", href: "/contact" },
  { label: site.email, href: `mailto:${site.email}` },
];

export default function Footer() {
  return (
    <footer className={styles.footer} data-panel="dark">
      <div className="shell grid12">
        <div className={styles.brand}>
          <Link href="/" className={styles.lockup} aria-label={`${site.name}, home`}>
            <Image
              className={styles.mark}
              src="/brand/mark.png"
              alt=""
              width={320}
              height={373}
              sizes="34px"
            />
            <Image
              className={styles.wordmark}
              src="/brand/wordmark-paper.png"
              alt={site.name}
              width={640}
              height={100}
              sizes="130px"
            />
          </Link>
          <p className={`label ${styles.tagline}`}>{site.tagline}</p>
          <p className={styles.descriptor}>{site.descriptor}.</p>
        </div>

        <div className={styles.cols}>
          <nav aria-label="Footer">
            <p className={`label ${styles.colHead}`}>Site</p>
            <div className={styles.links}>
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <p className={`label ${styles.colHead}`}>Contact</p>
            <div className={styles.links}>
              {contactLinks.map((item) => (
                <Link key={item.href} href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.base}>
          <span className="label">
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="label">Engineering what comes next</span>
        </div>
      </div>
    </footer>
  );
}
