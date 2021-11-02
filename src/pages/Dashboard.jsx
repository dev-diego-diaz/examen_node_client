import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Divider, Row, Col, Modal } from "antd";
import { PlusOutlined, MehOutlined } from "@ant-design/icons";

import BookCard from "../components/common/BookCard";

import { createBook, listBooks } from "../functions/books";

const Dashboard = () => {
  //
  const { user, book } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  let bookArray = [];

  const [data, setData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleBook, setTitleBook] = useState();

  useEffect(() => {
    BooksList();
  }, [book]);

  const BooksList = () => {
    try {
      listBooks(user.token)
        .then(({ data }) => {
          data.map((book) => {
            bookArray.push({
              title: book.title,
              created: book.createdAt.split("T")[0],
              updated: book.updatedAt.split("T")[0],
              slug: book.slug,
            });
          });
          setData(bookArray);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error(
        <div style={{ justifyContent: "justify" }}>
          {"Error al consultar libros de contabilidad"}
        </div>
      );
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const validateNewBook = () => {
    if (titleBook) {
      sendNewBook();
    } else {
      toast.error("You must complete all the fields");
    }
  };

  const sendNewBook = () => {
    let idAux = book && book.id ? book.id++ : 0;

    try {
      createBook(user.token, user._id, titleBook)
        .then(({ data }) => {
          dispatch({
            type: "ACTUALIZAR_BOOK",
            payload: {
              id: idAux,
              id_book: book.id_book,
            },
          });

          // Cerrar modal
          handleCancel();

          // Limpiar campos
          setTitleBook("");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      toast.error("Error creating book");
    }
  };

  return (
    <div>
      <Row type="flex">
        <Col flex={1}>
          <div
            style={{
              padding: "10px 30px",
              fontSize: "20px",
              marginBottom: "-25px",
              fontWeight: 500,
            }}
          >
            Books of contability
          </div>
        </Col>

        <Col style={{ paddingRight: "20px" }}>
          {user && user.role === "admin" && (
            <p
              style={{
                paddingTop: "15px",
                marginBottom: "-25px",
              }}
            >
              <Button
                onClick={showModal}
                size={"small"}
                shape="round"
                icon={<PlusOutlined />}
              >
                New Book
              </Button>
            </p>
          )}
        </Col>
        <Divider />
      </Row>

      <Row type="flex" style={{ padding: "10px 30px" }}>
        {data ? (
          data.map((book) => (
            <BookCard
              key={book.slug}
              title={book.title}
              created={book.created}
              updated={book.updated}
              slug={book.slug}
              role={user.role}
            />
          ))
        ) : (
          <Row
            justify="center"
            align="center"
            style={{
              width: "100%",
              marginTop: "150px",
            }}
          >
            <Col
              span={100}
              justify="center"
              align="center"
              style={{ padding: "10px", fontSize: "20px" }}
            >
              books not found
              <MehOutlined style={{ paddingLeft: "5px" }} />
            </Col>
          </Row>
        )}
      </Row>

      <Modal
        title="New Book"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Row>
          {/* Detail */}
          <Col className="w-100">
            <div>Title</div>
            <input
              type="text"
              className="form-control inputDiegoInLine mr-3 w-100"
              value={titleBook}
              onChange={(e) => setTitleBook(e.target.value)}
            />
            <Button
              onClick={validateNewBook}
              type="primary"
              className="mb-3"
              block
              size="large"
            >
              Create book
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Dashboard;
