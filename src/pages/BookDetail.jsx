import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { detailBook } from "../functions/books";
import TabDetail from "../components/common/TabDetail";

const BookDetail = ({ match }) => {
  let { user, book } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  let dispatch = useDispatch();

  const [flagData, setFlagData] = useState(false);
  const [bookData, setBookData] = useState();
  const [fixed, setFixed] = useState();
  const [variable, setVariable] = useState();
  const [saving, setSaving] = useState();

  useEffect(() => {
    Book();
  }, [book]);

  const Book = () => {
    try {
      detailBook(slug, user.token)
        .then(({ data }) => {
          setBookData(data.theBook);
          setFixed(data.theFixed);
          setVariable(data.theVariable);
          setSaving(data.theSaving);

          if (!book) {
            dispatch({
              type: "ID_BOOK",
              payload: {
                id_book: data.theBook._id,
              },
            });
          } else if (book.id_book.id_book !== data.theBook._id) {
            dispatch({
              type: "ID_BOOK",
              payload: {
                id_book: data.theBook._id,
              },
            });
          }

          //   Flag
          setFlagData(true);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error(
        <div style={{ justifyContent: "justify" }}>
          {"Error al consultar detalle de libro"}
        </div>
      );
    }
  };

  return (
    <div
      style={{
        padding: "10px 30px",
      }}
    >
      <div style={{ marginTop: "15px" }}>
        <b>Name: </b> {flagData && bookData.title}
      </div>
      <div>
        <b>Created: </b> {flagData && bookData.createdAt.split("T")[0]}
      </div>
      <div>
        <b>Last change: </b> {flagData && bookData.updatedAt.split("T")[0]}
      </div>

      <TabDetail fixed={fixed} variable={variable} saving={saving} />
    </div>
  );
};

export default BookDetail;
