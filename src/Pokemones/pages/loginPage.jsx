import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateToken, saveToken } from "../helpers/auth";
import { useAuth } from "../../Auth/authContext";

const API_URL = import.meta.env.VITE_API_URL_JSON


const LoginPage = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/usuarios`);
      const data = await response.json();
  
  
      const usuarioEncontrado = data.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
  
      if (usuarioEncontrado) {
        localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
        const token = generateToken({ usuarioEncontrado });
        saveToken(token);
        login();
        navigate("/home");
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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#4682b4', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
          <h3>Iniciar sesion</h3>
        </div>
        <div className="card-body">
      

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="usuario@email.com"
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
                className="btn btn-outline-dark"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button className="btn btn-primary w-100" style={{ backgroundColor: '#4682b4', borderColor: '#4682b4' }}>
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
    </div>
  );
};

export default LoginPage;