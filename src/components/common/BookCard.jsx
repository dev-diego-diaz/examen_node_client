import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { BookOutlined } from "@ant-design/icons";

const BookCard = ({ title, created, updated, slug }) => {
  return (
    <Row justify="center" align="center" className="rowStyle">
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
        </Col>
      </Link>
    </Row>
  );
};

export default BookCard;
