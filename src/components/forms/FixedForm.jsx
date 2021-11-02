import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createFixed } from "../../functions/fixed";

import { Button, Row, Col } from "antd";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";

const FixedForm = () => {
  const [detail, setDetail] = useState();
  const [cost, setCost] = useState();
  const [expiration, setExpiration] = useState();
  const [payment, setPayment] = useState();
  const [category, setCategory] = useState();
  const [observations, setObservations] = useState();

  const { user, book } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const validateForm = () => {
    if (detail && cost && expiration && payment && category && observations) {
      sendForm();
    } else {
      toast.error("Debe completar todos los campos");
    }
  };

  const sendForm = () => {
    let idAux = book.id ? book.id++ : 0;

    console.log("idAux: " + idAux);

    try {
      createFixed(
        book.id_book.id_book,
        detail,
        cost,
        expiration,
        payment,
        category,
        observations,
        user.token
      )
        .then(({ data }) => {
          dispatch({
            type: "ACTUALIZAR_BOOK",
            payload: {
              id: idAux,
              id_book: book.id_book,
            },
          });

          toast.success("Fixed Expense " + data.detail + " Succes");

          // Limpiar state
          setDetail("");
          setCost("");
          setExpiration("");
          setPayment("");
          setCategory("");
          setObservations("");
        })
        .catch((error) => console.log(error));
    } catch (error) {}
  };

  return (
    <div className="add-form">
      <form action="">
        <Row>
          {/* Detail */}
          <Col>
            <div>Detail</div>
            <input
              type="text"
              className="form-control inputDiegoInLine mr-3"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </Col>

          {/* Cost */}
          <Col>
            <div>Cost</div>
            <input
              type="number"
              min="0"
              className="form-control inputDiegoInLine mr-3"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </Col>

          {/* Expiration */}
          <Col>
            <div>Expiration</div>
            <input
              type="Date"
              className="form-control inputDiegoInLine mr-3"
              style={{ marginTop: "-2px" }}
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </Col>

          {/* Payment date */}
          <Col>
            <div>Payment date</div>
            <input
              type="Date"
              className="form-control inputDiegoInLine mr-3"
              style={{ marginTop: "-2px" }}
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            />
          </Col>

          {/* Category */}
          <Col>
            <div>Category</div>
            <select
              className="form-control inputDiegoInLine mr-3"
              style={{
                width: "170px",
                padding: "11px",
                fontSize: "16px",
                marginTop: "-3px",
              }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              value={""}
            >
              <option value="">-Seleccionar-</option>
              <option value="Alimentación">Alimentación</option>
              <option value="Belleza y Salud">Belleza y Salud</option>
              <option value="Credito">Credito</option>
              <option value="Educación">Educación</option>
              <option value="Gastos comunes">Gastos comunes</option>
            </select>
          </Col>

          {/* Payment date */}
          <Col style={{ width: "26%" }}>
            <div>Observations</div>
            <input
              type="text"
              className="form-control inputDiegoInLine mr-3"
              style={{
                paddingTop: "5px !important",
                width: "100%",
              }}
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </Col>

          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={() => validateForm()}
          />
        </Row>
      </form>
    </div>
  );
};

export default FixedForm;
