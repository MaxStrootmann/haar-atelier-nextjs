import type { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import MetaHead from "components/MetaHead";
import {
  getStorefrontProductBySlug,
  getStorefrontProducts,
  getStorefrontPriceGroups,
  type StorefrontProduct,
  type StorefrontPriceGroup,
} from "lib/payload/storefront";
import { hardCodedCategories } from "lib/shop/categories";

type RefreshPreviewProps = {
  featuredProducts: StorefrontProduct[];
  heroProduct: StorefrontProduct | null;
  priceGroups: StorefrontPriceGroup[];
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

const productImage = (product: StorefrontProduct) => product.image?.url || "/categories/hairwash.png";

export default function RefreshPreview({ featuredProducts, heroProduct, priceGroups }: RefreshPreviewProps) {
  return (
    <>
      <MetaHead title="Refresh preview" description="Haar Atelier redesign preview" />
      <main className="min-h-screen bg-[#fbf4ea] text-[#1f1712]">
        <section className="relative min-h-screen overflow-hidden">
          <Image src="/Salon_large.jpg" alt="Haar Atelier Alkmaar salon" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f1712]/55 via-[#1f1712]/18 to-[#fbf4ea]/75" />
          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 md:px-10">
            <nav className="flex items-start justify-between text-white">
              <Link href="/" className="font-serif text-2xl leading-none tracking-[0.16em] md:text-4xl">
                HAAR ATELIER
                <span className="block text-center text-sm tracking-[0.28em] md:text-base">ALKMAAR</span>
              </Link>
              <div className="hidden gap-8 text-sm uppercase tracking-[0.24em] md:flex">
                <Link href="/shop">Shop</Link>
                <Link href="/tarieven">Tarieven</Link>
                <a href="tel:+31651126003">Bel ons</a>
              </div>
            </nav>
            <div className="grid flex-1 items-center md:grid-cols-[1fr_0.74fr]">
              <div className="max-w-3xl pt-20 text-white md:pt-0">
                <p className="mb-5 text-sm uppercase tracking-[0.32em] text-[#e4c28d]">Redesign preview · niet productie</p>
                <h1 className="font-serif text-6xl leading-[0.92] tracking-[-0.04em] md:text-8xl lg:text-9xl">
                  Natural hair, quietly luxurious.
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-8 text-white/88 md:text-xl">
                  Een zachtere, editorial richting voor Haar Atelier: salonervaring, natuurlijke verzorging en boutique webshop in één rustige flow.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="tel:+31651126003" className="rounded-full bg-[#c99b57] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-xl shadow-black/10">
                    Afspraak maken
                  </a>
                  <Link href="#preview-shop" className="rounded-full border border-white/70 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    Bekijk shop
                  </Link>
                </div>
              </div>
              <div className="mt-12 rounded-[2rem] border border-white/25 bg-white/70 p-6 shadow-2xl shadow-[#3d2b1d]/15 backdrop-blur-md md:mt-0">
                <p className="text-xs uppercase tracking-[0.28em] text-[#8f6c43]">Design intent</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight">Salon-first homepage, polished commerce underneath.</h2>
                <p className="mt-5 leading-7 text-[#5d4b3d]">
                  Deze preview test grotere typografie, duidelijkere CTA’s, rijkere secties en een stillere luxe uitstraling zonder de bestaande checkout te raken.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-10">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#a47c49]">Het Atelier</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">Rust, aandacht en natuurlijk mooi haar.</h2>
          </div>
          <div className="grid gap-6 text-lg leading-8 text-[#5d4b3d] md:grid-cols-2">
            <p>Een homepage die sneller vertelt waarom je hier boekt: persoonlijke aandacht, natuurlijke producten en een salon die warm maar premium voelt.</p>
            <p>De content blijft compact en scanbaar, met vaste plekken voor eigenaarstekst, Natulique, reviews en contact.</p>
          </div>
        </section>

        <section id="preview-shop" className="bg-[#f3e7d8] px-6 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[#a47c49]">Boutique commerce</p>
                <h2 className="mt-4 font-serif text-5xl md:text-7xl">Shop voelt rustiger, voller en consistenter.</h2>
              </div>
              <Link href="/shop" className="w-max rounded-full bg-[#1f1712] px-6 py-3 text-sm uppercase tracking-[0.18em] text-white">Huidige shop</Link>
            </div>
            <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
              {hardCodedCategories.map((category) => (
                <span key={category.id} className="whitespace-nowrap rounded-full border border-[#d2b88f] bg-[#fbf4ea] px-5 py-2 text-sm text-[#5d4b3d]">
                  {category.name}
                </span>
              ))}
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <article key={product.id} className="group rounded-[1.5rem] bg-[#fffaf3] p-4 shadow-sm ring-1 ring-[#eadbc8] transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-[#f3e7d8]">
                    <Image src={productImage(product)} alt={product.image?.alt || product.name} fill className="object-contain p-6 transition group-hover:scale-105" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#a47c49]">{product.category}</p>
                  <h3 className="mt-2 min-h-12 font-serif text-2xl leading-tight">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span>{formatPrice(product.price)}</span>
                    <span className="rounded-full bg-[#c99b57] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">Bekijk</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {heroProduct && (
          <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:px-10">
            <div className="relative min-h-[520px] rounded-[2rem] bg-[#f3e7d8] p-10">
              <Image src={productImage(heroProduct)} alt={heroProduct.image?.alt || heroProduct.name} fill className="object-contain p-16" />
            </div>
            <div className="self-center">
              <p className="text-sm uppercase tracking-[0.28em] text-[#a47c49]">Product detail module</p>
              <h2 className="mt-4 font-serif text-6xl leading-tight">{heroProduct.name}</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d4b3d]">
                Een compactere productpagina kan voordeel, gebruik, certificering en verwante producten beter naar voren halen zonder de bestaande checkoutlogica te wijzigen.
              </p>
              <div className="mt-8 rounded-[1.4rem] border border-[#dfc7a6] bg-white/65 p-5">
                <div className="flex items-center justify-between text-2xl">
                  <span>{formatPrice(heroProduct.price)}</span>
                  <span className="text-sm uppercase tracking-[0.18em] text-[#7d6c52]">{heroProduct.inStock ? "Op voorraad" : "Niet op voorraad"}</span>
                </div>
                <button className="mt-5 w-full rounded-full bg-[#c99b57] py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">Preview CTA</button>
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="rounded-[2rem] bg-[#1f1712] p-8 text-[#fbf4ea] md:p-12">
            <p className="text-sm uppercase tracking-[0.28em] text-[#e4c28d]">Pricing direction</p>
            <h2 className="mt-4 font-serif text-5xl">Tarieven als rustige servicekaarten.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {priceGroups.slice(0, 3).map((group) => (
                <div key={group.id} className="rounded-[1.3rem] bg-white/8 p-5 ring-1 ring-white/10">
                  <h3 className="font-serif text-3xl">{group.category}</h3>
                  <ul className="mt-5 space-y-3 text-sm text-white/80">
                    {group.treatments.slice(0, 3).map((treatment) => (
                      <li key={treatment.id} className="flex justify-between gap-4">
                        <span>{treatment.name}</span>
                        <span>{treatment.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<RefreshPreviewProps> = async () => {
  const [featuredProducts, heroProduct, priceGroups] = await Promise.all([
    getStorefrontProducts({ limit: 12 }),
    getStorefrontProductBySlug("natulique-balance-hairwash"),
    getStorefrontPriceGroups(),
  ]);

  return {
    props: {
      featuredProducts,
      heroProduct,
      priceGroups,
    },
  };
};
