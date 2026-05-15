import type React from "react";
import Image from "next/image";
import Link from "next/link";
import MetaHead from "components/MetaHead";

type Version = "editorial" | "natural" | "atelier" | "colour" | "ritual";

const appointmentUrl =
  "https://widget2.meetaimy.com/widgetWeb?salonId=MTIzNjkzMA%3D%3D&salonEmail=aW5mb0BtYXJsb2Vzb3RqZXMtaGFhcmF0ZWxpZXIubmw%3D";

const atelierCopy =
  "Haar Atelier Alkmaar is ontstaan vanuit mijn visie en passie voor eerlijke, natuurlijke en duurzame producten. Mijn naam is Marloes. Ik ben ruim 14 jaar kapster en heb in verschillende toonaangevende salons gewerkt in Nederland en Australië. In 2021 heb ik Haar Atelier Alkmaar opgericht op een prachtige locatie, middenin de binnenstad van Alkmaar.";

const colourCopy =
  "Ik ben gespecialiseerd in natuurlijke kleuringen. Sunkissed balayage, Lived in blonde, mooie, zachte highlights, Rich Brunette. Met de ammonia-vrije haarkleuringen van Natulique creëer ik voor jou de mooiste look, met biologische ingrediënten en minder gifstoffen.";

const natuliqueCopy =
  "Ik geloof in de kracht van natuurlijke haarverzorging en kies er bewust voor te werken met de producten van het Deense merk Natulique. De producten zijn biologisch, vrij van siliconen, synthetische geur- en kleurstoffen en kunstmatige toevoegingen.";

type Concept = {
  version: Version;
  label: string;
  eyebrow: string;
  headline: string;
  intro: string;
  statement: string;
  storyTitle: string;
  story: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  navTone: string;
  className: string;
  headlineClass: string;
  buttonClass: string;
  secondaryClass: string;
  sectionClass: string;
  imageClass: string;
};

