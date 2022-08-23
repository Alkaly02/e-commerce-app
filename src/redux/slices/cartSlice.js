import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    deleteCart: (state) => {
      state.length = 0
      return state
    },
    firstAddToCart: (state, { payload }) => {
      const {
        categoryId,
        description,
        id: productId,
        imgUrl,
        name,
        ownedShop,
        prix,
        stock,
      } = payload;
      const newProductToCart = {
        quantities: 1,
        categoryId,
        description,
        productId,
        imgUrl,
        name,
        ownedShop,
        prix,
        stock,
        totalPrix: prix,
      };
      state.push(newProductToCart);
    },
    increment: (state, { payload }) => {
      const selectedProduct = state.find(
        (product) => product.productId === payload
      );
      const index = state.indexOf(selectedProduct);
      const selectedProductCopy = { ...selectedProduct };
      const stateCopy = [...state];

      selectedProductCopy.quantities++;
      selectedProductCopy.totalPrix =
        selectedProductCopy.prix * selectedProductCopy.quantities;
      stateCopy[index] = selectedProductCopy;

      return (state = stateCopy);
    },
    decrement: (state, { payload }) => {
      const selectedProduct = state.find(
        (product) => product.productId === payload
      );
      const index = state.indexOf(selectedProduct);
      const selectedProductCopy = { ...selectedProduct };
      let stateCopy = [...state];

      if (selectedProductCopy.quantities === 1) {
        stateCopy = stateCopy.filter(
          (product) => product.productId !== payload
        );

        return stateCopy;
      }

      selectedProductCopy.quantities--;
      selectedProductCopy.totalPrix =
        selectedProductCopy.prix * selectedProductCopy.quantities;
      stateCopy[index] = selectedProductCopy;

      return (state = stateCopy);
    },
    deleteInCart: (state, { payload }) => {
      let stateCopy = [...state];
      stateCopy = stateCopy.filter((product) => product.productId !== payload);

      return stateCopy;
    },
  },
});

export const { firstAddToCart, increment, decrement, deleteInCart, deleteCart } =
  cartSlice.actions;

export default cartSlice.reducer;
