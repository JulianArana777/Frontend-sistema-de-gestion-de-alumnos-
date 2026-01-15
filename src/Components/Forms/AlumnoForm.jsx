import { useState, useEffect } from "react";
import api from "../../Api/Api";

export default function AlumnoForm({ alumnoEdit, onFinish }) {
  const [alumno, setAlumno] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: ""
  });

  useEffect(() => {
    if (alumnoEdit) setAlumno(alumnoEdit);
  }, [alumnoEdit]);

  const handleChange = e => {
    setAlumno({ ...alumno, [e.target.name]: e.target.value });
  };

  const guardar = async e => {
    e.preventDefault();
    if (alumno.id) {
      await api.put(`/alumnos/${alumno.id}`, alumno);
    } else {
      await api.post("/alumnos", alumno);
    }
    onFinish();
    setAlumno({ nombre: "", apellido: "", email: "", fechaNacimiento: "" });
  };

  return (
    <form onSubmit={guardar}>
      <h2>{alumno.id ? "Editar" : "Crear"} Alumno</h2>
      <input name="nombre" placeholder="nombre" value={alumno.nombre} onChange={handleChange} />
      <input name="apellido" placeholder="apellido" value={alumno.apellido} onChange={handleChange} />
      <input name="email" placeholder="email" value={alumno.email} onChange={handleChange} />
      <input type="date" name="fechaNacimiento" value={alumno.fechaNacimiento} onChange={handleChange} />
      <button>Guardar</button>
    </form>
  );
}
