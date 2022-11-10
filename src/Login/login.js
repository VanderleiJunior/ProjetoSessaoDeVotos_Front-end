import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

import Logo from "../assets/Logo.png";

import "./login.css";

function Login() {
  const navigate = useNavigate()
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const getPolitico = async() => {
    try {
      await axios.get(`http://localhost:3333/politico/${nome}/${senha}`)
      navigate("/sessoes")
    } catch (error) {
    } finally {
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Bem vindo </span>

            <span className="login-form-title">
              <img src={Logo} alt="Jovem Programador" />
            </span>

            <div className="wrap-input">
              <input
                className={nome !== "" ? "has-val input" : "input"}
                type="nome"
                value={nome}
                onChange={(e) => setNome((e.target.value).toUpperCase())}
              />
              <span className="focus-input" data-placeholder="Nome"></span>
            </div>

            <div className="wrap-input">
              <input
                className={senha !== "" ? "has-val input" : "input"}
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn"
                onClick={(e) => { e.preventDefault(); getPolitico(nome, senha)}
                }
              >
                ENTRAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
