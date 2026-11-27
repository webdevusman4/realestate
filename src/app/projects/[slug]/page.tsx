import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MapPin, Phone } from "lucide-react";
import Shell from "@/components/Shell";
import { PageHero } from "@/components/PageParts";
import { SampleTag } from "@/components/Sections";
import { WhatsAppLogo } from "@/components/icons";
import { PROJECTS, projectBySlug, projectHref } from "@/lib/company";
import { SITE, waLink } from "@/lib/site";
import s from "@/components/site.module.css";

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
  return { title: `${p.name}: ${p.status.toLowerCase()} ${p.type.toLowerCase()} project`, description: `${p.summary} By ${SITE.name}.` };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p || p.href) notFound();
  const others = PROJECTS.filter((o) => o.slug !== p.slug).slice(0, 3);
  const upcoming = p.status === "Upcoming";

  return (
    <Shell>
      <PageHero
        image={p.image}
        imagePos={p.pos}
        eyebrow={`${p.status} · ${p.type}`}
        title={p.name}
        text={p.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: p.name }]}
      />

      <section className={s.sec}>
        <div className={`${s.wrap} ${s.projGrid}`}>
          <div data-r>
            <p className={s.eyebrow}>Project facts</p>
            <h2 className={s.h2}>{upcoming ? "Coming soon." : "At a glance."}</h2>
            {p.sample && (
              <p className={s.sampleNote}>
                <SampleTag /> The details on this page are placeholders until the company sends the real ones.
              </p>
            )}
            <dl className={s.facts}>
              <div>
                <dt>Status</dt>
                <dd>{p.status}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{p.type}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>
                  <MapPin size={15} aria-hidden="true" /> {p.location}
                </dd>
              </div>
              <div>
                <dt>{upcoming ? "Launch" : "Year"}</dt>
                <dd>{p.year}</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>{p.size}</dd>
              </div>
            </dl>
          </div>
          <div data-r>
            <p className={s.eyebrow}>Highlights</p>
            <ul className={s.checks}>
              {p.highlights.map((h) => (
                <li key={h}>
                  <span className={s.checkIcon}>
                    <Check size={16} strokeWidth={2.8} aria-hidden="true" />
                  </span>
                  <span>
                    <b>{h}</b>
                  </span>
                </li>
              ))}
            </ul>
            <div className={s.ctaRow}>
              <a className={`${s.btn} ${s.btnDark}`} href={SITE.phoneHref}>
                <Phone size={18} aria-hidden="true" />
                Call {SITE.phone}
              </a>
              <a className={`${s.btn} ${s.btnGhostDark}`} href={waLink(SITE.whatsappHref, `Hello, I would like to know more about ${p.name}.`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppLogo size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {p.gallery.length > 0 && (
        <section className={`${s.sec} ${s.secTint}`}>
          <div className={s.wrap}>
            <div className={s.secHead} data-r>
              <div>
                <p className={s.eyebrow}>Gallery</p>
                <h2 className={s.h2}>Photos.</h2>
              </div>
              <p className={s.body}>Representative stock photos for now. Real project photos will replace them.</p>
            </div>
            <ul className={s.gallery}>
              {p.gallery.map((g) => (
                <li key={g.src} data-r>
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={`${s.sec} ${s.secDark}`}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={`${s.eyebrow} ${s.eyebrowDark}`}>More projects</p>
              <h2 className={s.h2}>See our other work.</h2>
            </div>
            <Link className={s.textLink} href="/projects">
              <ArrowLeft size={18} aria-hidden="true" />
              All projects
            </Link>
          </div>
          <ul className={s.otherTypes}>
            {others.map((o) => (
              <li key={o.slug} data-r>
                <Link href={projectHref(o)}>
                  <span>
                    <b>{o.name}</b>
                    {o.status} · {o.location}
                  </span>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}
