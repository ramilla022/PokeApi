import React from 'react'

export const registerPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f0f8ff' }}>
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#4682b4', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
          <h3>Registro</h3>
        </div>
        <div className="card-body">
          <form >
          
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
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
                required
              />
            </div>

            
            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#4682b4', borderColor: '#4682b4' }}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default registerPage
