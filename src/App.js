import "./App.css";
import { PatientList } from "./components/PatientList";
import { useState } from "react";
import { PatientRecord } from "./components/patient-record/PatientRecord";
import { TopBar } from "./components/top-bar/TopBar";
import { Button } from "./components/button/Button";

function App() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  return (
    <div className="App">
      <TopBar />
      <div className="page-container">
        {selectedPatientId ? (
          <>
            <Button onClick={() => setSelectedPatientId(null)}>
              <i className="fa-solid fa-chevron-left" /> Back
            </Button>
            <PatientRecord selectedPatientId={selectedPatientId} />
          </>
        ) : (
          <PatientList setSelectedPatientId={setSelectedPatientId} />
        )}
      </div>
    </div>
  );
}

export default App;
