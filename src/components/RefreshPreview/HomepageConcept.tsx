import type React from "react";
import Image from "next/image";
import Link from "next/link";
import MetaHead from "components/MetaHead";

type Version = "allure" | "haar" | "mix";

type Concept = {
  version: Version;
  label: string;
  eyebrow: string;
  headline: string;
  intro: string;
  statement: string;
  storyTitle: string;
  story: string;
  navTone: string;
  className: string;
  headlineClass: string;
  buttonClass: string;
  secondaryClass: string;
  sectionClass: string;
  imageClass: string;
};

export const concepts: Record<Version, Concept> = {
  allure: {
    version: "allure",
    label: "Allure geïnspireerd",
    eyebrow: "Haar Atelier Alkmaar",
    headline: "Jouw reis naar mooi haar begint hier.",
    intro: "Een uitgesproken, mobiel-first richting met grote beelden, warme terracotta knoppen en editorial typografie.",
    statement: "De salon als eerste indruk: groot, warm en direct boekbaar.",
    storyTitle: "Voor liefde voor haar",
    story: "Deze versie leunt het meest op de Allure-referentie: beeld en headline bepalen de sfeer, daarna volgen simpele keuzes voor afspraak, shop en tarieven.",
    navTone: "text-[oklch(98%_0.006_75)] mix-blend-difference",
    className: "bg-[oklch(96%_0.012_62)] text-[oklch(24%_0.045_35)]",
    headlineClass: "text-[oklch(37%_0.11_28)]",
    buttonClass: "bg-[oklch(62%_0.12_38)] text-[oklch(98%_0.008_62)]",
    secondaryClass: "bg-[oklch(62%_0.12_38)] text-[oklch(98%_0.008_62)]",
    sectionClass: "bg-[oklch(98%_0.006_70)]",
    imageClass: "brightness-[1.04] contrast-[0.94] saturate-[0.92]",
  },
  haar: {
    version: "haar",
    label: "Haar-native",
    eyebrow: "Natural, healthy & sexy hair",
    headline: "Natuurlijk mooi haar in alle rust.",
    intro: "Een zachtere richting die dichter bij de huidige Haar-identiteit blijft: premium, licht, rustig en persoonlijk.",
    statement: "Rustige luxe, natuurlijke verzorging en aandacht voor jou.",
    storyTitle: "Het Haar Atelier",
    story: "Deze versie houdt de bestaande warmte vast en maakt de homepage vooral helderder: afspraak maken blijft primair, de shop is aanwezig maar minder dominant.",
    navTone: "text-[oklch(20%_0.02_52)]",
    className: "bg-[oklch(97%_0.01_75)] text-[oklch(19%_0.018_52)]",
    headlineClass: "text-[oklch(20%_0.02_52)]",
    buttonClass: "bg-[oklch(66%_0.08_72)] text-[oklch(98%_0.006_75)]",
    secondaryClass: "border border-[oklch(70%_0.05_72)] bg-[oklch(98%_0.006_75)] text-[oklch(24%_0.025_52)]",
    sectionClass: "bg-[oklch(94%_0.018_78)]",
    imageClass: "brightness-[1.08] contrast-[0.9] saturate-[0.8]",
  },
  mix: {
    version: "mix",
    label: "Mix",
    eyebrow: "Warm editorial atelier",
    headline: "Mooi haar, zachte luxe, persoonlijk advies.",
    intro: "Een brug tussen Allure en Haar: grote typografie en sterk beeld, maar zachter, persoonlijker en minder hard.",
    statement: "Een warm ateliergevoel met duidelijke keuzes: boeken of shoppen.",
    storyTitle: "Zachte luxe voor dagelijks mooi haar",
    story: "Deze richting gebruikt de energie van de referentie, maar laat Haar Atelier rustiger en lokaler aanvoelen. Waarschijnlijk de veiligste basis om verder te verfijnen.",
    navTone: "text-[oklch(98%_0.006_75)] mix-blend-difference",
    className: "bg-[oklch(96%_0.014_66)] text-[oklch(21%_0.025_45)]",
    headlineClass: "text-[oklch(31%_0.07_32)]",
    buttonClass: "bg-[oklch(60%_0.10_42)] text-[oklch(98%_0.007_66)]",
    secondaryClass: "bg-[oklch(91%_0.025_66)] text-[oklch(28%_0.035_42)]",
    sectionClass: "bg-[oklch(92%_0.022_62)]",
    imageClass: "brightness-[1.02] contrast-[0.92] saturate-[0.86]",
  },
};

const routes: Array<{ href: string; label: string }> = [
  { href: "/refresh-preview/allure", label: "Allure" },
  { href: "/refresh-preview/haar", label: "Haar" },
  { href: "/refresh-preview/mix", label: "Mix" },
];

