import { useState } from "react";
import api from "../../Api/Api";

export default function NotaList() {

  //Estados para obtener los filtros a usar para acceder a la nota correspondiente en el back
  const [alumnoId, setAlumnoId] = useState("");
  const [materiaId, setMateriaId] = useState("");
  // Estado para almacenar el resultado de la búsqueda
  const [notas, setNotas] = useState([]);

  // Consultar la Api asincronicamente
  const buscar = async () => {
    const res = await api.get(`/notas/alumno/${alumnoId}/materia/${materiaId}`);
    setNotas(res.data);
  };

  return (
    <div>
      <h2>Notas</h2>
      <input placeholder="Alumno ID" onChange={e => setAlumnoId(e.target.value)} />
      <input placeholder="Materia ID" onChange={e => setMateriaId(e.target.value)} />
      <button onClick={buscar}>Buscar</button>

      <ul>
        {notas.map(n => (
          <li key={n.id}>{n.valor}</li>
        ))}
      </ul>
    </div>
  );
}
