import React, { Component } from "react";
import "./login.css";
// import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { login } from "../../../api/user.api";
import { setUser } from "../../../common/localStorage";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {
        email: "",
        password: "",
        login: "",
      },
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    if (!value) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [name]: [name] + " is not empty",
        },
      }));
    } else {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [name]: "",
        },
      }));
    }
    this.setState({
      [name]: value,
    });
  };
  loginForm = async () => {
    const { email, password } = this.state;
    const form = {
      email,
      password,
    };
    this.setState({
      loading: true,
    });
    await login(form)
      .then((res) => {
        console.log('hehe',res.data.user.id)
        this.setState({
          loading: false,
        });
        setUser("user", res.data.user.id);
        const { history } = this.props;
        history.push("/");
        window.location.href = "/";
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          disabled={loading}
                          name="email"
                          value={email}
                          placeholder="Email"
                          autoComplete="username"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </CInputGroup>
                      <div className="text-danger empty-email-password">
                        {errors.email}
                      </div>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          disabled={loading}
                          name="password"
                          value={password}
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </CInputGroup>
                      <div className="text-danger empty-email-password">
                        {errors.password}
                      </div>
                      <CRow>
                        <CCol>
                          <br />
                          <CButton
                            color="primary"
                            disabled={loading || !email || !password}
                            className="px-12  col-sm-12 col-md-3 offset-md-4"
                            onClick={() => this.loginForm()}
                          >
                            Login
                          </CButton>
                          {loading && (
                            <span>
                              &ensp;
                              <CSpinner color="info" size="sm" />
                            </span>
                          )}
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
