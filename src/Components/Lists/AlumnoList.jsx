import { useEffect, useState } from "react";
import api from "../../Api/Api";

export default function AlumnoList({ onEdit, refreshTrigger }) {
  const [alumnos, setAlumnos] = useState([]);

  const cargarAlumnos = async () => {
    const res = await api.get("/alumnos");
    setAlumnos(res.data);
  };

  const eliminar = async (id) => {
    await api.delete(`/alumnos/${id}`);
    cargarAlumnos();
  };

  useEffect(() => {
    cargarAlumnos();
  }, [refreshTrigger]);

  return (
    <div>
      <h2>Alumnos</h2>
      <ul>
        {alumnos.map(a => (
          <li key={a.id}>
            ID: {a.id} {a.nombre} {a.apellido} Email: {a.email} 
            <button onClick={() => onEdit(a)}>Editar</button>
            <button onClick={() => eliminar(a.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}