function PreviewShell({ concept }: { concept: Concept }) {
  return (
    <header className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-10 ${concept.navTone}`}>
      <Link href="/refresh-preview" className="font-serif text-xl leading-none tracking-[0.18em] md:text-3xl">
        HAAR ATELIER
        <span className="block text-center text-[0.55em] tracking-[0.28em]">ALKMAAR</span>
      </Link>
      <nav className="flex gap-4 text-xs uppercase tracking-[0.18em] md:gap-7">
        {routes.map((route) => (
          <Link key={route.href} href={route.href} className={route.label.toLowerCase() === concept.version ? "underline underline-offset-4" : ""}>
            {route.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function Hero({ concept }: { concept: Concept }) {
  return (
    <section className="min-h-screen">
      <div className="grid min-h-screen md:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[58vh] overflow-hidden md:min-h-screen">
          <Image src="/Salon_large.jpg" alt="Haar Atelier Alkmaar salon" fill priority className={`object-cover ${concept.imageClass}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(18%_0.025_45/.12)] via-transparent to-[oklch(18%_0.025_45/.24)]" />
        </div>
        <div className="flex min-h-[42vh] flex-col justify-between px-7 py-12 pt-16 md:min-h-screen md:px-12 md:py-16 lg:px-16">
          <div className="hidden justify-end md:flex">
            <span className="rounded-full border border-current px-4 py-2 text-xs uppercase tracking-[0.2em] opacity-70">Preview · {concept.label}</span>
          </div>
          <div className="max-w-3xl md:my-auto">
            <p className="mb-5 text-xs uppercase tracking-[0.34em] opacity-70">{concept.eyebrow}</p>
            <h1 className={`font-serif text-[clamp(4rem,17vw,8.5rem)] leading-[0.86] tracking-[-0.065em] md:text-[clamp(5.5rem,8vw,10rem)] ${concept.headlineClass}`}>
              {concept.headline}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 opacity-80 md:text-lg md:leading-8">{concept.intro}</p>
            <div className="mt-9 grid gap-4 sm:max-w-xl sm:grid-cols-2">
              <a href="tel:+31651126003" className={`px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] ${concept.buttonClass}`}>Afspraak maken</a>
              <Link href="/shop" className={`px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] ${concept.secondaryClass}`}>Shop haarverzorging</Link>
            </div>
          </div>
          <div className="mt-10 flex items-end justify-between gap-8 text-xs uppercase tracking-[0.18em] opacity-65">
            <span>{concept.label}</span>
            <span>Mobiel eerst</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuBlock({ concept }: { concept: Concept }) {
  return (
    <section className={`px-7 py-20 md:px-12 md:py-28 ${concept.sectionClass}`}>
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <p className={`font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl ${concept.headlineClass}`}>{concept.statement}</p>
        <div className="grid gap-4 text-center text-sm font-semibold uppercase tracking-[0.18em] md:grid-cols-2">
          <a href="tel:+31651126003" className={`px-6 py-5 ${concept.buttonClass}`}>Afspraak maken</a>
          <Link href="/shop" className={`px-6 py-5 ${concept.secondaryClass}`}>Shop haarverzorging</Link>
          <Link href="/tarieven" className="border border-current px-6 py-5 opacity-75">Tarieven</Link>
          <a href="tel:+31651126003" className="border border-current px-6 py-5 opacity-75">Contact</a>
        </div>
      </div>
    </section>
  );
}

function StorySection({ concept }: { concept: Concept }) {
  return (
    <section className="grid md:grid-cols-2">
      <div className="relative min-h-[520px] md:min-h-[760px]">
        <Image src="/Salon.jpg" alt="Haar Atelier detail" fill className={`object-cover ${concept.imageClass}`} />
      </div>
      <div className="flex items-center px-7 py-20 md:px-16">
        <div className="max-w-xl">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] opacity-60">{concept.label}</p>
          <h2 className={`font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl ${concept.headlineClass}`}>{concept.storyTitle}</h2>
          <p className="mt-8 text-lg leading-8 opacity-80">{concept.story}</p>
        </div>
      </div>
    </section>
  );
}

function BookingStrip({ concept }: { concept: Concept }) {
  return (
    <section className={`px-7 py-16 md:px-12 ${concept.sectionClass}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className={`font-serif text-4xl leading-none md:text-6xl ${concept.headlineClass}`}>Klaar voor je volgende afspraak?</p>
        <a href="tel:+31651126003" className={`px-8 py-5 text-center text-sm font-semibold uppercase tracking-[0.2em] ${concept.buttonClass}`}>Bel Haar Atelier</a>
      </div>
    </section>
  );
}

export function HomepageConcept({ version }: { version: Version }) {
  const concept = concepts[version];

  return (
    <>
      <MetaHead title={`Refresh preview · ${concept.label}`} description={`Haar Atelier ${concept.label} homepage concept`} />
      <PreviewShell concept={concept} />
      <main className={concept.className}>
        <Hero concept={concept} />
        <MenuBlock concept={concept} />
        <StorySection concept={concept} />
        <BookingStrip concept={concept} />
      </main>
    </>
  );
}

export function getPreviewLayout(page: React.ReactElement) {
  return page;
}
