import { useQuery } from 'react-query';
import axios from 'axios';

const fetchEmployees = async () => {
  const { data } = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
  return data.data;
};

const EmployeeDetails = () => {
  return useQuery('employees', fetchEmployees);
};

export default EmployeeDetails;
