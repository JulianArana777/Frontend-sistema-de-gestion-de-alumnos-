import { useState } from "react";
import api from "../../Api/Api";

//Estado inicial de Nota
export default function NotaForm() {
  const [data, setData] = useState({ 
    alumnoId: "", 
    materiaId: "", 
    valor: "" 
  });

  //Enviar info a la API 
  const registrar = async (e) => {
    e.preventDefault();
    try {
     
      await api.post("/notas", null, { params: data });
      alert("Nota registrada");
      setData({ alumnoId: "", materiaId: "", valor: "" });
    } catch (error) {
      alert("Error: Asegúrate de que ambos IDs existan");
    }
  };

  return (
    <form onSubmit={registrar}>
      <h2>Registrar Nota</h2>

      <input
        type="number"
        placeholder="ID del Alumno"
        value={data.alumnoId}
        onChange={(e) => setData({ ...data, alumnoId: e.target.value })}
        required
      />

      <input
        type="number" 
        placeholder="ID de la Materia"
        value={data.materiaId}
        onChange={(e) => setData({ ...data, materiaId: e.target.value })}
        required
      />

      <input
        type="number"
        step="0.1"
        placeholder="Valor de la Nota"
        value={data.valor}
        onChange={(e) => setData({ ...data, valor: e.target.value })}
        required
      />

      <button type="submit">Guardar</button>
    </form>
  );
}