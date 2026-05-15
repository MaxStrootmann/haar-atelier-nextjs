import Image from "next/image";
import Link from "next/link";
import MetaHead from "components/MetaHead";

const versions = [
  {
    id: "allure",
    label: "Versie 1 · Allure geïnspireerd",
    eyebrow: "Haar Atelier Alkmaar",
    headline: "Jouw reis naar mooi haar begint hier.",
    note: "Groot, uitgesproken en mobiel-first. Terracotta knoppen, editorial serif en directe acties zoals in de referentie.",
    className: "bg-[oklch(96%_0.012_62)] text-[oklch(24%_0.045_35)]",
    headlineClass: "text-[oklch(37%_0.11_28)]",
    buttonClass: "bg-[oklch(62%_0.12_38)] text-[oklch(98%_0.008_62)]",
    secondaryClass: "bg-[oklch(62%_0.12_38)] text-[oklch(98%_0.008_62)]",
    imageClass: "brightness-[1.04] contrast-[0.94] saturate-[0.92]",
  },
  {
    id: "haar",
    label: "Versie 2 · Haar-native",
    eyebrow: "Natural, healthy & sexy hair",
    headline: "Natuurlijk mooi haar in alle rust.",
    note: "Dichter bij de huidige identiteit: zachter, rustiger, lichter. Afspraak maken blijft primair, shop subtieler.",
    className: "bg-[oklch(97%_0.01_75)] text-[oklch(19%_0.018_52)]",
    headlineClass: "text-[oklch(20%_0.02_52)]",
    buttonClass: "bg-[oklch(66%_0.08_72)] text-[oklch(98%_0.006_75)]",
    secondaryClass: "border border-[oklch(70%_0.05_72)] bg-[oklch(98%_0.006_75)] text-[oklch(24%_0.025_52)]",
    imageClass: "brightness-[1.08] contrast-[0.9] saturate-[0.8]",
  },
  {
    id: "mix",
    label: "Versie 3 · Mix",
    eyebrow: "Warm editorial atelier",
    headline: "Mooi haar, zachte luxe, persoonlijk advies.",
    note: "Allure-energie met Haar-zachtheid: grote typografie en beeld, maar minder hard dan de referentie.",
    className: "bg-[oklch(96%_0.014_66)] text-[oklch(21%_0.025_45)]",
    headlineClass: "text-[oklch(31%_0.07_32)]",
    buttonClass: "bg-[oklch(60%_0.10_42)] text-[oklch(98%_0.007_66)]",
    secondaryClass: "bg-[oklch(91%_0.025_66)] text-[oklch(28%_0.035_42)]",
    imageClass: "brightness-[1.02] contrast-[0.92] saturate-[0.86]",
  },
];

function PreviewHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 text-[oklch(98%_0.006_75)] mix-blend-difference md:px-10">
      <Link href="/" className="font-serif text-xl leading-none tracking-[0.18em] md:text-3xl">
        HAAR ATELIER
        <span className="block text-center text-[0.55em] tracking-[0.28em]">ALKMAAR</span>
      </Link>
      <nav className="flex gap-5 text-xs uppercase tracking-[0.2em] md:gap-8">
        <a href="#allure">V1</a>
        <a href="#haar">V2</a>
        <a href="#mix">V3</a>
      </nav>
    </header>
  );
}

function HeroVersion({ version }: { version: (typeof versions)[number] }) {
  return (
    <section id={version.id} className={`min-h-screen ${version.className}`}>
      <div className="grid min-h-screen md:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[58vh] overflow-hidden md:min-h-screen">
          <Image
            src="/Salon_large.jpg"
            alt="Haar Atelier Alkmaar salon"
            fill
            priority={version.id === "allure"}
            className={`object-cover ${version.imageClass}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(18%_0.025_45/.18)] via-transparent to-[oklch(18%_0.025_45/.28)]" />
        </div>

        <div className="flex min-h-[42vh] flex-col justify-between px-7 py-12 pt-16 md:min-h-screen md:px-12 md:py-16 lg:px-16">
          <div className="hidden justify-end md:flex">
            <span className="rounded-full border border-current px-4 py-2 text-xs uppercase tracking-[0.2em] opacity-70">
              Preview · niet productie
            </span>
          </div>

          <div className="max-w-3xl md:my-auto">
            <p className="mb-5 text-xs uppercase tracking-[0.34em] opacity-70">{version.eyebrow}</p>
            <h1 className={`font-serif text-[clamp(4rem,17vw,8.5rem)] leading-[0.86] tracking-[-0.065em] md:text-[clamp(5.5rem,8vw,10rem)] ${version.headlineClass}`}>
              {version.headline}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 opacity-80 md:text-lg md:leading-8">{version.note}</p>
            <div className="mt-9 grid gap-4 sm:max-w-xl sm:grid-cols-2">
              <a href="tel:+31651126003" className={`px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] ${version.buttonClass}`}>
                Afspraak maken
              </a>
              <Link href="/shop" className={`px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] ${version.secondaryClass}`}>
                Shop haarverzorging
              </Link>
            </div>
          </div>

          <div className="mt-10 flex items-end justify-between gap-8 text-xs uppercase tracking-[0.18em] opacity-65">
            <span>{version.label}</span>
            <span>Mobiel eerst</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RefreshPreview() {
  return (
    <>
      <MetaHead title="Refresh preview" description="Haar Atelier refresh hero concepts" />
      <PreviewHeader />
      <main>
        {versions.map((version) => (
          <HeroVersion key={version.id} version={version} />
        ))}
      </main>
    </>
  );
}
