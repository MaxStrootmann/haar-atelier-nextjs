"use client";

import { CardContainer, CardBody, CardItem } from "components/ui/3D-card";
import Image from "next/image";

export default function CategoryCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <CardContainer>
      <CardBody className="relative group/card border-black/[0.1] text-center bg-white bg-opacity-30 w-[18rem] h-auto rounded-xl p-6 border">
        <CardItem translateZ="50" className="text-lg font-bold mx-auto h-12">
          {name}
        </CardItem>

        <CardItem
          translateZ="32"
          // rotateX={20}
          // rotateZ={-10}
          className="relative w-full h-60 mt-4"
        >
          <Image
            src={image}
            className="object-cover rounded-xl"
            alt="thumbnail"
            sizes="100vw"
            fill
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