export const concepts: Record<Version, Concept> = {
  editorial: {
    version: "editorial",
    label: "Editorial warm",
    eyebrow: "Haar Atelier Alkmaar",
    headline: "Jouw reis naar mooi haar begint hier.",
    intro: "Allure-energie met Haar Atelier warmte: groot beeld, directe actie en echte saloncopy als basis.",
    statement: "Gespecialiseerd in kleur, balayage, highlights en natuurlijke looks.",
    storyTitle: "Voor liefde voor haar",
    story: colourCopy,
    imageOne: "/content_deur.jpg",
    imageTwo: "/content_fohnen.jpg",
    imageThree: "/content_voorraad.jpg",
    navTone: "text-[oklch(98%_0.006_75)] mix-blend-difference",
    className: "bg-[#faf1df] text-[#351713]",
    headlineClass: "text-[#74271e]",
    buttonClass: "bg-[#ba7860] text-white",
    secondaryClass: "bg-[#74271e] text-white",
    sectionClass: "bg-[#fff8ed]",
    imageClass: "brightness-[1.04] contrast-[0.94] saturate-[0.9]",
  },
  natural: {
    version: "natural",
    label: "Natural calm",
    eyebrow: "Natural, healthy & sexy hair",
    headline: "Natuurlijk mooi haar in alle rust.",
    intro: "Rustiger, zachter en dichter bij het huidige Haar Atelier: duurzaam, persoonlijk en licht.",
    statement: "Eerlijke, natuurlijke en duurzame producten in het hart van Alkmaar.",
    storyTitle: "Het Haar Atelier",
    story: atelierCopy + " Loop binnen in de salon, of boek je afspraak eenvoudig online. Voel je welkom.",
    imageOne: "/content_raam.jpg",
    imageTwo: "/content_deur.jpg",
    imageThree: "/content_producten.jpg",
    navTone: "text-[#503421]",
    className: "bg-[#fff9f2] text-[#2b2119]",
    headlineClass: "text-[#503421]",
    buttonClass: "bg-[#c0975a] text-white",
    secondaryClass: "border border-[#c0975a] bg-[#fff9f2] text-[#503421]",
    sectionClass: "bg-[#fbe8d4]",
    imageClass: "brightness-[1.08] contrast-[0.9] saturate-[0.8]",
  },
  atelier: {
    version: "atelier",
    label: "Atelier luxe",
    eyebrow: "Warm editorial atelier",
    headline: "Mooi haar, zachte luxe, persoonlijk advies.",
    intro: "Een premium mix: grote typografie, zachte fotografie, persoonlijke Marloes-copy en duidelijke keuzes.",
    statement: "Loop binnen in de salon, of boek je afspraak eenvoudig online. Voel je welkom.",
    storyTitle: "Haar Atelier Alkmaar",
    story: atelierCopy,
    imageOne: "/content_deur.jpg",
    imageTwo: "/content_stoel.jpg",
    imageThree: "/content_producten.jpg",
    navTone: "text-[oklch(98%_0.006_75)] mix-blend-difference",
    className: "bg-[#f8f2e8] text-[#2f1d18]",
    headlineClass: "text-[#6f2a22]",
    buttonClass: "bg-[#b8785f] text-white",
    secondaryClass: "bg-[#efdfc7] text-[#503421]",
    sectionClass: "bg-[#faf1df]",
    imageClass: "brightness-[1.03] contrast-[0.92] saturate-[0.84]",
  },
  colour: {
    version: "colour",
    label: "Colour specialist",
    eyebrow: "Balayage · Highlights · Brunettes",
    headline: "Natuurlijke kleuringen met zacht resultaat.",
    intro: "Een homepage die sterker opent op Marloes' specialisme: sunkissed balayage, lived-in blonde en rijke brunettes.",
    statement: "Sunkissed balayage, lived-in blonde, zachte highlights en rich brunette.",
    storyTitle: "Natural, healthy & sexy hair",
    story: colourCopy,
    imageOne: "/content_fohnen.jpg",
    imageTwo: "/portfolio/IMG_20230918_111432_edit_158602670998714.jpg",
    imageThree: "/portfolio/IMG_20230929-WA0004.jpg",
    navTone: "text-[#fff9f2] mix-blend-difference",
    className: "bg-[#2b1713] text-[#fff9f2]",
    headlineClass: "text-[#faf1df]",
    buttonClass: "bg-[#ba7860] text-white",
    secondaryClass: "border border-[#faf1df] text-[#faf1df]",
    sectionClass: "bg-[#3a211b]",
    imageClass: "brightness-[0.96] contrast-[1.02] saturate-[0.92]",
  },
  ritual: {
    version: "ritual",
    label: "Care ritual",
    eyebrow: "Natulique organic hair care",
    headline: "Gezonde verzorging, mooi haar, elke dag.",
    intro: "Meer webshop- en productgericht, maar nog steeds salon-first: Natulique als natuurlijke verzorgingslijn.",
    statement: "Biologische haarverzorging verkrijgbaar in de salon en de webshop.",
    storyTitle: "Natulique",
    story: natuliqueCopy + " Dat voel je, en dat ruik je. De producten zijn verkrijgbaar in de salon en de webshop.",
    imageOne: "/content_producten.jpg",
    imageTwo: "/content_voorraad.jpg",
    imageThree: "/haa_ps_colourshield.jpg",
    navTone: "text-[#503421]",
    className: "bg-[#fff9f2] text-[#30231b]",
    headlineClass: "text-[#503421]",
    buttonClass: "bg-[#c0975a] text-white",
    secondaryClass: "bg-[#fbe8d4] text-[#503421]",
    sectionClass: "bg-[#fbe8d4]",
    imageClass: "brightness-[1.06] contrast-[0.9] saturate-[0.86]",
  },
};

