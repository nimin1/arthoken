/**
 * Remounts on every navigation, which is what makes the incoming page
 * animate. The header and footer live in the layout, so they stay put
 * while the content changes underneath them.
 *
 * No link interception: navigation still goes through Next's router
 * untouched, so modifier-clicks, middle-clicks and prefetching all
 * behave exactly as they did.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
