import React, { useState } from "react";
import "./App.css";
import UserForm from "./Components/UserForm";
function App() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confPassword: "",
    });
    return (
        <div className="App">
            <UserForm inputs={state} setInputs={setState} />
        </div>
    );
}
export default App;
