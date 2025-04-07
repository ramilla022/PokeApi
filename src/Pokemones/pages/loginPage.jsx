import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const data = await response.json();
  
      const usuarioEncontrado = data.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
  
      if (usuarioEncontrado) {
        alert("¡Inicio de sesión exitoso!")
        localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
        navigate("/home");
        window.location.reload();
        return null
      } else {
        setError("Correo o contraseña incorrectos");
      }
  
    } catch (error) {
      console.error("Error al validar usuario:", error);
      setError("Error al validar usuario");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Ejemplo: usuario@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-3 text-center">
          <button className="btn btn-link p-0" onClick={() => navigate("/register")}>
            Registrarse
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;