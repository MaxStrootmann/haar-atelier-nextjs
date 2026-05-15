import Link from "next/link";
import { concepts, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";
import MetaHead from "components/MetaHead";

const cards = [
  { href: "/refresh-preview/allure", concept: concepts.allure },
  { href: "/refresh-preview/haar", concept: concepts.haar },
  { href: "/refresh-preview/mix", concept: concepts.mix },
];

export default function RefreshPreviewIndex() {
  return (
    <>
      <MetaHead title="Refresh preview" description="Haar Atelier homepage concepts" />
      <main className="min-h-screen bg-[oklch(96%_0.012_62)] px-6 py-16 text-[oklch(21%_0.025_45)] md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">Haar Atelier refresh</p>
          <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[0.9] tracking-[-0.055em] text-[oklch(31%_0.07_32)] md:text-8xl">
            Drie homepage richtingen om los te beoordelen.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 opacity-75">
            Elke route is een kleine homepage-prototype met dezelfde tijdelijke salonfoto, Nederlandse copy en afspraak maken als primaire actie.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {cards.map(({ href, concept }) => (
              <Link key={href} href={href} className="group flex min-h-80 flex-col justify-between bg-[oklch(98%_0.006_70)] p-6 transition hover:-translate-y-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] opacity-60">{concept.label}</p>
                  <h2 className={`mt-5 font-serif text-5xl leading-[0.92] tracking-[-0.045em] ${concept.headlineClass}`}>{concept.headline}</h2>
                </div>
                <span className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100">Bekijk versie →</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

RefreshPreviewIndex.getLayout = getPreviewLayout;
