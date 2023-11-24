import React, { useState } from "react";
import useStore from "../StoreData/StoreData";

export default function AddEmployee(props) {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleAddEmployee = async () => {
    try {
      setNameError("");
      setSalaryError("");
      setAgeError("");
      setFileError("");

      if (!name) {
        setNameError("Name is required");
      }

      if (!salary) {
        setSalaryError("Salary is required");
      }

      if (!age) {
        setAgeError("Age is required");
      }

      if (!profileImage) {
        setFileError("Profile image is required");
      }

      if (!name || !salary || !age || !profileImage) {
        console.error(
          "Validation Error(s):",
          nameError,
          salaryError,
          ageError,
          fileError
        );
        return;
      }

      const formData = {
        "name": name,
        "salary": parseInt(salary),
        "age":  parseInt(age),
        // profile_image: profileImage,
      };

      console.log(formData);
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        {
          method: "POST",
         headers: {'Content-Type':'application/json'},
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to add employee. Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Newly created employee:", data);

      setEmployeeList([...employeeList, data]);

      setName("");
      setSalary("");
      setAge("");
      setProfileImage(null);
      setSuccessMessage("Employee added successfully!");
    } catch (error) {}
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (/^[A-Za-z\s-]*$/.test(inputName) || inputName === "") {
      setName(inputName);
    }
  };

  const handleSalaryChange = (e) => {
    const inputSalary = e.target.value;
    if (/^[1-9]\d*$/.test(inputSalary) || inputSalary === "") {
      setSalary(inputSalary);
    }
  };

  return (
    <section className={`add-employee ${props?.Class ? props?.Class : ""}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Add Employee</h2>
            {successMessage && (
              <div className="mb-4 text-green-600">{successMessage}</div>
            )}

            <div className="mb-4">
              <label className="block text-gray-600 mb-1 label text-left">
                Name:
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md input-field"
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && <div className="text-red-500">{nameError}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 label text-left">
                Salary:
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md input-field"
                value={salary}
                onChange={handleSalaryChange}
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
              {ageError && <div className="text-red-500">{ageError}</div>}
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
              {fileError && <div className="text-red-500">{fileError}</div>}
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 add-button"
              onClick={() => handleAddEmployee()}
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// import React, { useState } from "react";

// export default function AddEmployee(props) {
//   const [name, setName] = useState("");
//   const [salary, setSalary] = useState("");
//   const [age, setAge] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [salaryError, setSalaryError] = useState("");
//   const [ageError, setAgeError] = useState("");
//   const [fileError, setFileError] = useState("");

//   const handleAddEmployee = async () => {
//     try {
//       setNameError("");
//       setSalaryError("");
//       setAgeError("");
//       setFileError("");

//       if (!name) {
//         setNameError("Name is required");
//       }

//       if (!salary) {
//         setSalaryError("Salary is required");
//       }

//       if (!age) {
//         setAgeError("Age is required");
//       }

//       if (!profileImage) {
//         setFileError("Profile image is required");
//       }

//       if (!name || !salary || !age || !profileImage) {
//         console.error(
//           "Validation Error(s):",
//           nameError,
//           salaryError,
//           ageError,
//           fileError
//         );
//         return;
//       }

//       const formData = new FormData();
//       formData.append("employee_name", name);
//       formData.append("employee_salary", salary);
//       formData.append("employee_age", age);
//       formData.append("profile_image", profileImage);

//       console.log(formData);
//       const response = await fetch(
//         "https://dummy.restapiexample.com/api/v1/create",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to add employee. Status: ${response.status}`);
//       }

//       const data = await response.json();

//       console.log("Newly created employee:", data);

//       setEmployeeList([...employeeList, data]);

//       setName("");
//       setSalary("");
//       setAge("");
//       setProfileImage(null);
//       setSuccessMessage("Employee added successfully!");

//     } catch (error) {
//       console.error("Error adding employee:", error.message);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfileImage(file);
//   };

//   const handleNameChange = (e) => {
//     const inputName = e.target.value;
//     if (/^[A-Za-z\s-]*$/.test(inputName) || inputName === "") {
//       setName(inputName);
//     }
//   };

//   const handleSalaryChange = (e) => {
//     const inputSalary = e.target.value;
//     if (/^[1-9]\d*$/.test(inputSalary) || inputSalary === "") {
//       setSalary(inputSalary);
//     }
//   };

//   return (
//     <section className={`add-employee ${props?.Class ? props?.Class : ""}`}>
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-4">Add Employee</h2>
//             {successMessage && (
//               <div className="mb-4 text-green-600">{successMessage}</div>
//             )}

//             <div className="mb-4">
//               <label className="block text-gray-600 mb-1 label text-left">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 p-2 rounded-md input-field"
//                 value={name}
//                 onChange={handleNameChange}
//                 required
//               />
//               {nameError && <div className="text-red-500">{nameError}</div>}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600 mb-1 label text-left">
//                 Salary:
//               </label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 p-2 rounded-md input-field"
//                 value={salary}
//                 onChange={handleSalaryChange}
//                 required
//               />
//               {salaryError && <div className="text-red-500">{salaryError}</div>}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600 mb-1 label text-left">
//                 Age:
//               </label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 p-2 rounded-md input-field"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 required
//               />
//               {ageError && <div className="text-red-500">{ageError}</div>}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600 mb-1 label text-left">
//                 Profile Image:
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="w-full border border-gray-300 p-2 rounded-md input-field"
//               />
//               {fileError && <div className="text-red-500">{fileError}</div>}
//             </div>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 add-button"
//               onClick={handleAddEmployee}
//             >
//               Add Employee
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
