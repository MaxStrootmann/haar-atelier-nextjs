import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { ProductSchema } from "lib/interfaces";
import CartItemsContext from "contexts/cartItemsContext";
import Types from "reducers/cart/types";
import { toPlainText } from "@portabletext/react";
import productsSlugsQuery from "lib/sanity/queries/products_slugs";
import productQuery from "lib/sanity/queries/product";
import urlFor from "lib/sanity/urlFor";
import client from "lib/sanity/client";
import MetaHead from "components/MetaHead";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ProductProps {
  product: ProductSchema;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { toggleCartVisibility } = useContext(CartVisibilityContext);
  const { dispatch } = useContext(CartItemsContext);

  if (!product) {
    return <div>Loading...</div>; // or some error message
  }

  const addToCart = () => {
    const productWithQuantity = { ...product, quantity };
    dispatch({
      type: Types.addToCart,
      payload: productWithQuantity,
    });

    toggleCartVisibility();
  };

  const displayedPrice = product?.price?.toFixed(2).replace(".", ",");

  const descriptions = product.description;
  const formattedDescriptions = descriptions.filter((description) => toPlainText(description).replace(/\n/g, '<br>'))
  
      

  return (
    <>
      {product?.name && (
        <MetaHead
          title={product.name}
          description={toPlainText(product.description)}
        />
      )}
      {product?.subcategories && (
        <div className="flex sm:flex-row flex-col justify-between w-full max-w-2xl mx-auto sm:mt-0 mb-9 ">
          <Link href={`/category/${product.subcategories[0].slug}`}>
            «{product.subcategories[0].title}
          </Link>
        </div>
      )}
      <div className="flex sm:flex-row flex-col justify-between w-full max-w-2xl mx-auto sm:mt-8 mt-3 mb-24">
        <div className="overflow-hidden relative sm:w-2/5 w-full sm:mb-0 mb-10 h-96 md:h-[32rem]">
          {product?.featured_image && (
            <Image
              src={urlFor(product.featured_image).url()}
              fill={true}
              sizes="(min-width: 640px) 252px, 100vw"
              style={{ objectPosition: "center", objectFit: "cover" }}
              priority={true}
              alt={product.name}
            />
          )}
        </div>
        <div className="sm:w-3/5 w-full sm:pl-6 sm:pr-0 pl-5 pr-5 ">
          <h1 className="text-4xl text-left font-bold mb-8">{product?.name}</h1>
          <h2 className="mb-6"></h2>
          {product?.description && (
            <div className="text-sm mb-5">
              <div className="space-y-4">
                {formattedDescriptions.map((block: any) => (
                  <p key={block._key}>
                    {block.children.map((span: any) => {
                      if (span.marks.includes("em")) {
                        return <em key={span._key}>{span.text}</em>;
                      }
                      return span.text;
                    })}
                  </p>
                ))}
                <div className="my-4">
                  <span className="text-2xl text-black">€{displayedPrice}</span>
                </div>
              </div>
            </div>
          )}

          {product.in_stock ? (
            <>
              <div className="flex justify-between items-center w-full border border-black rounded-lg text-xl mb-4 px-3 py-1">
                <button
                  id="decrease-quantity"
                  aria-label="Verminder aantal"
                  className="align-middle"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <AiOutlineMinus />
                </button>
                <span>{quantity}</span>
                <button
                  id="increase-quantity"
                  aria-label="Vermeerder aantal"
                  className="align-middle"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <AiOutlinePlus />
                </button>
              </div>

              <button
                id="add-to-cart"
                aria-label="Voeg toe aan winkelmandje"
                onClick={addToCart}
                className="bg-accent-500 py-2 w-full rounded-lg text-white text-lg"
              >
                Voeg toe
              </button>
            </>
          ) : (
            <div>Niet op voorraad</div>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await client.fetch<ProductSchema>(productQuery, {
    slug: params?.slug as string,
  });

  if (!product) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { product },
    revalidate: 100,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(productsSlugsQuery);

  const paths = slugs.map((item: { slug: string }) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Product;
