import { useState, useEffect } from "react";
import api from "../../Api/Api";

export default function MateriaForm({ materiaEdit, onFinish }) {
  const [materia, setMateria] = useState({ nombre: "", codigo: "", creditos: "" });

  useEffect(() => {
    if (materiaEdit) setMateria(materiaEdit);
  }, [materiaEdit]);

  const handleChange = e => {
    setMateria({ ...materia, [e.target.name]: e.target.value });
  };

  const guardar = async e => {
    e.preventDefault();
    if (materia.id) {
      await api.put(`/materias/${materia.id}`, materia);
    } else {
      await api.post("/materias", materia);
    }
    onFinish();
    setMateria({ nombre: "", codigo: "", creditos: "" });
  };

  return (
    <form onSubmit={guardar}>
      <h2>{materia.id ? "Editar" : "Crear"} Materia</h2>
      <input name="nombre" placeholder="Nombre" value={materia.nombre} onChange={handleChange} />
      <input name="codigo" placeholder="Código" value={materia.codigo} onChange={handleChange} />
      <input name="creditos" placeholder="Créditos" value={materia.creditos} onChange={handleChange} />
      <button>Guardar</button>
    </form>
  );
}
