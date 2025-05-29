// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token); // 🔥 ESSENCIAL
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro login:", err);
      alert("Erro ao fazer login.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
      <input type="submit" value="Entrar" />
    </form>
  );
}

