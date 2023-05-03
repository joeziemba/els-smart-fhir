import "./App.scss";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { PatientList } from "./components/patient-list/PatientList";
import { useState } from "react";
import { PatientRecord } from "./components/patient-record/PatientRecord";
import { TopBar } from "./components/top-bar/TopBar";
import { Button } from "./components/button/Button";

function App() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  return (
    <div className="app">
      <TopBar />
      <div className="app__page-container">
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
