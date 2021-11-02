import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Divider, Row, Col } from "antd";
import { PlusOutlined, MehOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import BookCard from "../components/common/BookCard";

import { listBooks } from "../functions/books";

const Dashboard = () => {
  let { user } = useSelector((state) => ({ ...state }));
  let bookArray = [];

  const [data, setData] = useState();

  useEffect(() => {
    BooksList();
  }, [user]);

  const BooksList = () => {
    try {
      listBooks()
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
              <Button size={"small"} shape="round" icon={<PlusOutlined />}>
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
    </div>
  );
};

export default Dashboard;
