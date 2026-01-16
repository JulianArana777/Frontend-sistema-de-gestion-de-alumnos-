import { useEffect, useState } from "react";
import api from "../../Api/Api";

export default function MateriaList({ onEdit, refreshTrigger }) {
  const [materias, setMaterias] = useState([]);

  const cargar = async () => {
    const res = await api.get("/materias");
    setMaterias(res.data);
  };

  const eliminar = async id => {
    await api.delete(`/materias/${id}`);
    cargar();
  };

  useEffect(() => {
    cargar();
  }, [refreshTrigger]);

  return (
    <div>
      <h2>Materias</h2>
      <ul>
        {materias.map(m => (
          <li key={m.id}>
            ID: {m.id} ({m.codigo}) {m.nombre} Creditos: {m.creditos} 
            <button onClick={() => onEdit(m)}>Editar</button>
            <button onClick={() => eliminar(m.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}