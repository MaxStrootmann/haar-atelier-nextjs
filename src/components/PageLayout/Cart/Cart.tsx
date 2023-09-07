import React, { useContext, useEffect, useState } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import ItemList from "./ItemList";
import classNames from "classnames";
import { CartProduct } from "lib/interfaces";
import getStripe from "lib/stripe/getStripe";

const Cart = () => {
  const [isRedirecting, setRedirecting] = useState(false);
  const { cart } = useContext(CartItemsContext);
  const { cartVisibility, toggleCartVisibility } = useContext(
    CartVisibilityContext
  );

  const subTotal = cart
    .reduce((total, item: CartProduct) => {
      return (total += item.price * (item.quantity ?? 1));
    }, 0)
    .toFixed(2);

  const shippingCalc = cart.reduce((total, item: CartProduct) => {
    return (total += item.price * (item.quantity ?? 1));
  }, 0);

  let finalPrice = 0;

  if (shippingCalc >= 75) {
    finalPrice = shippingCalc;
  } else {
    finalPrice = shippingCalc + 6;
  }

  const finalPriceFormatted = finalPrice.toFixed(2).replace(".", ",");

  const handleCheckout = async () => {
    setRedirecting(true);

    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart }),
    });

    if (response?.status == 500) return;

    const data = await response.json();

    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  useEffect(() => {
    if (cartVisibility) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [cartVisibility]);

  return (
    <>
      <div
        onClick={toggleCartVisibility}
        className={classNames(
          "fixed w-screen h-screen opacity-30 bg-black z-20",
          { hidden: !cartVisibility }
        )}
      ></div>
      <div
        className={classNames(
          "fixed h-screen w-screen sm:w-96 right-0 sm:h-[calc(100vh-4rem)] z-30 bg-white ",
          { hidden: !cartVisibility },
          { "": cart.length === 0 }
        )}
      >
        {cart.length > 0 ? (
          <div className="h-full">
            <div className="hide-scrollbar overflow-y-auto h-[26rem] mr-4 bg-white">
              <h2 className="my-4 ml-7 font-bold">Winkelwagen</h2>
              {cart && <ItemList products={cart} />}
            </div>
            <div className="p-4 border-t bg-gray-50 border-grey-300 reverse-shadow-md h-full flex flex-col gap-1">
              <div className=""></div>
              <div className="flex justify-between">
                <span className="">Subtotaal</span>
                <span className="">€{subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="">Verzending(gratis vanaf €75,-)</span>
                <span className="">
                  {shippingCalc >= 75 ? "Gratis" : "€6,00"}
                </span>
              </div>
              <div className="border border-black my-2"></div>
              <div className="flex justify-between -mt-2 mb-1">
                <span className="">Totaalprijs (inclusief btw)</span>
                <span className="">${finalPriceFormatted}</span>
              </div>
              <div>
              <button
                disabled={isRedirecting}
                className="bg-accent-500 py-2 px-2 my-3 rounded-lg text-white w-full"
                onClick={handleCheckout}
              >
                {isRedirecting ? `even wachten...` : `Naar bestellen`}
              </button>
              <button
                disabled={isRedirecting}
                className="border border-black py-2 px-2 rounded-lg w-full"
                onClick={toggleCartVisibility}
              >
                Verder winkelen
              </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h4 className="">Je hebt geen artikelen in je winkelwagen.</h4>
            <button onClick={toggleCartVisibility} className="">
              Verder winkelen
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
