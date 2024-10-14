import React from "react";
import Modal from "react-modal";

const EmployeeModal = ({
  isOpen,
  onRequestClose,
  employee,
  handleEmployeeChange,
  handleSubmit,
  isEdit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-4 rounded shadow-lg w-1/3 h-2/5 relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-lg font-bold mb-4 text-[#3411a3]">
        {isEdit ? "Edit Employee" : "Add Employee"}
      </h2>
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-full text-2xl"
      >
        &times;
      </button>
      {/*Edit Employee Form*/}
      <form onSubmit={handleSubmit}>
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
          className={`border rounded p-2 mb-2 w-full outline-none ${
            isEdit ? "bg-gray-100" : ""
          }`}
          disabled={isEdit}
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
          className="border rounded p-2 mb-4 w-full outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg"
        >
          {isEdit ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </Modal>
  );
};

export default EmployeeModal;
