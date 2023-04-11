import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!Number(presupuesto) || Number(presupuesto) < 0) {
      setMensaje('No es un presupuesto válido')

      return
    }
    setMensaje('');
    setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label htmlFor="">Definir Presupuesto</label>
          <input
            className='nuevo-presupuesto'
            placeholder='Añade tu Presupuesto'
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))}
            type="number"
            min="0"
          />
        </div>
        <input type='submit' value="añadir" />
        {
          mensaje &&
          <Mensaje
            tipo="error"
          >
            {mensaje}
          </Mensaje>
        }
      </form>
    </div>
  );
};

export default NuevoPresupuesto;