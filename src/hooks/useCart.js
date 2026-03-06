import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQty, clearCart } from "../store/actions";
import {
  selectCartItems,
  selectCartTotalQty,
  selectCartSubtotal,
} from "../store/selectors";
import { DELIVERY_THRESHOLD, DELIVERY_FEE } from "../data/desserts";

const useCart = () => {
  const dispatch   = useDispatch();
  const items      = useSelector(selectCartItems);
  const totalQty   = useSelector(selectCartTotalQty);
  const subtotal   = useSelector(selectCartSubtotal);
  const delivery   = subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total      = subtotal + delivery;
  const toFreeShip = Math.max(0, DELIVERY_THRESHOLD - subtotal);

  return {
    items,
    totalQty,
    subtotal,
    delivery,
    total,
    toFreeShip,
    addToCart:     (item)    => dispatch(addToCart(item)),
    removeFromCart:(id)      => dispatch(removeFromCart(id)),
    updateQty:     (id, qty) => dispatch(updateQty(id, qty)),
    clearCart:     ()        => dispatch(clearCart()),
  };
};

export default useCart;