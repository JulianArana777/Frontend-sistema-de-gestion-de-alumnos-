import { useEffect, useState } from "react";
import api from "../../Api/Api";

export default function MateriaList({ onEdit, refreshTrigger }) {
    //Estado para almacenar Materias del backend
  const [materias, setMaterias] = useState([]);

  //Obtiene Asincronicanebte las materias del back
  const cargar = async () => {
    const res = await api.get("/materias");
    setMaterias(res.data);
  };

  //Envia info para eliminar una materia al back
  const eliminar = async id => {
    await api.delete(`/materias/${id}`);
    cargar();
  };
//Cargar Materias y refrescar pagina cada vez que se agrega una materia
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