import axios from "axios";

export const listBooks = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/books`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const detailBook = async (slug, authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/book/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
