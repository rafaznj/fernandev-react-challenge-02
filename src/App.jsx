import "./index.css";
import { useState } from "react";
import { login } from "./utils";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login enquanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess(false);
      setLoading(true);

      await login({ email, password });

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {error ? <div className="errorMessage">{error}</div> : null}
        {success ? <div className="successMessage">Login Realizado</div> : null}
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            autoComplete="off"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            value={password}
            onChange={handlePassword}
          />
        </div>

        <div className="button">
          <button
            onClick={handleSubmit}
            disabled={loading || email === "" || password.length < 6}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
