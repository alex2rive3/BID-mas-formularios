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

    const validar = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "firstName" && e.target.value.length < 2) {
            setErrors({
                ...errors,
                firstNameError: "Nombre tiene menos de 2 caracteres",
            });
        }
        if (
            e.target.name === "firstName" &&
            (e.target.value.length >= 2 || e.target.value.length === 0)
        ) {
            setErrors({
                ...errors,
                firstNameError: "",
            });
        }

        if (e.target.name === "lastName" && e.target.value.length < 2) {
            setErrors({
                ...errors,
                lastNameError: "Apellido tiene menos de 2 caracteres",
            });
        }
        if (
            e.target.name === "lastName" &&
            (e.target.value.length >= 2 || e.target.value.length === 0)
        ) {
            setErrors({
                ...errors,
                lastNameError: "",
            });
        }

        if (e.target.name === "email" && e.target.value.length < 5) {
            setErrors({
                ...errors,
                emailError: "Email tiene menos de 5 caracteres",
            });
        }
        if (
            e.target.name === "email" &&
            (e.target.value.length >= 5 || e.target.value.length === 0)
        ) {
            setErrors({
                ...errors,
                emailError: "",
            });
        }

        if (e.target.name === "password" && e.target.value.length < 8) {
            setErrors({
                ...errors,
                passwordError: "Contraseña debe tener al menos 8 caracteres",
            });
        }
        if (
            e.target.name === "password" &&
            (e.target.value.length >= 8 || e.target.value.length === 0)
        ) {
            setErrors({
                ...errors,
                passwordError: "",
            });
        }
        if (e.target.name === "confirmPassword" && e.target.value.length < 8) {
            setErrors({
                ...errors,
                confirmPasswordError:
                    "Contraseña debe tener al menos 8 caracteres",
            });
        }
        if (
            e.target.name === "confirmPassword" &&
            (e.target.value.length >= 8 || e.target.value.length === 0)
        ) {
            setErrors({
                ...errors,
                confirmPasswordError: "",
            });
        }
        const valorPassword = passwordRef.current.value;
        const valorConfPassword = cPasswordRef.current.value;

        setIguales(valorPassword === valorConfPassword);
    };

    const createUser = (e) => {
        e.preventDefault();
        const newUser = { form };
        const { firstName, lastName } = newUser.form;
        console.log("Welcome", firstName, lastName);
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            confirmPassword: "",
            password: "",
        });
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
                    onChange={validar}
                    type="text"
                    name="firstName"
                    value={firstName}
                ></Input>
            </BoxStyled>
            {firstNameError ? <MsgError>{firstNameError} </MsgError> : ""}
            <BoxStyled>
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                    onChange={validar}
                    type="text"
                    name="lastName"
                    value={lastName}
                ></Input>
            </BoxStyled>
            {lastNameError ? <MsgError> {lastNameError} </MsgError> : ""}
            <BoxStyled>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                    onChange={validar}
                    type="text"
                    name="email"
                    value={email}
                ></Input>
            </BoxStyled>
            {emailError ? <MsgError> {emailError} </MsgError> : ""}
            <BoxStyled>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    onChange={validar}
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
                    onChange={validar}
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
