import { CategorySchema, ProductSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import Link from "next/link";
import Image from "next/image";
import salon from "/root/haar-atelier-nextjs/public/Salon.jpg";
import haalogo from "/root/haar-atelier-nextjs/public/haalogo.svg";

interface HomeProps {
  categories: CategorySchema[];
  products: ProductSchema[];
}

const Home: React.FC<HomeProps> = ({ categories, products }) => {
  return (
    <>
      <div className="relative -mt-20 flex justify-center">
        <div className="absolute z-10 top-48 w-2/3">
          <Image
            src={haalogo}
            alt="Logo Haar Atelier Alkmaar"
            width={771}
            height={197}
            color="white"
          />
        </div>
        <Image src={salon} alt="De salon" quality={100} layout="intrinsic" />
      </div>
      <MetaHead description="Gespecialiseerd in het kleuren van haar. Lived-in balayage, faceframing, highlights, blonde & brunettes. Haircuts voor mannen & vrouwen." />
      <Link href={"/shop"}>
        <a>
          <div className="border border-black rounded-lg px-4 py-2 text-4xl">
            Shop
          </div>
        </a>
      </Link>
    </>
  );
};

export default Home;
