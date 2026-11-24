import Header from "./Header";
import Reveal from "./Reveal";
import { Footer, MobileBar } from "./Sections";

/** Common frame for inner pages: header, main landmark, footer, mobile bar and scroll reveal. */
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileBar />
      <Reveal />
    </>
  );
}
