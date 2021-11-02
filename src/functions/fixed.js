import axios from "axios";

// Crear gasto fijo
export const createFixed = async (
  id_book,
  detail,
  cost,
  expiration,
  payment,
  category,
  observations,
  authtoken
) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/fixed`,
    {
      id_book,
      detail,
      cost,
      expiration,
      payment_date: payment,
      observations,
      category,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

// Eliminar gasto fijo
export const removeFixed = async (authtoken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/fixed/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
