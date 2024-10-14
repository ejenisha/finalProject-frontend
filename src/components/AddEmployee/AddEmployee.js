import React, { useEffect, useState } from "react";
import Nav from "../Login/Nav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeModal from "./EmployeeModal"; // Import the new modal component

const AddEmployee = ({ role }) => {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [employee, setEmployee] = useState({
    emp_id: "",
    emp_name: "",
    designation: "",
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  {/*get all Employees*/}
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getAllEmployees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Error fetching employees", { autoClose: 3000 });
    }
  };


  const handleEmployeeChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    await addEmployee();
  };

{/*Add Employees*/}
  const addEmployee = async () => {
    try {
      await axios.post("http://localhost:3000/addEmployee", employee);
      toast.success("Employee added successfully", { autoClose: 3000 });
      resetEmployeeForm();
      fetchEmployees();
      setIsEmployeeModalOpen(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Error adding employee", { autoClose: 3000 });
    }
  };

  const handleEditEmployee = (emp) => {
    setEmployee(emp);
    setIsEditModalOpen(true);
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    await updateEmployee();
  };

{/*Edit Employees*/}
  const updateEmployee = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/editEmployee/${employee.emp_id}`,
        employee
      );
      toast.success("Employee updated successfully", { autoClose: 3000 });
      resetEmployeeForm();
      fetchEmployees();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee", { autoClose: 3000 });
    }
  };

{/*Delete Employees*/}
  const handleDeleteEmployee = async (emp_id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteEmployee/${emp_id}`);
      toast.success("Employee deleted successfully", { autoClose: 3000 });
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting employee", { autoClose: 3000 });
    }
  };

  const resetEmployeeForm = () => {
    setEmployee({ emp_id: "", emp_name: "", designation: "" });
  };

  return (
    <div>
      <Nav role={role} showNav={true} />
      <div className="flex p-4">
        <button
          onClick={() => setIsEmployeeModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg transition"
        >
          Add Employee
        </button>
      </div>
          {/*Employee Table*/}
      <div className="p-4 ml-32 mr-32">
        <h2 className="text-xl font-bold mb-4 text-[#3411a3]">Employee List</h2>
        <table className="min-w-full border rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-pink-300 text-[#3411a3] text-left font-bold text-xl ">
            <tr>
              <th className="border-b-0 p-6">Employee ID</th>
              <th className="border-b-0 p-6">Employee Name</th>
              <th className="border-b-0 p-6">Designation</th>
              <th className="border-b-0 p-6" style={{ width: "150px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-[#3411a3] text-lg">
            {employees.map((emp) => (
              <tr key={emp.emp_id} className="hover:bg-gray-100">
                <td className="border-b-0 p-6 font-semibold">{emp.emp_id}</td>
                <td className="border-b-0 p-6 font-semibold">{emp.emp_name}</td>
                <td className="border-b-0 p-6 font-semibold">
                  {emp.designation}
                </td>
                <td className="border-b-0 p-6 font-semibold space-x-3 ">
                {/*Edit Employee*/}
                  <button onClick={() => handleEditEmployee(emp)}>
                    <svg
                      className="w-6 h-6 text-[#3411a3] dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.017 2.017 0 0 1 2.852 0Z"
                      />
                    </svg>
                  </button>
                  
              {/*Delete Employee*/}
                  <button onClick={() => handleDeleteEmployee(emp.emp_id)}>
                    <svg
                      className="w-6 h-6 text-red-700 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 6 5.25 6m2.25 0v-1.5a1.5 1.5 0 0 1 1.5-1.5h6.75a1.5 1.5 0 0 1 1.5 1.5V6m-10.5 0h12l-1.14 12.54a2.25 2.25 0 0 1-2.24 2.09H8.64a2.25 2.25 0 0 1-2.24-2.09L5.25 6ZM10.5 11.25l.75 6m2.25-6-.75 6"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Employee Modal for Adding */}
      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onRequestClose={() => setIsEmployeeModalOpen(false)}
        employee={employee}
        handleEmployeeChange={handleEmployeeChange}
        handleSubmit={handleEmployeeSubmit}
        isEdit={false}
      />

      {/* Employee Modal for Editing */}
      <EmployeeModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        employee={employee}
        handleEmployeeChange={handleEmployeeChange}
        handleSubmit={handleUpdateEmployee}
        isEdit={true}
      />

      <ToastContainer />
    </div>
  );
};

export default AddEmployee;
