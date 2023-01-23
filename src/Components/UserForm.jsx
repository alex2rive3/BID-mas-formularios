import React, { useState, useRef } from "react";
import { BoxStyled, Label, Input, MsgError, Form, Button } from "./BoxStyled";
const UserForm = (props) => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        match: false,
    });

    const passwordRef = useRef(null);
    const cPasswordRef = useRef(null);

    const [iguales, setIguales] = useState(true);

    const validarNameAndLastName = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        switch (name) {
            case "firstName":
                value.length < 2 && value.length !== 0
                    ? setErrors({
                          ...errors,
                          firstNameError: "Nombre tiene menos de 2 caracteres",
                      })
                    : setErrors({
                          ...errors,
                          firstNameError: "",
                      });
                break;
            case "lastName":
                value.length < 2 && value.length !== 0
                    ? setErrors({
                          ...errors,
                          lastNameError: "Apellido tiene menos de 2 caracteres",
                      })
                    : setErrors({
                          ...errors,
                          lastNameError: "",
                      });
                break;
            default:
                break;
        }
    };
    const validarEmail = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        if (name === "email" && value.length < 5 && value.length !== 0) {
            setErrors({
                ...errors,
                emailError: "Email tiene menos de 5 caracteres",
            });
        } else {
            setErrors({
                ...errors,
                emailError: "",
            });
        }
    };

    const validarPasword = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        switch (name) {
            case "password":
                value.length < 8 && value.length !== 0
                    ? setErrors({
                          ...errors,
                          passwordError:
                              "Contraseña debe tener al menos 8 caracteres",
                      })
                    : setErrors({
                          ...errors,
                          passwordError: "",
                      });
                break;
            case "confirmPassword":
                value.length < 8 && value.length !== 0
                    ? setErrors({
                          ...errors,
                          confirmPasswordError:
                              "Contraseña debe tener al menos 8 caracteres",
                      })
                    : setErrors({
                          ...errors,
                          confirmPasswordError: "",
                      });
                break;
            default:
                break;
        }
        const valorPassword = passwordRef.current.value;
        const valorConfPassword = cPasswordRef.current.value;

        setIguales(valorPassword === valorConfPassword);
    };

    const createUser = (e) => {
        e.preventDefault();
        const newUser = { form };
        const { firstName, lastName } = newUser.form;
        if (
            Object.values(errors).filter(function (err) {
                return err !== "" && err !== false;
            }).length === 0
        ) {
            console.log("Welcome", firstName, lastName);
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                confirmPassword: "",
                password: "",
            });
        } else {
            console.log("Completa correctamente el Formulario");
        }
    };
    const { firstName, lastName, email, confirmPassword, password } = form;

    const {
        firstNameError,
        lastNameError,
        emailError,
        passwordError,
        confirmPasswordError,
    } = errors;
    return (
        <Form>
            <BoxStyled>
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                    onChange={validarNameAndLastName}
                    type="text"
                    name="firstName"
                    value={firstName}
                ></Input>
            </BoxStyled>
            {firstNameError ? <MsgError>{firstNameError} </MsgError> : ""}
            <BoxStyled>
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                    onChange={validarNameAndLastName}
                    type="text"
                    name="lastName"
                    value={lastName}
                ></Input>
            </BoxStyled>
            {lastNameError ? <MsgError> {lastNameError} </MsgError> : ""}
            <BoxStyled>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                    onChange={validarEmail}
                    type="text"
                    name="email"
                    value={email}
                ></Input>
            </BoxStyled>
            {emailError ? <MsgError> {emailError} </MsgError> : ""}
            <BoxStyled>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    onChange={validarPasword}
                    type="password"
                    name="password"
                    ref={passwordRef}
                    value={password}
                ></Input>
            </BoxStyled>
            {passwordError ? <MsgError> {passwordError} </MsgError> : ""}

            <BoxStyled>
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                    onChange={validarPasword}
                    type="password"
                    name="confirmPassword"
                    ref={cPasswordRef}
                    value={confirmPassword}
                ></Input>
            </BoxStyled>
            {confirmPasswordError ? (
                <MsgError> {confirmPasswordError} </MsgError>
            ) : (
                ""
            )}
            {iguales ? (
                ""
            ) : (
                <MsgError>Las contraseñas deben ser iguales</MsgError>
            )}

            <Button onClick={createUser}>Registrar</Button>
        </Form>
    );
};

export default UserForm;
