import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import CartService from "services/CartService";

const CartReducer = (
  state = { items: [], totalPrice: 0, totalItems: 0 },
  action
) => {
  const itemsInCart = state.items;
  let totalPrice = state.totalPrice;
  let totalItems = state.totalItems;
  const newItem = action.payload;

  switch (action.type) {
    // case "ADD": // Add item to cart
    //   let quantity = 1;
    //   let newItemIsInCart = false;
    //   let itemInCart;

    //   for (const item of itemsInCart) {
    //     if (item.id === newItem.id) {
    //       quantity += item.quantity;
    //       newItemIsInCart = true;
    //       itemInCart = item;

    //       break;
    //     }
    //   }

    //   CartService.addItem(newItem.id, quantity)
    //     .then((response) => {
    //       if (newItemIsInCart) {
    //         itemInCart.quantity = quantity;
    //       } else {
    //         itemsInCart.push({ ...newItem, quantity: 1 });
    //       }

    //       totalItems += 1;
    //       totalPrice += newItem.price;

    //       return {
    //         items: itemsInCart,
    //         totalPrice: totalPrice,
    //         totalItems: totalItems,
    //       };
    //     })
    //     .catch((error) => {
    //       return state;
    //     });
    //   break;
    case "ADD": // Add item to cart
      let quantity = 1;
      let newItemIsInCart = false;
      let itemInCart;

      for (const item of itemsInCart) {
        if (item.id === newItem.id) {
          quantity += item.quantity;
          newItemIsInCart = true;
          itemInCart = item;

          break;
        }
      }

      CartService.addItem(newItem.id, quantity)
        .then((response) => {
          if (newItemIsInCart) {
            itemInCart.quantity = quantity;
          } else {
            itemsInCart.push({ ...newItem, quantity: 1 });
          }

          totalItems += 1;
          totalPrice += newItem.price;

          return {
            items: itemsInCart,
            totalPrice: totalPrice,
            totalItems: totalItems,
          };
        })
        .catch((error) => {
          return state;
        });
      break;
    case "REMOVE": // Remove item from cart
      HELPER.HTTP.executeDelete(ENDPOINTS.REMOVE_CART_ITEM, newItem)
        .then((response) => {
          for (const [index, item] of itemsInCart.entries()) {
            if (item.id === newItem.id) {
              if (item.quantity > 1) {
                item.quantity -= 1;
              } else {
                itemsInCart.splice(index, 1);
              }

              totalItems -= 1;
              totalPrice -= item.price;

              break;
            }
          }

          return {
            items: itemsInCart,
            totalPrice: totalPrice,
            totalItems: totalItems,
          };
        })
        .catch((error) => {
          return state;
        });
      break;
    default:
      return state;
  }
};

export default CartReducer;
