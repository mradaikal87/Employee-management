import React, { useEffect } from "react";
import useEmployees from "../EmployeeDetails/EmployeeDetails";
import Image from "next/image";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import { useRouter } from "next/router";

const ViewEmployee = () => {
  const { data: employees, isLoading, isError } = useEmployees();
  const router = useRouter();

  useEffect(() => {
    console.log("Employees:", employees);
    console.log("Is Loading:", isLoading);
    console.log("Is Error:", isError);
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadSpinner />
      </div>
    );
  }

  if (isError) {
    return <div className=" mt-10">Error loading data</div>;
  }

  const handleEditClick = (employeeId) => {
    // Navigate to the edit page with the employee ID
    // router.push(`/edit-employee/${employeeId}`);
  };

  const handleDeleteClick = async (employeeId, retryCount = 0) => {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${employeeId}`,
        {
          method: "DELETE",
         headers: {'Content-Type':'application/json'},

        }
      );

      if (response.ok) {
     
        mutate("https://dummy.restapiexample.com/api/v1/employees");

        return;
      }

      throw new Error(`Failed to delete employee. Status: ${response.status}`);

      // Update the local state by refetching the data

      console.log(`Employee with ID ${employeeId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };
  console.log(employees);
  return (
    <section className="view-employee-section">
      <div className="table-section">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Employee Id</th>
              <th className="px-4 py-2">Employee Age</th>
              <th className="px-4 py-2">Employee Name</th>
              <th className="px-4 py-2">Employee Salary</th>
              <th className="px-4 py-2">Employee Profile Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border px-4 py-2">{employee.id}</td>
                <td className="border px-4 py-2">{employee.employee_age}</td>
                {employee.employee_name ? (
                  <td className="border px-4 py-2">
                    {employee.employee_name.length > 25
                      ? `${employee.employee_name.substring(0, 25)}...`
                      : employee.employee_name}
                  </td>
                ) : (
                  <td className="border px-4 py-2">-</td>
                )}
                {employee.employee_salary ? (
                  <td className="border px-4 py-2">
                    {employee.employee_salary}
                  </td>
                ) : (
                  <td className="border px-4 py-2">-</td>
                )}
                <td className="border px-4 py-2">
                  {employee.profile_image ? (
                    <Image
                      width={50}
                      height={50}
                      src={employee.profile_image}
                      alt={`Profile of ${employee.employee_name}`}
                      className="h-8 w-8 object-cover rounded-full"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(employee.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(employee.id)}
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
    </section>
  );
};

export default ViewEmployee;
