import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Col } from "antd";
import { LockOutlined } from "@ant-design/icons";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count it equal to 0
    count === 0 && history.push("/");

    // Limpiar intervalo con clearInterval "funcioón nativa"
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <div className="container">
        <div className="row">
          <Col span={12} offset={6}>
            <div
              style={{
                border: "1px solid #cbcbcb",
                padding: "30px",
                marginTop: "150px",
                textAlign: "center",
                borderRadius: "20px",
              }}
            >
              <p>¡Acceso restringido!</p>

              <LockOutlined
                style={{
                  fontSize: "80px",
                  color: "gray",
                  marginBottom: "10px",
                }}
              />
              <p>Redirigiéndote en {count} segundos</p>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
