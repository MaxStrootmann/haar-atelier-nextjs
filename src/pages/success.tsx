import { useEffect, useContext } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import Types from "reducers/cart/types";
import MetaHead from "components/MetaHead";
import Link from "next/link";

const Success = () => {
  const { dispatch } = useContext(CartItemsContext);

  useEffect(() => {
    const removeAllCartItems = () => {
      dispatch({
        type: Types.removeAllItems
      });
    };

    removeAllCartItems();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-8">
      <MetaHead
        title={"Success"}
        description={
          "Bedankt voor je aankoop bij Haar Atelier Alkmaar. Je pakketje komt zo snel mogelijk jouw kant op!"
        }
      />
      <div>
        <p className="text-center text-lg mt-10 font-serif max-w-md">
        Bedankt voor je aankoop bij Haar Atelier Alkmaar. Je pakketje komt zo snel mogelijk jouw kant op!
        </p>
      </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-max">
              <Link
                href={
                  "https://search.google.com/local/writereview?placeid=ChIJswbAqjhXz0cR5FuCddWvvyE"
                }
              >
                <div className="bg-accent-500 rounded-lg px-4 py-2 text-white w-full text-center">
                Review achterlaten
                </div>
              </Link>
            </div>
            <div className="w-max">
              <Link href={"/shop"}>
                <div className="border border-white bg-black bg-opacity-30 rounded-lg px-4 py-2 text-white w-full text-center">
                  Terug naar de shop
                </div>
              </Link>
            </div>
          </div>
        </div>
  );
};

export default Success;
