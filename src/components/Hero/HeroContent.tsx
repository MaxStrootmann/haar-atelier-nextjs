import Image from "next/legacy/image";
import M_raam from "/public/M_raam.jpg";
import Link from "next/link";

const HeroContent = () => {
  return (
    <div className="">
      <div className="sticky top-0">
        <div className="bg-bg-300 from-10% px-[4.5rem] pt-4 w-screen ">
          <Image
            src={M_raam}
            alt="Marloes voor het Atelier"
            quality={100}
            layout="responsive"
            className="rounded-t-full"
          />
        </div>
        <div className="bg-gradient-to-b from-bg-300 p-10"></div>
      </div>
      <div className="relative bg-bg-300"></div>

      <div className="space-y-16 mx-4 md:mx-8 font-serif">
        <div className="space-y-4">
          <h2 className="uppercase text-4xl">Haar Atelier Alkmaar</h2>
          <p>
            Haar Atelier Alkmaar is ontstaan vanuit mijn visie, passie en
            leefstijl voor eerlijke, natuurlijke en echt duurzame producten. Ik
            ben ruim 14 jaar kapster en heb in meerdere salons gewerkt in
            Nederland en Australië. In 2021 heb ik mijn hart gevolgd en Haar
            Atelier Alkmaar opgericht.
          </p>
          <p>
            Ik ben verliefd geworden op dit mooie plekje, aan de gracht, in de
            binnenstad van Alkmaar, het contrast van de beweging buiten, in de
            salon is er rust.
          </p>
          <p>
            Natural. Organic. Bohemian. Luxury. Sexy Hair. Dat is wie ik ben, en
            wat mijn salon ademt. Dit voelt zo IK. Marloes.
          </p>
          <p>
            Ik ben gespecialiseerd in kleur, balayages, highlights en
            faceframing, en werk met de natuurlijke producten van Natulique.
          </p>
          <p>
            Loop binnen in de salon, aan de Voordam. Of boek je afspraak
            eenvoudig online. Je bent van harte welkom.
          </p>
          <div className="mt-4">
            <Link
              href={
                "https://widget2.meetaimy.com/widgetWeb?salonId=MTIzNjkzMA%3D%3D&salonEmail=aW5mb0BtYXJsb2Vzb3RqZXMtaGFhcmF0ZWxpZXIubmw%3D"
              }
            >

              <div className="bg-accent-500 rounded-lg px-4 py-2 text-white w-full text-center md:text-xl font-sans md:w-max">
                Afspraak maken
              </div>

            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="uppercase text-4xl">Natulique</h2>
          <p>
            Ik werk in mijn salon bewust met de natuurlijke producten van
            Natulique. Het verhaal achter Natulique, het ontstaan, de
            ingrediënten, de werking, tot de verpakking aan toe. Het voelt voor
            mij zo eerlijk en oprecht.
          </p>
          <p>
            Natulique gelooft, net als ik, dat het kappersvak zoveel duurzamer
            en schoner kan. De producten uit Denemarken zijn puur, natuurlijk,
            vegan, biologisch, gerecycled en recyclebaar. Vrij van chemicaliën
            en kunstmatige toevoegingen. En dat voel je, en dat ruik je. Ik werk
            er dagelijks mee in mijn salon, en mijn klanten die het thuis
            gebruiken ervaren hetzelfde.
          </p>
          <p>
            Boek een afspraak online, loop binnen in de salon, of bestel 1 van
            de producten voor thuis online in de shop.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="uppercase text-4xl">De Shop</h2>
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
            Via mijn webshop kan je ze eenvoudig online bestellen, langskomen in
            mijn salon kan natuurlijk ook.
          </p>
        <div className="mt-4">
          <Link href={"/shop"}>

            <div className="border border-white bg-black bg-opacity-30 rounded-lg px-4 py-2 text-white w-full text-center md:text-xl font-sans md:w-max">
              Naar de shop
            </div>

          </Link>
        </div>
        </div>

        <div className="space-y-4">
          <h2 className="uppercase text-4xl">Over Marloes</h2>
          <p>
            In 2021 ben ik mijn hart gevolgd, en heb ik Haar Atelier opgericht.
            Mijn passie voor het kappersvak, en mijn geloof in echt eerlijke en
            duurzame producten, komt hier zo mooi samen.
          </p>
          <p>
            Ik ben ruim 14 jaar kapster en heb in meerdere salons gewerkt in
            Nederland en Australië (Ik heb 6 jaar in Sydney gewoond). Waar ik nu
            enkel en alleen werk met natuurlijke producten, ken ik ook de andere
            kant van het vak. Ik heb jarenlang, zoals ik dat wel eens zeg, met
            m’n handen in de ‘troep’ gestaan. Met Haar Atelier ben, en wil ik
            het voorbeeld zijn, voor hoe het kappersvak duurzamer, gezonder en
            schoner kan.
          </p>
          <p>
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
            wat mijn salon ademt (tot de zelfgemaakte chocolaatjes bij de koffie
            aan toe…), en waar ik trots op ben.
          </p>
          <p>
            Bij Haar Atelier Alkmaar werk ik samen met andere ondernemers.
            Kapsters en wenkbrauwspecialisten die staan voor, en geloven in
            dezelfde visie als ik. In mijn salon werk ik met de mogelijkheid om
            een stoel te huren.
          </p>
          <p>
            Nieuwsgierig naar de mogelijkheden, en wat we wellicht voor elkaar
            kunnen betekenen? Stuur me een persoonlijk berichtje, of loop binnen
            in de salon, dan gaan we samen in gesprek.
          </p>
          <p>Liefs. Marloes.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
