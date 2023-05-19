import React, { useState, useEffect } from 'react';
import { PatientData } from '../../utils/interface';
import { API_ROOT } from '@/src/utils/api';

const BpjsContainer = () => {
    const [data, setData] = useState<PatientData[]>([]);

    useEffect(() => {
        fetch(`{API_ROOT}/api/assets`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
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
                        <th scope="col" className="px-6 py-3">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.Name}
                            </th>
                            <td className="px-6 py-4">{item.Gender}</td>
                            <td className="px-6 py-4">{item.PhoneNumber}</td>
                            <td className="px-6 py-4">{item.DateOfBirth}</td>
                            <td className="px-6 py-4">
                                {`Address: ${item.Address}, Insurance: ${item.Insurance}, Medication: ${item.Medication.join(", ")}, Diagnosis: ${item.Diagnosis.join(", ")}`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BpjsContainer;
