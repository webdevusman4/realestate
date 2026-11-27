import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoShell from "@/components/co/Shell";
import CoForm from "@/components/co/Form";
import { PageHead, SectionHead, Tag } from "@/components/co/Parts";
import { FinalCta, RelatedProjects } from "@/components/co/Sections";
import { pageMeta } from "@/lib/seo";
import s from "@/components/co/co.module.css";
import { IMAGE_MAP, PROJECTS, projectBySlug } from "@/lib/company";
import { SITE, waLink } from "@/lib/site";

type Params = { slug: string };
export const dynamicParams = false;

/** Projects with their own site (Ali's Twin Tower) live elsewhere; every other project gets a page here. */
export function generateStaticParams(): Params[] {
  return PROJECTS.filter((p) => !p.href).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.name}: ${p.status.toLowerCase()} ${p.type.toLowerCase()} project`,
    description: `${p.summary} By ${SITE.name}.`,
    path: `/projects/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p || p.href) notFound();

  const media = IMAGE_MAP[p.slug];
  const bannerSrc = media?.banner ?? p.image;
  const bannerAlt = media?.bannerAlt ?? p.alt;
  const bannerPos = media?.bannerPos ?? p.pos ?? "50% 50%";
  const gallery = media?.gallery?.length ? media.gallery : p.gallery;

  return (
    <CoShell>
      {/* 1. Page head + 21:9 banner */}
      <PageHead
        path={`/projects/${p.slug}`}
        title={p.name}
        text={p.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: p.name }]}
      />
      <div className={s.banner}>
        <Image src={bannerSrc} alt={bannerAlt} fill priority sizes="100vw" style={{ objectPosition: bannerPos }} />
        <span className={s.repCap}>Representative image</span>
      </div>

      {/* 2 & 3. Facts table + Highlights */}
      <section className={s.sec}>
        <div className={`${s.wrap} ${s.cols2}`}>
          <div>
            <p className={s.label}>Project facts</p>
            {p.sample && (
              <p className={s.note}>
                <Tag /> The details on this page are placeholders until the company sends the real ones.
              </p>
            )}
            <dl className={s.details}>
              {[
                ["Status", p.status],
                ["Type", p.type],
                ["Location", p.location],
                [p.status === "Upcoming" ? "Launch" : "Year", p.year],
                ["Size", p.size],
                ["Developer", SITE.name],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className={s.label}>Highlights</p>
            <ul className={s.checks} style={{ marginTop: 18 }}>
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className={s.row} style={{ marginTop: 28 }}>
              <a className={s.btn} href={SITE.phoneHref}>
                Call {SITE.phone}
              </a>
              <a
                className={`${s.btn} ${s.btnLine}`}
                href={waLink(SITE.whatsappHref, `Hello, I would like to know more about ${p.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Gallery: 3 images, 4:3, Representative photo caption */}
      {gallery.length > 0 && (
        <section className={`${s.sec} ${s.onIvory2}`}>
          <div className={s.wrap}>
            <SectionHead label="Gallery" title="Representative photos." short />
            <ul className={s.gallery}>
              {gallery.map((g) => (
                <li key={g.src}>
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  <span className={s.repCap}>Representative photo</span>
                </li>
              ))}
            </ul>
            <p className={s.note}>Representative photos for now. Real project photos will replace them.</p>
          </div>
        </section>
      )}

      {/* 5, 6 & 7. Location + Payment + Enquiry form */}
      <section className={`${s.sec} ${s.onIvory}`}>
        <div className={`${s.wrap} ${s.cols2}`}>
          <div>
            <p className={s.label}>Location and payment</p>
            <dl className={s.details}>
              <div>
                <dt>Location</dt>
                <dd>
                  {p.location}
                  {p.sample && (
                    <>
                      {" (exact address to follow) "}
                      <Tag>Sample location</Tag>
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt>Payment plan</dt>
                <dd>{p.status === "Upcoming" ? "Announced at launch." : "Payment plan: ask the booking office."}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>
                  {SITE.address.replace(/^Booking office:\s*/, "")}, open {SITE.hours}
                </dd>
              </div>
            </dl>
            <div className={s.row}>
              <Link className={s.actionLink} href="/payment-plans">
                See payment plans
              </Link>
              <Link className={s.actionLink} href="/buying-guide">
                Read the buying guide
              </Link>
            </div>
          </div>
          <CoForm
            title={p.status === "Upcoming" ? `Register interest in ${p.name}` : `Ask about ${p.name}`}
            source={`Company site: ${p.name}`}
            project={p.name}
            visit={p.status !== "Upcoming"}
          />
        </div>
      </section>

      {/* 8. Related projects */}
      <section className={`${s.sec} ${s.onIvory2}`}>
        <div className={s.wrap}>
          <SectionHead label="More projects" title="See our other work." short />
          <RelatedProjects current={p} />
        </div>
      </section>

      {/* 9. Final CTA */}
      <FinalCta />
    </CoShell>
  );
}
