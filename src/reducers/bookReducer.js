export const bookReducer = (state = null, action) => {
  switch (action.type) {
    case "ACTUALIZAR_BOOK":
      return {
        ...state,
        id: action.payload,
      };

    case "ID_BOOK":
      return {
        ...state,
        id_book: action.payload,
      };

    default:
      return state;
  }
};
