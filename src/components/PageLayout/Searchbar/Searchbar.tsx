import SearchVisibilityContext from "contexts/searchVisibilityContext";
import { useContext, useEffect } from "react";
import classNames from "classnames";
import MyComboBox from "./MyComboBox";
import { CategorySchema, ProductSchema } from "lib/interfaces";

interface SearchbarProps {
  products: ProductSchema[];
}
const Searchbar: React.FC<SearchbarProps> = ({ products }) => {
  const { searchVisibility, toggleSearchVisibility } = useContext(
    SearchVisibilityContext
  );

  return (
    <>
      <div
        onClick={toggleSearchVisibility}
        className={classNames(
          "fixed w-screen h-screen opacity-30 bg-black z-20",
          {
            hidden: !searchVisibility,
          }
        )}
      ></div>
      <div
        className={classNames("z-50", {
          hidden: !searchVisibility,
        })}
      >
        <MyComboBox products={products} />
      </div>
    </>
  );
};

export default Searchbar;
