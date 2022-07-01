export const actionType = {
    SET_USER: "SET_USER",
    SET_PRODUCTS: "SET_PRODUCTS",
    SET_CART_SHOW: "SET_CART_SHOW",
    SET_CARTITEMS: "SET_CARTITEMS",
};

const reducer = (state, action) => {
    // console.log(action);

    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
            };

        case actionType.SET_CART_SHOW:
            return {
                ...state,
                cartShow: action.cartShow,
            };

        case actionType.SET_CARTITEMS:
            // console.log(action.cartItems)
            // console.log(state.cartItems)
            return {
                ...state,
                cartItems: action.cartItems,
            };

        default:
            return state;
    }
};

export default reducer;
