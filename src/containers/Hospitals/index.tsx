import { API_ROOT } from "@/src/utils/api";
import { PatientData } from "@/src/utils/interface";
import { submitPatientData, updatePatientData } from "@/src/utils/submitData";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const HospitalContainer = () => {
    const [patientData, setPatientData] = useState<PatientData>({
      ID: '',
      Name: '',
      Gender: 0,
      DateOfBirth: '',
      PhoneNumber: '',
      Address: '',
      Insurance: '',
      Medication: [],
      Diagnosis: []
  });
  const [data, setData] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);

  useEffect(() => {
    if (selectedPatient) {
      setPatientData(selectedPatient);
    }
  }, [selectedPatient]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let updatedPatient: PatientData;

    if (selectedPatient) {
      // edit mode
      updatedPatient = { ...patientData };
      updatePatientData(updatedPatient)
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
          window.alert(`Patient data for ${updatedPatient.Name} was successfully updated.`);
          setData((prevData) =>
            prevData.map((item) => (item.ID === updatedPatient.ID ? updatedPatient : item))
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      //  create mode
      updatedPatient = { ...patientData, ID: uuidv4() };
      submitPatientData({...updatedPatient, ID: uuidv4()})
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
          window.alert(`Patient data for ${updatedPatient.Name} was successfully created.`);
          setData((prevData) => [...prevData, updatedPatient]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    if (name === 'Medication' || name === 'Diagnosis') {
      setPatientData(prevData => ({
        ...prevData,
        [name]: value.split(',')
      }));
    } else {
      setPatientData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  useEffect(() => {
      const apiKey = sessionStorage.getItem('api-key')
      if (apiKey) {
          fetch(`${API_ROOT}/api/assets`, {
              method: 'GET',
              headers: {
                  'x-api-key': apiKey
              }
          })
          .then(response => response.json())
          .then(data => setData(data))
          .catch(err => console.error(err));
      }
  }, []);

  const handleEdit = (patient: PatientData) => {
    setSelectedPatient(patient);
  };
  

    return (
        <section className="min-h-screen bg-white dark:bg-gray-900">
            {/* CREATE EHR */}
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h1 className="mb-4 text-3xl text-center font-bold text-gray-900 dark:text-white">Welcome to SISDIS Hospital</h1>
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new patient data</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="w-full">
                            <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient Name</label>
                            <input onChange={handleChange} type="text" name="Name" id="Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your Name" required/>
                        </div>
                        <div className="w-full">
                          <label htmlFor="Gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                          <select onChange={handleChange} name="Gender" id="Gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                            <option value="">Select Gender</option>
                            <option value="1">Female</option>
                            <option value="0">Male</option>
                          </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input onChange={handleChange} type="number" name="PhoneNumber" id="PhoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="6281111111111" required/>
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="DateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                            <input onChange={handleChange} datepicker-autohide="true" name="DateOfBirth" id="DateOfBirth" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" required/>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                          <input onChange={handleChange} id="Address" name="Address" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter address here" required/>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="Insurance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insurance</label>
                          <input onChange={handleChange} id="Insurance" name="Insurance" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter insurance here" required/>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="Medication" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medication</label>
                          <input onChange={handleChange} id="Medication" name="Medication" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter medication here" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="Diagnosis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diagnosis</label>
                            <input onChange={handleChange} id="Diagnosis" name="Diagnosis" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter diagnosis here" required />
                        </div>
                      </div>
                      <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                          Add Patient Data
                      </button>
                </form>
                
            </div>
            {/* EDIT EHR */}
            <section>
              <div className="relative overflow-x-auto min-h-screen p-20 bg-white dark:bg-gray-900">
                <h1 className="mb-4 text-3xl text-center font-bold text-gray-900 dark:text-white">Patient Data</h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Patient Name</th>
                            <th scope="col" className="px-6 py-3">Gender</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Date of Birth</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Insurance</th>
                            <th scope="col" className="px-6 py-3">Medication</th>
                            <th scope="col" className="px-6 py-3">Diagnosis</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.ID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.Name}
                                </th>
                                <td className="px-6 py-4">{item.Gender === 1 ? 'Female': 'Male'}</td>
                                <td className="px-6 py-4">{item.PhoneNumber}</td>
                                <td className="px-6 py-4">{item.DateOfBirth}</td>
                                <td className="px-6 py-4">{item.Address}</td>
                                <td className="px-6 py-4">{item.Insurance}</td>
                                <td className="px-6 py-4">{Array.isArray(item.Medication) ? item.Medication.join(', ') : item.Medication}</td>
                                <td className="px-6 py-4">{Array.isArray(item.Diagnosis) ? item.Diagnosis.join(', ') : item.Diagnosis}</td>
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedPatient && (
                  <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Patient Data</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                          <div className="w-full">
                              <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient Name</label>
                              <input onChange={handleChange} type="text" name="Name" id="Name" value={patientData.Name || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your Name" required/>
                          </div>
                          <div className="w-full">
                            <label htmlFor="Gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <select onChange={handleChange} name="Gender" id="Gender" value={patientData.Gender || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                              <option value="">Select Gender</option>
                              <option value="1">Female</option>
                              <option value="0">Male</option>
                            </select>
                          </div>
                          <div className="w-full">
                              <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                              <input onChange={handleChange} type="number" name="PhoneNumber" id="PhoneNumber" value={patientData.PhoneNumber || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="6281111111111" required/>
                          </div>
                          <div className="w-full relative">
                              <label htmlFor="DateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                              <input onChange={handleChange} value={patientData.DateOfBirth || ''} datepicker-autohide name="DateOfBirth" id="DateOfBirth" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" required/>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input onChange={handleChange} value={patientData.Address || ''} id="Address" name="Address" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter address here" required/>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="Insurance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insurance</label>
                            <input onChange={handleChange} value={patientData.Insurance || ''} id="Insurance" name="Insurance" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter insurance here" required/>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="Medication" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medication</label>
                            <input onChange={handleChange} value={patientData.Medication || ''} id="Medication" name="Medication" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter medication here" required/>
                          </div>
                          <div className="sm:col-span-2">
                              <label htmlFor="Diagnosis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diagnosis</label>
                              <input onChange={handleChange} value={patientData.Diagnosis || ''} id="Diagnosis" name="Diagnosis" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter diagnosis here" required />
                          </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Edit Patient Data
                        </button>
                    </form>

                  </div>
                )}
              </div>
            </section>
        </section>
    );
};

export default HospitalContainer;
