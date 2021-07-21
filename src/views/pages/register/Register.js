import React, { Component } from "react";
import "./register.css";
import {
  CContainer,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CCardGroup,
  CCard,
  CButton,
  CSelect,
  CCardFooter,
} from "@coreui/react";
import { getUserById, register, update } from "../../../api/user.api";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      id: "",
      name: "",
      email: "",
      password: "",
      role: "",
      loading: false,
      errors: {
        name: "",
        email: "",
        password: "",
        role: "",
      },
    };
  }
  componentDidMount = async () => {
    await getUserById(this.props.match.params.id)
      .then((res) => {
        var data = res.data;
        this.setState({
          name: data.name,
          email: data.email,
          role: data.role,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  registerForm = async () => {
    const { email, password, name, role } = this.state;
    const { id } = this.props.match.params;
    const form = {
      email,
      password,
      name,
      role,
    };
    this.setState({
      loading: true,
    });
    if (id) {
      await update(id, form)
        .then((res) => {
          var data = res.data;
          this.setState({
            loading: false,
            name: data.name,
            email: data.email,
            role: data.role,
          });
          const { history } = this.props;
          history.push("/");
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
        });
    } else {
      await register(form)
        .then((res) => {
          this.setState({
            loading: false,
          });
          const { history } = this.props;
          history.push("/");
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
        });
    }
  };
  handleChange = (event) => {
    const { value, name } = event.target;
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

  render() {
    const { email, name, password, errors } = this.state;
    return (
      <div className=" align-items-center">
        <div className="container">
          <div className="row">
            {this.props.match.params.id ? (
              <h1 className="col-md-4 offset-md-4 text-edit">Edit</h1>
            ) : (
              <h1 className="col-md-4 offset-md-4 text-edit">Register</h1>
            )}
          </div>
        </div>
        <CContainer onSubmit={this.onSave}>
          <CRow className="justify-content-center">
            <CCol md="6">
              <CCardGroup>
                <CCard className="p-4">
                  <CFormGroup>
                    <CLabel>Email</CLabel>
                    <CInput
                      className="mb-3"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Please enter your email"
                      autoComplete="email"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                  </CFormGroup>
                  <div className="text-danger empty-email-password">
                    {errors.email}
                  </div>
                  <CFormGroup>
                    <CLabel>Name</CLabel>
                    <CInput
                      className="mb-3"
                      type="name"
                      id="name"
                      name="name"
                      value={name}
                      placeholder="Please enter your name"
                      autoComplete="current-name"
                      onChange={(event) => this.handleChange(event)}
                    />
                  </CFormGroup>
                  <div className="text-danger empty-email-password">
                    {errors.name}
                  </div>
                  <CFormGroup>
                    <CLabel> Role :</CLabel>
                    <CSelect
                      name="role"
                      custom
                      size="md"
                      id="selectLg"
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      <option>Please select</option>
                      <option value="user">User</option>
                      <option value="adimin">Admin</option>
                    </CSelect>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Password</CLabel>
                    <CInput
                      className="mb-3"
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      placeholder="Please enter your password"
                      autoComplete="current-password"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                  </CFormGroup>
                  <div className="text-danger empty-email-password">
                    {errors.password}
                  </div>

                  <CCardFooter className="p-4">
                    <CRow>
                      <CCol xs="12" md="6" sm="6" className="mb-1">
                        {this.props.match.params.id ? (
                          <CButton
                            disabled={!name || !email || !password}
                            color="success"
                            block
                            onClick={() => this.registerForm()}
                          >
                            Update
                          </CButton>
                        ) : (
                          <CButton
                            disabled={!name || !email || !password}
                            color="success"
                            block
                            onClick={() => this.registerForm()}
                          >
                            Register
                          </CButton>
                        )}
                      </CCol>
                      <CCol xs="12" md="6" sm="6" className="mb-1">
                        <CButton
                          color="success"
                          block
                          onClick={() => this.props.history.push("/")}
                        >
                          Cancel
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardFooter>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Register;
