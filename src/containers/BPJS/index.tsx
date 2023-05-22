import React, { useState, useEffect } from 'react';
import { PatientData } from '../../utils/interface';
import { API_ROOT } from '@/src/utils/api';


const BpjsContainer = () => {
    const [data, setData] = useState<PatientData[]>([]);

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

    return (
        <div className="relative overflow-x-auto min-h-screen p-20 bg-white dark:bg-gray-900">
            <h1 className="mb-4 text-3xl text-center font-bold text-gray-900 dark:text-white">BPJS Insurance</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.ID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.Name}
                            </th>
                            <td className="px-6 py-4">{item.Gender === '1' ? 'Female': 'Male'}</td>
                            <td className="px-6 py-4">{item.PhoneNumber}</td>
                            <td className="px-6 py-4">{item.DateOfBirth}</td>
                            <td className="px-6 py-4">{item.Address}</td>
                            <td className="px-6 py-4">{item.Insurance}</td>
                            <td className="px-6 py-4">{Array.isArray(item.Medication) ? item.Medication.join(', ') : item.Medication}</td>
                            <td className="px-6 py-4">{Array.isArray(item.Diagnosis) ? item.Diagnosis.join(', ') : item.Diagnosis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BpjsContainer;
