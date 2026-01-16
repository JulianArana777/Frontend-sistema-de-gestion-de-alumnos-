import { useState, useEffect } from "react";
import api from "../../Api/Api";

export default function AlumnoForm({ alumnoEdit, onFinish }) {
  //Estado inicial del Alumno
  const [alumno, setAlumno] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: ""
  });

  useEffect(() => { //Ejecutar Cambio cuando se presiona el boton guardar 
    if (alumnoEdit) setAlumno(alumnoEdit);
  }, [alumnoEdit]);

  const handleChange = e => { // Modificar estado inicial
    setAlumno({ ...alumno, [e.target.name]: e.target.value });
  };

  //Enviar info a la api 
  const guardar = async e => {
    e.preventDefault();
    if (alumno.id) { // Si tiene id en la db actualizar
      await api.put(`/alumnos/${alumno.id}`, alumno);
    } else { // Si no hay id en la db crear
      await api.post("/alumnos", alumno);
    }
    onFinish();
    setAlumno({ nombre: "", apellido: "", email: "", fechaNacimiento: "" }); // Limpiar formulario
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
