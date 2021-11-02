import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HighlightOutlined, RestOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { removeFixed } from "../../functions/fixed";

const Table = ({ columns, data }) => {
  //
  let { user, book } = useSelector((state) => ({ ...state }));

  //
  let dispatch = useDispatch();

  // Creación de Headers
  const columnName = () =>
    columns.map((col) => <th key={col.toString()}>{col}</th>);

  const editData = (type, slug) => {
    let idAux = book ? book.id++ : 1;

    if (type == "delete") {
      // Eliminación de registro
      try {
        removeFixed(user.token, slug)
          .then(({ data }) => {
            toast.success("Remove Fixed Expense " + data.detail + " Succes");

            dispatch({
              type: "ACTUALIZAR_BOOK",
              payload: {
                id: idAux,
              },
            });
          })
          .catch((error) => console.log(error));
      } catch (error) {
        toast.success("Error Remove Fixed Expense " + data.detail);
      }
      //
    } else {
      // Actualización de registro
    }
  };

  return (
    <div style={{ height: "300px" }}>
      <table style={{ width: "100%", overflow: "scroll" }}>
        <thead
          className="header-table"
          style={{
            background: "#daffe1",
          }}
        >
          <tr>{columnName()}</tr>
        </thead>
        <tbody>
          {data &&
            data.map((element) => (
              <tr key={element.detail.toString()}>
                <td className="td-table">{element.detail}</td>
                <td className="td-table">{element.cost}</td>
                <td className="td-table">{element.expiration.split("T")[0]}</td>
                <td className="td-table">
                  {element.payment_date.split("T")[0]}
                </td>
                <td className="td-table">{element.observations}</td>
                <td className="td-table">{element.category}</td>
                <td className="td-table">{element.createdAt.split("T")[0]}</td>
                <td className="td-table">{element.updatedAt.split("T")[0]}</td>
                <td>
                  <HighlightOutlined
                    onClick={() => editData("edit", element.slug)}
                    style={{
                      color: "orange",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                    title={"Editar registro de " + element.detail}
                  />
                </td>
                <td>
                  <RestOutlined
                    onClick={() => editData("delete", element.slug)}
                    style={{
                      color: "red",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                    title={"Eliminar registro de " + element.detail}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
