import { CategorySchema, ProductSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import Link from "next/link";
import Image from "next/legacy/image";
import salon from "/public/Salon.jpg";
import salon_large from "/public/Salon_large.jpg";
import HaaLogo from "lib/HaaLogo";


const HomeHero = () => {

  return ( 
  <>
    <div className="relative -mt-28 flex justify-center">
      <div className="absolute flex flex-col items-center z-10 top-48 md:top-72 w-[90%] md:w-2/3">
        <HaaLogo fill="white" />

        <div className="mt-12 md:mt-16 space-y-4">
          <div className="">
            <Link href={"/shop"}>

              <div className="border border-white bg-black bg-opacity-30 rounded-lg px-4 py-2 text-white w-full text-center md:text-xl">
                Naar de shop
              </div>

            </Link>
          </div>
          <div>
            <Link
              href={
                "https://widget2.meetaimy.com/widgetWeb?salonId=MTIzNjkzMA%3D%3D&salonEmail=aW5mb0BtYXJsb2Vzb3RqZXMtaGFhcmF0ZWxpZXIubmw%3D"
              }
            >

              <div className="bg-accent-500 rounded-lg px-4 py-2 text-white w-full text-center md:text-xl md">
                Afspraak maken
              </div>

            </Link>
          </div>
          <div>
            <Link
              href={"/category"}
            >

              <div className="bg-accent-500 rounded-lg px-4 py-2 text-white w-full text-center md:text-xl md">
                categorypage
              </div>

            </Link>
          </div>
          <div>
            <Link
              href={"/tarieven"}
            >

              <div className="bg-accent-500 rounded-lg px-4 py-2 text-white w-full text-center md:text-xl md">
                tarieven
              </div>

            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full md:block">
        <div className="absolute z-10 top-1/2 h-1/2 w-full bg-gradient-to-t from-bg-300"></div>
        <Image
          src={salon}
          alt="De salon"
          quality={100}
          layout="intrinsic"
          className=""
        />
      </div>
      <div className="relative md:hidden h-full">
      <div className="absolute z-20 top-1/2 h-1/2 w-full bg-gradient-to-t from-bg-300 from-15%"></div>
        <Image
          src={salon_large}
          alt="De salon"
          quality={100}
          layout="intrinsic"
        />
      </div>
    </div>
    <MetaHead description="Gespecialiseerd in het kleuren van haar. Lived-in balayage, faceframing, highlights, blonde & brunettes. Haircuts voor mannen & vrouwen." />
  </>
  );
};

export default HomeHero;
