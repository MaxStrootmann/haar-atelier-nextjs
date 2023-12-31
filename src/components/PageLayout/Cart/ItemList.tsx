import { CartProduct } from "lib/interfaces";
import Item from "./Item";

interface ItemListProps {
  products: CartProduct[];
}

const ItemList: React.FC<ItemListProps> = ({ products }) => {
  return (
    <div className="">
      {products.map((product) => (
        <Item key={product.slug} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
