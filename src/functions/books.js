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
export const removeBook = async (authtoken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/book/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createBook = async (authtoken, id_user, title) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/book`,
    {
      id_user,
      title,
    },
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
