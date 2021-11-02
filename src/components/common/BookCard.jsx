import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Row, Col } from "antd";
import { BookOutlined, CloseOutlined } from "@ant-design/icons";

import { removeBook } from "../../functions/books";

const BookCard = ({ title, created, updated, slug, role }) => {
  //
  const { user, book } = useSelector((state) => ({ ...state }));

  //
  let dispatch = useDispatch();

  const deleteBook = (slug_id) => {
    //
    let idAux = book && book.id ? book.id++ : 0;

    try {
      removeBook(user.token, slug_id)
        .then(({ data }) => {
          //
          dispatch({
            type: "ACTUALIZAR_BOOK",
            payload: {
              id: idAux,
            },
          });

          //
          toast.error(`Delete ${data.title} success`);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };

  return (
    <Row justify="center" align="center" className="rowStyle">
      <Col>
        <Row justify="end">
          {role == "admin" && (
            <CloseOutlined
              onClick={() => deleteBook(slug)}
              style={{ marginTop: "5px", fontSize: "14px", color: "red" }}
            />
          )}
        </Row>
        <Link to={"/book/" + slug} className="link">
          <Col
            span={100}
            justify="center"
            align="center"
            style={{ padding: "10px" }}
          >
            <p>{title}</p>
            <BookOutlined style={{ fontSize: "80px" }} />
            <div style={{ paddingTop: "10px", fontSize: "11px" }}>
              Created: {created}
            </div>
            <div style={{ fontSize: "11px" }}>Updated: {updated}</div>

            {/* Boton eliminar */}
          </Col>
        </Link>
      </Col>
    </Row>
  );
};

export default BookCard;
