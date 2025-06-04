import { usePatients } from '../context/PatientContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Analytics() {
  const { patients } = usePatients();

  const totalPatients = patients.length;
  const admittedPatients = patients.filter(p => p.status === 'admitted').length;
  const dischargedPatients = patients.filter(p => p.status === 'discharged').length;
  const pendingPatients = patients.filter(p => p.status === 'pending').length;

  const averageAge = patients.reduce((acc, patient) => acc + patient.age, 0) / totalPatients || 0;
  const averageBMI = patients.reduce((acc, patient) => {
    const heightInMeters = patient.height / 100;
    const bmi = patient.weight / (heightInMeters * heightInMeters);
    return acc + bmi;
  }, 0) / totalPatients || 0;

  const bloodGroupDistribution = patients.reduce((acc, patient) => {
    acc[patient.bloodGroup] = (acc[patient.bloodGroup] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Gender distribution data
  const genderData = patients.reduce((acc: any[], patient) => {
    const existing = acc.find((item) => item.name === patient.gender);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: patient.gender, value: 1 });
    }
    return acc;
  }, []);

  // Age group distribution
  const ageGroups = patients.reduce((acc: any[], patient) => {
    const age = patient.age;
    let group = '';
    if (age < 20) group = '0-19';
    else if (age < 40) group = '20-39';
    else if (age < 60) group = '40-59';
    else group = '60+';

    const existing = acc.find((item) => item.name === group);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: group, value: 1 });
    }
    return acc;
  }, []);

  // Status distribution
  const statusData = patients.reduce((acc: any[], patient) => {
    const existing = acc.find((item) => item.name === patient.status);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: patient.status, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
          <p className="text-3xl font-bold text-blue-600">{totalPatients}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Admitted</h3>
          <p className="text-3xl font-bold text-green-600">{admittedPatients}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Discharged</h3>
          <p className="text-3xl font-bold text-yellow-600">{dischargedPatients}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-3xl font-bold text-red-600">{pendingPatients}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Patient Demographics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Average Age</p>
              <p className="text-2xl font-bold">{averageAge.toFixed(1)} years</p>
            </div>
            <div>
              <p className="text-gray-600">Average BMI</p>
              <p className="text-2xl font-bold">{averageBMI.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Blood Group Distribution</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(bloodGroupDistribution).map(([group, count]) => (
              <div key={group} className="flex justify-between items-center">
                <span className="text-gray-600">{group}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Gender Distribution
          </h3>
          <PieChart width={400} height={300}>
            <Pie
              data={genderData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {genderData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Age Group Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Age Group Distribution
          </h3>
          <BarChart
            width={400}
            height={300}
            data={ageGroups}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Number of Patients" />
          </BarChart>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Patient Status Distribution
          </h3>
          <BarChart
            width={400}
            height={300}
            data={statusData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" name="Number of Patients" />
          </BarChart>
        </div>
      </div>
    </div>
  );
} 