import Image from "next/image";
import Link from "next/link";
import { contentImages } from "lib/contentImages";
import { useInView } from "react-intersection-observer";

const HeroContent = () => {
  const images = contentImages;
  const { ref: raam, inView: raamIsVisible } = useInView();
  const { ref: wasstoelen, inView: wasstoelenIsVisible } = useInView();
  const { ref: tube, inView: tubeIsVisible } = useInView();
  const { ref: producten, inView: productenIsVisible } = useInView();
  const { ref: deur, inView: deurIsVisible } = useInView();
  const { ref: voorraad, inView: voorraadIsVisible } = useInView();
  const { ref: stoel, inView: stoelIsVisible } = useInView();
  const { ref: fohnen, inView: fohnenIsVisible } = useInView();

  return (  
    <>
      <div className="hidden md:block sticky top-0 h-[calc(100vh/5)] bg-gradient-to-b from-bg-300 -z-10"></div>
      <div className="md:hidden bg-gradient-to-t from-bg-300 p-8"></div>
      <div className="md:grid md:grid-cols-2 pb-16 lg:px-16 xl:px-28 2xl:px-64">
        <div
          ref={raam}    
          className="bg-gradient-to-b from-bg-300 via-bg-300 via-90% md:bg-none md:order-2 sticky top-0 md:h-screen pb-12 md:p-8 3xl:py-[calc((100vh-1000px)/2)]"
        >
          <div className="relative h-[calc(100vh/1.8)] md:h-full max-h-[1000px] overflow-hidden content-image-wrapper">
            <div className="absolute md:hidden bottom-0 h-1/3 w-full bg-gradient-to-t from-bg-300"></div>
            <Image
              id="Marloes voor het atelier"
              src={images[0].src}
              alt="Marloes voor het atelier"
              fill={true}
              style={{ objectPosition: "center 10%", objectFit: "cover" }}
              sizes="(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw"
              className={`md:rounded-t-full ${
                raamIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id="Wasstoelen"
              src={contentImages[1].src}
              alt="wasstoelen"
              fill={true}
              style={{ objectPosition: "bottom", objectFit: "cover" }}
              sizes="(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw"
              className={`md:rounded-t-full md:hidden ${
                wasstoelenIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id="Tube"
              src={contentImages[2].src}
              alt="Tube"
              fill={true}
              style={{ objectPosition: "center", objectFit: "cover" }}
              sizes="(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw"
              className={`md:rounded-t-full md:hidden ${
                tubeIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id="Producten"
              src={contentImages[3].src}
              alt="Producten"
              fill={true}
              style={{ objectPosition: "center", objectFit: "cover" }}
              sizes="(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw"
              className={`md:rounded-t-full ${
                productenIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id="Marloes voor de deur"
              src={contentImages[4].src}
              alt="Marloes voor de deur"
              fill={true}
              style={{ objectPosition: "center 75%", objectFit: "cover" }}
              sizes="(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw"
              className={`md:rounded-t-full ${
                deurIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id="Voorraad"
              src={contentImages[5].src}
              alt="Voorraad"
              fill={true}
              style={{ objectPosition: "center", objectFit: "cover" }}
              sizes="(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw"
              className={`md:rounded-t-full ${
                voorraadIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id="Marloes op the stoel"
              src={contentImages[6].src}
              alt="Marloes op the stoel"
              fill={true}
              style={{ objectPosition: "center", objectFit: "cover" }}
              sizes="(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw"
              className={`md:rounded-t-full ${
                stoelIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id="Fohnen"
              src={contentImages[7].src}
              alt="Fohnen"
              fill={true}
              style={{ objectPosition: "top", objectFit: "cover" }}
              sizes="(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw"
              className={`md:rounded-t-full ${
                fohnenIsVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
          </div>
        </div>
        <div className="absolute -mt-[calc(100vh/1.6)] md:hidden h-2/3 w-full lg:right-0 bg-gradient-to-b from-bg-300 from-2%"></div>
        <div className="space-y-24 font-serif px-8 pt-8 md:pt-60 -z-20">
          <div className="space-y-4">
            <h2 className="uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]">
              Haar Atelier Alkmaar
            </h2>
            <p>
              Haar Atelier Alkmaar is ontstaan vanuit mijn visie, passie en
              leefstijl voor eerlijke, natuurlijke en echt duurzame producten.
              Ik ben ruim 14 jaar kapster en heb in meerdere salons gewerkt in
              Nederland en Australië. In 2021 heb ik mijn hart gevolgd en Haar
              Atelier Alkmaar opgericht.
            </p>
            <p>
              Ik ben verliefd geworden op dit mooie plekje, aan de gracht, in de
              binnenstad van Alkmaar, het contrast van de beweging buiten, in de
              salon is er rust.
            </p>
            <p>
              Natural. Organic. Bohemian. Luxury. Sexy Hair. Dat is wie ik ben,
              en wat mijn salon ademt. Dit voelt zo IK. Marloes.
            </p>
            <p>
              Ik ben gespecialiseerd in kleur, balayages, highlights en
              faceframing, en werk met de natuurlijke producten van Natulique.
            </p>
            <p ref={wasstoelen}>
              Loop binnen in de salon, aan de Voordam. Of boek je afspraak
              eenvoudig online. Je bent van harte welkom.
            </p>
            <div className="mt-4">
              <Link
                href={
                  "https://widget2.meetaimy.com/widgetWeb?salonId=MTIzNjkzMA%3D%3D&salonEmail=aW5mb0BtYXJsb2Vzb3RqZXMtaGFhcmF0ZWxpZXIubmw%3D"
                }
              >
                <div className="bg-accent-500 rounded-lg px-4 py-2 text-white w-full text-center font-sans md:w-max">
                  Afspraak maken
                </div>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h2
              ref={tube}
              className="uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]"
            >
              Natulique
            </h2>
            <p>
              Ik werk in mijn salon bewust met de natuurlijke producten van
              Natulique. Het verhaal achter Natulique, het ontstaan, de
              ingrediënten, de werking, tot de verpakking aan toe. Het voelt
              voor mij zo eerlijk en oprecht.
            </p>
            <p>
              Natulique gelooft, net als ik, dat het kappersvak zoveel duurzamer
              en schoner kan. De producten uit Denemarken zijn puur, natuurlijk,
              vegan, biologisch, gerecycled en recyclebaar. Vrij van chemicaliën
              en kunstmatige toevoegingen. En dat voel je, en dat ruik je. Ik
              werk er dagelijks mee in mijn salon, en mijn klanten die het thuis
              gebruiken ervaren hetzelfde.
            </p>
            <p>
              Boek een afspraak online, loop binnen in de salon, of bestel 1 van
              de producten voor thuis online in de shop.
            </p>
          </div>
          <div className="space-y-4">
            <h2
              ref={producten}
              className="uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]"
            >
              De Shop
            </h2>
            <p>
              De Natulique producten die ik professioneel in mijn salon gebruik
              zijn voor thuisgebruik ook heel geschikt.
            </p>
            <p>
              Alle producten zijn duurzaam, natuurlijk, vrij van microplastics,
              siliconen, synthetische geur- en kleurstoffen, en veilig (en met
              respect) voor mens, dier en milieu.
            </p>
            <p>
              Via mijn webshop kan je ze eenvoudig online bestellen, langskomen
              in mijn salon kan natuurlijk ook.
            </p>
            <div className="mt-4">
              <Link href={"/shop"}>
                <div className="border border-white bg-black bg-opacity-30 rounded-lg px-4 py-2 text-white w-full text-center font-sans md:w-max">
                  Naar de shop
                </div>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h2
              ref={deur}
              className="uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]"
            >
              Over Marloes
            </h2>
            <p>
              In 2021 ben ik mijn hart gevolgd, en heb ik Haar Atelier
              opgericht. Mijn passie voor het kappersvak, en mijn geloof in echt
              eerlijke en duurzame producten, komt hier zo mooi samen.
            </p>
            <p>
              Ik ben ruim 14 jaar kapster en heb in meerdere salons gewerkt in
              Nederland en Australië (Ik heb 6 jaar in Sydney gewoond). Waar ik
              nu enkel en alleen werk met natuurlijke producten, ken ik ook de
              andere kant van het vak. Ik heb jarenlang, zoals ik dat wel eens
              zeg, met m’n handen in de ‘troep’ gestaan. Met Haar Atelier ben,
              en wil ik het voorbeeld zijn, voor hoe het kappersvak duurzamer,
              gezonder en schoner kan.
            </p>
            <p ref={voorraad}>
              Ik kies er bewust voor te werken met de producten van het Deense
              merk Natulique. De producten, de oorsprong hiervan, het verhaal
              erachter, tot de verpakking aan toe. Het voelt voor mij eerlijk en
              oprecht. En niet onbelangrijk, de resultaten die ik ermee neerzet
              zijn prachtig.
            </p>
            <p>
              Inmiddels voel ik mij met Haar Atelier zoveel meer dan een kapper.
              Je loopt niet alleen met mooi haar de deur uit. Je krijgt bij mij
              zoveel meer dan dat.
            </p>
            <p>
              Natural. Organic. Bohemian. Luxury. Sexy Hair. Dit is wie ik ben,
              wat mijn salon ademt (tot de zelfgemaakte chocolaatjes bij de
              koffie aan toe…), en waar ik trots op ben.
            </p>
            <p>
              Bij Haar Atelier Alkmaar werk ik samen met andere ondernemers.
              Kapsters en wenkbrauwspecialisten die staan voor, en geloven in
              dezelfde visie als ik. In mijn salon werk ik met de mogelijkheid
              om een stoel te huren.
            </p>
            <p>
              Nieuwsgierig naar de mogelijkheden, en wat we wellicht voor elkaar
              kunnen betekenen? Stuur me een persoonlijk berichtje, of loop
              binnen in de salon, dan gaan we samen in gesprek.
            </p>
            <p ref={stoel}>Liefs. Marloes.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroContent;
