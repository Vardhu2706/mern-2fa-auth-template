import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import QRCodeComp from "../components/QRCode";

const RegisterScreen = () => {
  // State Variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  // Getting User Info from state
  const { userInfo } = useSelector((state) => state.auth);

  // Using useEffect to redirect if logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Registered!");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={registerHandler}>
          {/* Name */}
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Email */}
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Enter Password */}
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Confirm Submit */}
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* OTP */}
          <Form.Group className="my-2" controlId="otp">
            <QRCodeComp />
            <Form.Label>Scan & Enter OTP</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Loader / Button */}
          {isLoading ? (
            <Loader />
          ) : (
            <Button type="submit" variant="primary" className="mt-3">
              Sign Up
            </Button>
          )}

          <Row className="py-3">
            <Col>
              {" "}
              New Customer? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
