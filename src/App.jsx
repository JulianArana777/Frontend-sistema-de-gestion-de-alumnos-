import { useState } from "react";
import AlumnoList from "./Components/Lists/AlumnoList";
import AlumnoForm from "./Components/Forms/AlumnoForm";
import MateriaList from "./Components/Lists/MateriaList";
import MateriaForm from "./Components/Forms/MateriaForm";
import NotaForm from "./Components/Forms/NotaForm";
import NotaList from "./Components/Lists/NotaList";

function App() {
  const [alumnoEdit, setAlumnoEdit] = useState(null);
  const [materiaEdit, setMateriaEdit] = useState(null);
  
  const [refreshAlumnos, setRefreshAlumnos] = useState(0);
  const [refreshMaterias, setRefreshMaterias] = useState(0);

  const handleAlumnoChange = () => {
    setRefreshAlumnos(prev => prev + 1);
    setAlumnoEdit(null);
  };

  const handleMateriaChange = () => {
    setRefreshMaterias(prev => prev + 1);
    setMateriaEdit(null);
  };

  return (
    <div>
      <AlumnoForm 
        alumnoEdit={alumnoEdit} 
        onFinish={handleAlumnoChange} 
      />
      <AlumnoList 
        onEdit={setAlumnoEdit} 
        refreshTrigger={refreshAlumnos} 
      />

      <hr />

      <MateriaForm 
        materiaEdit={materiaEdit} 
        onFinish={handleMateriaChange} 
      />
      <MateriaList 
        onEdit={setMateriaEdit} 
        refreshTrigger={refreshMaterias} 
      />

      <hr />

      <NotaForm />
      <NotaList />
    </div>
  );
}

export default App;