import { getPayloadPriceGroups } from "lib/payload/queries/price-groups";
import { GetServerSideProps } from "next";

type PriceSchema = {
  _id: string;
  category: string;
  conditions: string;
  treatment: [
    {
      _id: string;
      treatment: string;
      conditions: string;
      price: string;
    },
  ];
};

interface TarievenProps {
  prices: PriceSchema[];
}

export default function Tarieven({ prices }: TarievenProps) {
  return (
    <div className="text-center">
      <h1>Tarieven</h1>
      <p className="font-serif italic px-4 md:w-96 mx-auto py-8">
        Alle prijzen zijn vanafprijzen en zijn afhankelijk van de behandeling,
        lengte en dikte van het haar. Wanneer er meer verf/ tijd nodig is wordt
        er een toeslag gerekend.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 text-left px-4 lg:px-12">
        {prices?.map((price) => (
          <div key={price._id} className="space-y-4 py-4 md:px-8 lg:px-16">
            <h2 className="">{price.category}</h2>
            {price.conditions ? (
              <em className="font-serif">{price.conditions}</em>
            ) : null}
            {price.treatment?.map((treatment) => (
              <div key={treatment._id} className="">
                <div className="flex justify-between items-center w-full">
                  <p className="font-serif">{treatment.treatment}</p>
                  <span className="px-2">{treatment.price}</span>
                </div>
                {treatment.conditions ? (
                  <em className="font-serif">{treatment.conditions}</em>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prices = await getPayloadPriceGroups();

  return {
    props: {
      prices,
    },
  };
};
