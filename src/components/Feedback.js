import React from 'react'

const Feedback = () => {
  return (
    
       <div className="flex items-center justify-center h-screen">
      <div className="m-12 w-full max-h-full max-w-7xl bg-white rounded-lg shadow-lg p-10">
        <h2 className="text-[#3411a3] text-3xl font-bold mb-8 text-center">Training Score Submission</h2>
        <form >
         <div className='grid grid-rows-1 grid-flow-col gap-10'>
         <label className="block text-[#3411a3] mb-2" htmlFor="employeeId">Employee Id</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                // value={formData.employeeId}
                // onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />

         
         <label className="block text-[#3411a3] mb-2" htmlFor="employeeName">Employee Name</label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                // value={formData.employeeId}
                // onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />

         </div>
        </form>
        </div>
        </div>
    
  )
}

export default Feedback
