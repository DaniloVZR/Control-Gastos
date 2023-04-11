import { useEffect, useState } from 'react';
import { formatearCantidad } from '../helpers';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado;

    // Calc Porcentaje
    const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto) * 100
    setPorcentaje(nuevoPorcentaje);

    setDisponible(totalDisponible)
    setGastado(totalGastado)
  }, [gastos]);

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')

    if (resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
            trailColor: '#e1e1e1',
            textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6'
          })}
          value={porcentaje}
          text={`${porcentaje.toFixed(2)}% Gastado`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>

        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;