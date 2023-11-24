import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditEmployee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [salaryError, setSalaryError] = useState("");
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeDetails(employeeId);
    }
  }, [employeeId]);

  const truncatedName = name.slice(0, 25);

  const fetchEmployeeDetails = async (id) => {
    try {
      setIsLoading(true);
      setSalaryError("");
      setError("");

      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        // router.replace(`/?tab=edit=${employeeId}`);
        if (data.status === "success") {
          setName(data.data.employee_name);
          setSalary(data.data.employee_salary);
          setAge(data.data.employee_age);
        } else {
          setError("Employee not found"); // Set error message for employee not found
        }
      } else {
        console.error("Failed to fetch employee details:", response.statusText);
        setError("Failed to fetch employee details");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("Error fetching employee details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      // Validate salary
      if (!/^[1-9]\d*$/.test(salary) && salary !== "") {
        setSalaryError("Salary must be a non-negative number.");
        return;
      }

      setSalaryError("");

      const truncatedName = name.slice(0, 25);

      const formData = new FormData();
      formData.append("name", truncatedName);
      formData.append("salary", salary);
      formData.append("age", age);
      formData.append("profile_image", profileImage);

      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/update/${employeeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to add employee. Status: ${response.status}`);
      }

      

      const data = await response.json();
      if (data.status === "success") {
        console.log("Employee updated successfully:", data);

        setName("");
        setSalary("");
        setAge("");
        setProfileImage(null);
        setUpdateSuccess(true);

        setTimeout(() => setUpdateSuccess(false), 5000);
      } else {
        console.error("Failed to update employee:", data.message);
        setUpdateSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setUpdateSuccess(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <section className="edit-employee">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 label text-left">
                Employee ID:
              </label>
              <div className="flex justify-between">
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded-md input-field"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
                <button
                  onClick={() => fetchEmployeeDetails(employeeId)}
                  className="search-button"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1 label text-left">
                Name:
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md input-field"
                value={truncatedName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 label text-left">
                Salary:
              </label>
              <input
                type="text"
                className={`w-full border border-gray-300 p-2 rounded-md input-field ${
                  salaryError ? "border-red-500" : ""
                }`}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
              {salaryError && <div className="text-red-500">{salaryError}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 label text-left">
                Age:
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md input-field"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 label text-left">
                Profile Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 p-2 rounded-md input-field"
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 add-button"
              onClick={() => handleUpdateEmployee()}
            >
              Update Employee
            </button>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {updateSuccess && (
              <div className="text-green-500 mb-4">
                Employee updated successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditEmployee;
