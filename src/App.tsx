import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PatientTable from './components/PatientTable';
import Analytics from './components/Analytics';
import PatientForm from './components/PatientForm';
import { PlusIcon } from '@heroicons/react/24/outline';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Router>
      <Layout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Patient
            </button>
          </div>

          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/patients" element={<PatientTable />} />
          </Routes>

          {isFormOpen && <PatientForm onClose={() => setIsFormOpen(false)} />}
        </div>
      </Layout>
    </Router>
  );
}

export default App;
