import Image from "next/image";
import Link from "next/link";
import { contentImages } from "lib/contentImages";
import { useInView } from "react-intersection-observer";

const HeroContent = () => {
  const images = contentImages;
  const { ref: deur, inView: deurIsVisible } = useInView();
  const { ref: fohnen, inView: fohnenIsVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: voorraad, inView: voorraadIsVisible } = useInView({
    threshold: 0.5,
  });
  return (
    <>
      <div className='hidden md:block sticky top-0 h-[calc(100vh/5)] bg-gradient-to-b from-bg-300 -z-10'></div>
      <div className='md:hidden bg-gradient-to-t from-bg-300 p-8'></div>
      {/* <div className="md:grid md:grid-cols-2 pb-16 lg:px-16 xl:px-28 2xl:px-64"> */}
      <div className='md:grid md:grid-cols-2 pb-28 lg:px-16 xl:px-28 2xl:px-0 2xl:max-w-7xl mx-auto'>
        <div
          ref={deur}
          className='bg-gradient-to-b from-bg-300 via-bg-300 via-90% md:bg-none md:order-2 sticky top-0 md:h-screen pb-12 md:p-8 3xl:py-[calc((100vh-1000px)/2)]'
        >
          <div className='relative h-[calc(100vh/1.8)] md:h-full max-h-[1000px] overflow-hidden content-image-wrapper'>
            <div className='absolute md:hidden bottom-0 h-1/3 w-full bg-gradient-to-t from-bg-300'></div>
            <Image
              id='Marloes voor de deur'
              src={images.deur.src}
              alt='Marloes voor de deur'
              fill={true}
              style={{ objectPosition: "center 10%", objectFit: "cover" }}
              sizes='(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw'
              className={`md:rounded-t-full ${
                deurIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id='Fohnen'
              src={images.fohnen.src}
              alt='Fohnen'
              fill={true}
              style={{ objectPosition: "center", objectFit: "cover" }}
              sizes='(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw'
              className={`md:rounded-t-full ${
                fohnenIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id='Voorraad'
              src={images.voorraad.src}
              alt='Voorraad'
              fill={true}
              style={{ objectPosition: "center", objectFit: "cover" }}
              sizes='(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw'
              className={`md:rounded-t-full ${
                voorraadIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
          </div>
        </div>
        <div className='absolute -mt-[calc(100vh/1.6)] md:hidden h-2/3 w-full lg:right-0 bg-gradient-to-b from-bg-300 from-2%'></div>
        <div className='space-y-24 font-serif pb-40 px-8 pt-8 md:pt-60 -z-20'>
          <div className='space-y-4'>
            <h2 className='uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]'>Het Haar Atelier</h2>
            <p>
              Haar Atelier Alkmaar is ontstaan vanuit mijn visie en passie voor eerlijke, natuurlijke en duurzame
              producten. Mijn naam is Marloes. Ik ben ruim 14 jaar kapster en heb in verschillende toonaangevende salons
              gewerkt in Nederland en Australië. In 2021 heb ik Haar Atelier Alkmaar opgericht op een prachtige locatie,
              middenin de binnenstad van Alkmaar.
            </p>
            <p>Loop binnen in de salon, of boek je afspraak eenvoudig online. Voel je welkom.</p>
          </div>
          <div ref={fohnen} className='space-y-4'>
            <h2 className='uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]'>Natural, healthy & sexy hair</h2>
            <p>
              Ik ben gespecialiseerd in natuurlijke kleuringen. Sunkissed balayage, Lived in blonde, mooie, zachte
              highlights, Rich Brunette. Met de ammonia-vrije haarkleuringen van Natulique creëer ik voor jou de mooiste
              look, met biologische ingrediënten en minder gifstoffen.
            </p>
            <div className='mt-4'>
              <Link
                href={
                  "https://widget2.meetaimy.com/widgetWeb?salonId=MTIzNjkzMA%3D%3D&salonEmail=aW5mb0BtYXJsb2Vzb3RqZXMtaGFhcmF0ZWxpZXIubmw%3D"
                }
              >
                <div className='bg-accent-500 rounded-lg px-4 py-2 text-white w-full text-center font-sans md:w-max'>
                  Afspraak maken
                </div>
              </Link>
            </div>
          </div>
          <div ref={voorraad} className='space-y-4'>
            <h2 className='uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]'>Natulique</h2>
            <p>
              Ik geloof in de kracht van natuurlijke haarverzorging en kies er bewust voor te werken met de producten
              van het Deense merk Natulique. De producten zijn biologisch, vrij van siliconen, synthetische geur- en
              kleurstoffen en kunstmatige toevoegingen. Dat voel je, en dat ruik je. Natulique is een uniek merk dat
              mensen de mogelijkheid wil geven om de veiligste keuzes te maken voor hun eigen gezondheid, de planeet en
              de dieren. Ze zijn constant bezig om een toekomst te creëren die biologisch en duurzaam is, zonder in te
              hoeven leveren op resultaat. Want zeg nou eerlijk; iedereen wil betere en gezondere producten, maar we
              willen er nog steeds geweldig uit zien! De producten zijn verkrijgbaar in de salon en de webshop.
            </p>
            <div className='mt-4'>
              <Link href={"/shop"}>
                <div className='border border-white bg-black bg-opacity-30 rounded-lg px-4 py-2 text-white w-full text-center font-sans md:w-max'>
                  Naar de shop
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroContent;
