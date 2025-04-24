import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL_JSON;

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    email: '',
    password: '',
    general: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    setError({ email: '', password: '', general: '' });

    try {
      const existingUsersRes = await fetch(`${API_URL}/usuarios`);
      const users = await existingUsersRes.json();

      const emailExists = users.some(user => user.email === formData.email);

      if (emailExists) {
        setError((prev) => ({ ...prev, email: 'Este correo ya está registrado. Por favor, usa otro.' }));
        return;
      }


      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        setError((prev) => ({ ...prev, email: 'Por favor, ingresa un correo electrónico válido.' }));
        return;
      }


      if (formData.password.length < 8 || !/[A-Z]/.test(formData.password)) {
        setError((prev) => ({ ...prev, password: 'La contraseña debe contener al menos 1 mayúscula y 8 caracteres.' }));
        return;
      }

      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Usuario registrado con éxito');
        setFormData({ name: '', email: '', password: '' });
        navigate('/login');
      } else {
        setError((prev) => ({ ...prev, general: 'Error al registrar el usuario.' }));
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setError((prev) => ({ ...prev, general: 'Hubo un problema al procesar tu solicitud. Intenta nuevamente.' }));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
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
              {error.email && <div className="text-danger mt-2">{error.email}</div>}
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
              {error.password && <div className="text-danger mt-2">{error.password}</div>}
            </div>

            {error.general && <div className="text-danger mb-3">{error.general}</div>}

            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#4682b4', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
              Registrar
            </button>

            <button type="button" className="btn btn-link w-100 mt-3" onClick={() => navigate('/login')}>
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;