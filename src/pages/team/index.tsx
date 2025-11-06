import Image from "next/image";
import Link from "next/link";
import { teamImages } from "lib/teamImages";
import { useInView } from "react-intersection-observer";

const Team = () => {
  const images = teamImages;
  const { ref: marloes, inView: marloesVisible } = useInView();
  const { ref: ingmar, inView: ingmarVisible } = useInView({
    threshold: 0.3,
  });
  const { ref: marieke, inView: mariekeVisible } = useInView({
    threshold: 0.3,
  });
  const { ref: stoelhuur, inView: stoelHuurVisible } = useInView({
    threshold: 0.5,
  });

  const inViewArray = [marloesVisible, ingmarVisible, mariekeVisible, stoelHuurVisible];
  return (
    <>
      {/* <div className="hidden md:block sticky top-0 h-[calc(100vh/5)] bg-gradient-to-b from-bg-300 -z-10"></div> */}
      {/* <div className="md:hidden bg-gradient-to-t from-bg-300 p-8"></div> */}
      {/* <div className="md:grid md:grid-cols-2 pb-16 lg:px-16 xl:px-28 2xl:px-64"> */}
      <div className='md:grid md:grid-cols-2 pb-16 lg:px-16 xl:px-28 2xl:px-0 2xl:max-w-7xl mx-auto'>
        <div className='bg-gradient-to-b from-bg-300 via-bg-300 via-90% md:bg-none md:order-2 sticky top-0 md:h-screen pb-12 md:p-8 3xl:py-[calc((100vh-1000px)/2)]'>
          <div className='relative h-[calc(100vh/1.8)] md:h-full max-h-[1000px] overflow-hidden content-image-wrapper'>
            <div className='absolute md:hidden bottom-0 h-1/3 w-full bg-gradient-to-t from-bg-300'></div>
            <Image
              id='Marloes'
              src={images[0].src}
              alt='Marloes'
              fill={true}
              style={{ objectPosition: "center 10%", objectFit: "cover" }}
              sizes='(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw'
              className={`md:rounded-t-full ${
                marloesVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id='Ingmar'
              src={images[2].src}
              alt='Ingmar'
              fill={true}
              style={{ objectPosition: "center", objectFit: "cover" }}
              sizes='(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw'
              className={`md:rounded-t-full ${
                ingmarVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id='Marieke'
              src={images[1].src}
              alt='Marieke'
              fill={true}
              style={{ objectPosition: "bottom", objectFit: "cover" }}
              sizes='(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw'
              className={`md:rounded-t-full ${
                mariekeVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
            <Image
              id='stoelhuur'
              src={images[3].src}
              alt='Stoelhuur'
              fill={true}
              style={{ objectPosition: "center", objectFit: "cover" }}
              sizes='(min-width: 1540px) calc(50vw - 320px), (min-width: 1280px) calc(50vw - 176px), (min-width: 1040px) calc(50vw - 128px), (min-width: 780px) calc(50vw - 64px), 100vw'
              className={`md:rounded-t-full ${
                stoelHuurVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-in-out`}
            />
          </div>
        </div>
        {/* <div className="absolute -mt-[calc(100vh/1.6)] md:hidden h-2/3 w-full lg:right-0 bg-gradient-to-b from-bg-300 from-2%"></div> */}
        <div className='space-y-24 font-serif px-8 pt-8 md:pt-40 md:pb-60 -z-20'>
          <div ref={marloes} className='space-y-4'>
            <h2 className='uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]'>Marloes (owner)</h2>
            <p>
              In 2021 heb ik Haar Atelier Alkmaar opgericht. Het eeuwenoude pand in hartje Alkmaar heb ik omgetoverd tot
              een prachtige beautysalon in een hele fijne, relaxte, mediterrane stijl. Mijn passie voor het kappersvak
              en mijn geloof in echt eerlijke en duurzame producten komt hier zo mooi samen. Met ruim 14 jaar ervaring
              in zowel binnen- als buitenland weet ik mijn klanten iedere keer opnieuw te voorzien van een mooie,
              passende look. Na verschillende opleidingen en intense trainingen in Nederland ben ik vertrokken naar Azië
              en Australië om op reis te gaan. Vervolgens heb ik mijn carrière voortgezet en gewerkt in toonaangevende
              salons in Sydney. Ook werkte ik hier voor Fashion Weeks, fotoshoots en celebrities. Na 6 jaar lang weg van
              ‘huis’ te zijn geweest en met veel werk- en levenservaring besloot ik om terug te keren naar Noord
              Holland.
            </p>
            <p>
              Mijn specialiteiten liggen bij natuurlijke kleuringen. Sunkissed balayage, Lived in blonde, mooie, zachte
              highlights, Rich Brunettes. Folie technieken afgestemd op jouw haar en wensen, en het knippen van krullen,
              lang haar en korte(re) coupes. Met respect voor mens, dier en milieu draag ik met liefde mijn steentje bij
              aan een schonere, minder chemische wereld.
            </p>
            <p>Ik werk op dinsdag, donderdag en vrijdag.</p>
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
          <div ref={ingmar} className='space-y-4'>
            <h2 className='uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]'>Ingmar</h2>
            <p>
              Sinds de zomer van 2023 is Ingmar als eigen ondernemer werkzaam bij het Haar Atelier en kun je als klant
              met een gerust hart bij haar in de stoel plaats nemen. Met haar ruim 25 jaar ervaring, rustige karakter en
              oprechte interesse maakt ze van iedere behandeling een ware ontspannen beleving.
            </p>
            <p>
              Na 18 jaar in Amsterdam te hebben gewerkt maakt Ingmar de move naar de stad wat nu haar thuis is, Alkmaar.
              Ze vind het mooi om te zien dat we ons steeds bewuster worden van de ingrediënten en kwaliteit van
              haarverf en haarverzorging. Daarom is ze heel blij om met Natulique te werken.
            </p>
            <p>
              Zowel voor mooi, lang haar als een elegante pixie haircut kun je bij Ingmar terecht. Ook heren zitten
              wekelijks bij haar in de stoel. Ze creëert graag warme, zachte, blond- en kopertinten. Laat je adviseren
              door deze master stylist.
            </p>
            <p>Ingmar werkt op dinsdag, donderdag en vrijdag (per januari ook maandag).</p>
          </div>
          <div ref={marieke} className='space-y-4'>
            <h2 className='uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]'>Marieke</h2>
            <p>
              Met een hele hoop kennis en ruim 20 jaar werkervaring in de beauty branche is Marieke een hele fijne
              aanvulling in ons team. Ze kan je alles vertellen over natuurlijke haar kleuringen en producten én waarom
              dit zo belangrijk is!
            </p>
            <p>
              Haar loyale klanten volgen haar al jaren en dat is niet voor niets. Je krijgt écht persoonlijke aandacht
              en wordt door Marieke heerlijk in de watten gelegd. Ze voorziet zowel vrouwen als heren van een
              stijlvolle, frisse coupe.
            </p>
            <p>
              Marieke haar stijl is naturel, soft en glanzend met hier en daar een creatieve pastel kleur. Ook is ze een
              wenkbrauw specialist en kun je bij haar terecht voor diverse, natuurlijke brow treatments.
            </p>
            <p>Marieke werkt op maandag, woensdag, donderdag en vrijdag.</p>
          </div>
          <div ref={stoelhuur} className='space-y-4'>
            <h2 className='uppercase text-4xl mb-6 md:text-5xl md:mb-[0.5em]'>Stoelhuur</h2>
            <p>
              In het Haar Atelier werk ik samen met andere ondernemers die een stoel huren. Kapsters en
              wenkbrauwspecialisten die de passie voor clean beauty met mij delen en op ZZP basis hun eigen bedrijf
              runnen.
            </p>
            <p>
              Ben je nieuwsgierig naar de mogelijkheden van stoelhuur en wat we wellicht voor elkaar kunnen betekenen?
              Mail naar <a href='mailto:info@marloesotjes-haaratelier.nl'>info@marloesotjes-haaratelier.nl</a> of loop
              binnen in de salon, dan gaan we samen in gesprek.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
