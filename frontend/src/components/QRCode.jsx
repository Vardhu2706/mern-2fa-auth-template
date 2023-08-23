import { Col, Container, Row } from "react-bootstrap";
import { useGetQRCodeMutation } from "../slices/usersApiSlice";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const QRCodeComp = () => {
  const [getQRCode, { isLoading }] = useGetQRCodeMutation();
  const [qrCode, setQRCode] = useState("");
  const [id, setId] = useState("");
  const [secret, setSecret] = useState("");

  useEffect(() => {
    const res = getQRCode();
    res.then((data) => {
      setQRCode(data.data.otpAuthURL);
      setId(data.data.id);
      setSecret(data.data.secret);
    });
  }, [getQRCode]);

  return (
    <>
      <Container>
        <Row></Row>
        <Row className="justify-content-md-center m-2">
          <Col xs={12} md={6} className="card p-2">
            {isLoading ? (
              <Loader />
            ) : (
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrCode}
                viewBox={`0 0 100 100`}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QRCodeComp;
