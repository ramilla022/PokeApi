import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const existingUsersRes = await fetch('http://localhost:3000/usuarios');
      const users = await existingUsersRes.json();
  
      const emailExists = users.some(user => user.email === formData.email);
  
      if (emailExists) {
        alert('Este correo ya está registrado. Por favor, usa otro.');
        return;
      }
      
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Usuario registrado con éxito');
        setFormData({ name: '', email: '', password: '' });
        navigate("/login");
      } else {
        alert('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f0f8ff' }}>
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#4682b4', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
          <h3>Registro</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#4682b4', borderColor: '#4682b4' }}>
              Registrar
            </button>

            <button type="button" className="btn btn-link w-100 mt-3" onClick={() => navigate('/login')} >
             Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;