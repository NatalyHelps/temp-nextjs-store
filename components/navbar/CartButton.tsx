import { LuShoppingCart } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";

async function CartButton() {
  //temp
  const numItemsInCart = 9;

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center text-xs">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