const routes: Array<{ href: string; label: string; version: Version }> = [
  { href: "/refresh-preview/editorial", label: "Editorial", version: "editorial" },
  { href: "/refresh-preview/natural", label: "Natural", version: "natural" },
  { href: "/refresh-preview/atelier", label: "Atelier", version: "atelier" },
  { href: "/refresh-preview/colour", label: "Colour", version: "colour" },
  { href: "/refresh-preview/ritual", label: "Ritual", version: "ritual" },
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
          <Link key={route.href} href={route.href} className={route.version === concept.version ? "underline underline-offset-4" : ""}>
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
              <Link href={appointmentUrl} className={`px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] ${concept.buttonClass}`}>Afspraak maken</Link>
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
          <Link href={appointmentUrl} className={`px-6 py-5 ${concept.buttonClass}`}>Afspraak maken</Link>
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
        <Image src={concept.imageOne} alt="Haar Atelier Alkmaar" fill className={`object-cover ${concept.imageClass}`} />
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

function ContentPanels({ concept }: { concept: Concept }) {
  return (
    <section className="px-7 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <article>
          <div className="relative mb-8 aspect-[4/5] overflow-hidden">
            <Image src={concept.imageTwo} alt="Natural healthy hair" fill className={`object-cover ${concept.imageClass}`} />
          </div>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] opacity-60">Natural, healthy & sexy hair</p>
          <h2 className={`font-serif text-4xl leading-[0.95] tracking-[-0.035em] ${concept.headlineClass}`}>Natuurlijke kleuringen</h2>
          <p className="mt-5 leading-7 opacity-80">{colourCopy}</p>
          <Link href={appointmentUrl} className={`mt-6 inline-block px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] ${concept.buttonClass}`}>Afspraak maken</Link>
        </article>
        <article>
          <div className="relative mb-8 aspect-[4/5] overflow-hidden">
            <Image src={concept.imageThree} alt="Natulique producten" fill className={`object-cover ${concept.imageClass}`} />
          </div>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] opacity-60">Natulique</p>
          <h2 className={`font-serif text-4xl leading-[0.95] tracking-[-0.035em] ${concept.headlineClass}`}>Biologische haarverzorging</h2>
          <p className="mt-5 leading-7 opacity-80">{natuliqueCopy} De producten zijn verkrijgbaar in de salon en de webshop.</p>
          <Link href="/shop" className={`mt-6 inline-block px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] ${concept.secondaryClass}`}>Naar de shop</Link>
        </article>
        <article>
          <div className="relative mb-8 aspect-[4/5] overflow-hidden">
            <Image src="/content_stoel.jpg" alt="Haar Atelier salonstoel" fill className={`object-cover ${concept.imageClass}`} />
          </div>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] opacity-60">Voel je welkom</p>
          <h2 className={`font-serif text-4xl leading-[0.95] tracking-[-0.035em] ${concept.headlineClass}`}>Binnenstad van Alkmaar</h2>
          <p className="mt-5 leading-7 opacity-80">Loop binnen in de salon, of boek je afspraak eenvoudig online. Haar Atelier zit op een prachtige locatie, middenin de binnenstad van Alkmaar.</p>
          <Link href="/tarieven" className="mt-6 inline-block border border-current px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] opacity-75">Bekijk tarieven</Link>
        </article>
      </div>
    </section>
  );
}

function BookingStrip({ concept }: { concept: Concept }) {
  return (
    <section className={`px-7 py-16 md:px-12 ${concept.sectionClass}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className={`font-serif text-4xl leading-none md:text-6xl ${concept.headlineClass}`}>Klaar voor je volgende afspraak?</p>
        <Link href={appointmentUrl} className={`px-8 py-5 text-center text-sm font-semibold uppercase tracking-[0.2em] ${concept.buttonClass}`}>Afspraak maken</Link>
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
        <ContentPanels concept={concept} />
        <BookingStrip concept={concept} />
      </main>
    </>
  );
}

export function getPreviewLayout(page: React.ReactElement) {
  return page;
}
