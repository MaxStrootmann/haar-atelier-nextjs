import Image from "next/legacy/image";
import * as Icons from "lib/icons";
import haalogo from "/public/haalogo.svg";
import Link from "next/link";
import { BiLogoFacebook, BiMap, BiPhone } from "react-icons/bi";
import { IconContext } from "react-icons";
import { AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";

const d = new Date();

const Footer = () => {
  return <>
    <div className="mt-24 text-center">
      <div className="mb-8">
        <a href="https://www.natulique.com/nl/">
          <Image
            src={Icons.Logo_Natulique}
            alt={"Logo Natulique"}
            width={67 * 3}
            height={36 * 3}
          />
        </a>
      </div>
      <div className="flex flex-wrap justify-center items-center p-4">
        <div className=" my-6 text-center w-26 h-18">
          <Image src={Icons.Icon_Parabenes} alt="Icon Parabenes"width={58} height={58} />
          <p className="text-natulique text-[0.625rem] whitespace-nowrap">
            Parebenes Free
          </p>
        </div>
        <div className=" my-6 text-center w-26 h-18">
          <Image src={Icons.Icon_SLS} alt="Icon SLS"width={58} height={58} />
          <p className="text-natulique text-[0.625rem] whitespace-nowrap">
            SLS Free
          </p>
        </div>
        <div className=" my-6 text-center w-26 h-18">
          <Image src={Icons.Icon_Silicones} alt="Icon Silicones"width={58} height={58} />
          <p className="text-natulique text-[0.625rem] whitespace-nowrap">
            Silicones Free*
          </p>
        </div>
        <div className=" my-6 text-center w-26 h-18">
          <Image src={Icons.Icon_Phenoxyethanol} alt="Icon Phenoxyethanol"width={58} height={58} />
          <p className="text-natulique text-[0.625rem] whitespace-nowrap">
            Phenoxyethanol Free
          </p>
        </div>
        <div className=" my-6 text-center w-26 h-18">
          <Image src={Icons.Icon_Ammonia} alt="Icon Ammonia" width={58} height={58} />
          <p className="text-natulique text-[0.625rem] whitespace-nowrap">
            Ammonia Free
          </p>
        </div>
        <div className=" my-6 text-center w-26 h-18">
          <Image src={Icons.Icon_Fragrances} alt="Icon Fragrances"width={58} height={58} />
          <p className="text-natulique text-[0.625rem] whitespace-nowrap">
            Artificial Fragrance Free
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-24 mt-8">
        <Image
          src={Icons.Icon_BIOCERT}
          alt={"360 Biocert Standard"}
          width={88}
          height={56}
        />
        <Image src={Icons.Icon_Vegan} alt={"Vegan"} width={88} height={72} />
      </div>
    </div>
    <div className="text-center mt-28 mx-16">
      <Link href="/">

        <Image
          src={haalogo}
          alt="Haar Atelier Alkmaar Logo"
          width={771 / 2}
          height={197 / 2}
        ></Image>

      </Link>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/" className="underline underline-offset-2">
          Home
        </Link>
        <Link href="/shop" className="underline underline-offset-2">
          Shop
        </Link>
      </div>
      <IconContext.Provider value={{ size: "1.5rem" }}>
        <div className="flex mt-8 justify-center gap-4 ">
          <BiLogoFacebook />
          <AiOutlineInstagram />
          <AiFillLinkedin />
        </div>
      <div className="mr-7">
        <div className="flex justify-center items-center gap-2 mt-8">
          <BiMap />
        <Link
          href={"https://www.google.nl/maps/place/Voordam+10,+1811+MA+Alkmaar/@52.6318052,4.7485402,17z/data=!3m1!4b1!4m6!3m5!1s0x47cf57b4ffd45087:0x523807e1bf06d118!8m2!3d52.631802!4d4.7511151!16s%2Fg%2F11bw4r6r45?entry=ttu"}
          className="underline underline-offset-2">
          Voordam 10A<br/>1811 MA Alkmaar
        </Link>
        </div>
        <div className="flex justify-center items-center gap-2 mt-8">
          <BiPhone />
        <Link href={"tel: +31613248526"} className="underline underline-offset-2">
          +31 (0)6 51 12 60 03
        </Link>
        </div>
      </div>
      </IconContext.Provider>
    </div>

    <div className="w-[100%-2rem] py-3 px-4 mt-10 mb-10 mx-4 border-t border-grey-500">
      <p className="text-sm text-grey-500 text-center">
        &copy; {d.getFullYear()} Haar Atelier Alkmaar. All rights reserved.
      </p>
    </div>
  </>;
};

export default Footer;
