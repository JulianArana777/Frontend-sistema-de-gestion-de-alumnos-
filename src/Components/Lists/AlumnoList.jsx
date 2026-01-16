import { useEffect, useState } from "react";
import api from "../../Api/Api";

export default function AlumnoList({ onEdit, refreshTrigger }) {
  //Estado para almacenar Alumnos del backend
  const [alumnos, setAlumnos] = useState([]);

  //Obtiene Asincronicanebte los alumnos del back
  const cargarAlumnos = async () => {
    const res = await api.get("/alumnos");
    setAlumnos(res.data);
  };

  //Envia info para eliminar un alumno al back

  const eliminar = async (id) => {
    await api.delete(`/alumnos/${id}`);
    cargarAlumnos();
  };

  //Cargar Alumnos y refrescar pagina cada vez que se agrega un Alumno
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