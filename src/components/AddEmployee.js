import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Modal from "react-modal";
import axios from "axios"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = ({ role }) => {
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [employee, setEmployee] = useState({
        emp_id: "",
        emp_name: "",
        designation: "",
    });
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees(); 
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getAllEmployees");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
            toast.error("Error fetching employees", { autoClose: 3 });
        }
    };

    const handleEmployeeChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleEmployeeSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if we are updating an existing employee
            if (employee.emp_id) {
                // Update employee API call
                const response = await axios.patch(
                    `http://localhost:3000/editEmployee/${employee.emp_id}`,
                    employee
                );
                toast.success("Employee updated successfully", { autoClose: 3 });
            } else {
                // Add new employee API call
                const response = await axios.post(
                    "http://localhost:3000/addEmployee",
                    employee
                );
                toast.success("Employee added successfully", { autoClose: 3 });
            }
            setIsEmployeeModalOpen(false);
            setEmployee({ emp_id: "", emp_name: "", designation: "" });
            fetchEmployees(); 
        } catch (error) {
            console.error("Error submitting employee:", error);
            toast.error(employee.emp_id ? "Error updating employee" : "Employee already exists", { autoClose: 3 });
        }
    };

    const handleEditEmployee = async (emp) => {
        setEmployee(emp);
        setIsEmployeeModalOpen(true);
    };

    const handleDeleteEmployee = async (emp_id) => {
        try {
            await axios.delete(`http://localhost:3000/deleteEmployee/${emp_id}`);
            toast.success("Employee deleted successfully", { autoClose: 3 });
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error("Error deleting employee", { autoClose: 3 });
        }
    };

    return (
        <div>
            <Nav role={role} showNav={true} />
            <div className="flex p-4">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setIsEmployeeModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Employee
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Employee List</h2>
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="border">Employee ID</th>
                            <th className="border">Employee Name</th>
                            <th className="border">Designation</th>
                            <th className="border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.emp_id}>
                                <td className="border">{emp.emp_id}</td>
                                <td className="border">{emp.emp_name}</td>
                                <td className="border">{emp.designation}</td>
                                <td className="border">
                                    <button
                                        onClick={() => handleEditEmployee(emp)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteEmployee(emp.emp_id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={isEmployeeModalOpen}
                onRequestClose={() => setIsEmployeeModalOpen(false)}
                className="bg-white p-4 rounded shadow-lg w-1/3 h-2/5 relative"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-lg font-bold mb-4 font-bold text-[#3411a3]">
                    {employee.emp_id ? "Edit Employee" : "Add Employee"}
                </h2>
                <button
                    onClick={() => setIsEmployeeModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-full text-2xl"
                >
                    &times;
                </button>
                <form onSubmit={handleEmployeeSubmit}>
                    <label
                        className="font-semibold block mb-1 text-[#3411a3]"
                        htmlFor="emp_id"
                    >
                        Employee ID
                    </label>
                    <input
                        type="text"
                        id="emp_id"
                        name="emp_id"
                        placeholder="Enter Employee ID"
                        value={employee.emp_id}
                        onChange={handleEmployeeChange}
                        required
                        className="border rounded p-2 mb-2 w-full outline-none "
                    />
                    <label
                        className="block mb-1 font-semibold text-[#3411a3]"
                        htmlFor="emp_name"
                    >
                        Employee Name
                    </label>
                    <input
                        type="text"
                        id="emp_name"
                        name="emp_name"
                        placeholder="Enter Employee Name"
                        value={employee.emp_name}
                        onChange={handleEmployeeChange}
                        required
                        className="border rounded p-2 mb-2 w-full outline-none"
                    />
                    <label
                        className="block mb-1 font-semibold text-[#3411a3]"
                        htmlFor="designation"
                    >
                        Designation
                    </label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        placeholder="Enter Designation"
                        value={employee.designation}
                        onChange={handleEmployeeChange}
                        required
                        className="border rounded p-2 mb-2 w-full outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {employee.emp_id ? "Update Employee" : "Add Employee"}
                    </button>
                </form>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default AddEmployee;
