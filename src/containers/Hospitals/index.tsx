import { submitPatientData } from "@/src/utils/submitData";
import { useState } from "react";

const HospitalContainer = () => {
    const [patientData, setPatientData] = useState({
      ID: '',
      Name: '',
      Gender: '',
      DateOfBirth: '',
      PhoneNumber: '',
      Address: '',
      Insurance: '',
      Medication: [],
      Diagnosis: []
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    submitPatientData(patientData)
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
      const { name, value } = event.target;
      setPatientData(prevData => ({
        ...prevData,
        [name]: value
      }));
};    
    return (
        <section className="min-h-screen bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h1 className="mb-4 text-3xl text-center font-bold text-gray-900 dark:text-white">Welcome to SISDIS Hospital</h1>
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new patient data</h2>

                <form className="#" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient Name</label>
                            <input onChange={handleChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your Name" required={true}/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <input onChange={handleChange} type="text" name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Male/Female" required={true}/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input onChange={handleChange} type="string" name="phone-number" id="phone-number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="6281111111111" required={true}/>
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                            <input onChange={handleChange} datepicker-autohide type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="insurance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insurance</label>
                          <input onChange={handleChange} id="insurance" name="Insurance" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter insurance here" />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="medication" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medication</label>
                          <input onChange={handleChange} id="medication" name="Medication" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter medication here" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="diagnosis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diagnosis</label>
                            <input onChange={handleChange} id="diagnosis" name="Diagnosis" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter diagnosis here" />
                        </div>
                      </div>
                      <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                          Add Patient Data
                      </button>
                </form>
                
            </div>
        </section>
    );
};

export default HospitalContainer;
