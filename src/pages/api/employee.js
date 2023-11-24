export default async function handler(req, res) {
    try {
      const response = await fetch('https://dummy.restapiexample.com/api/v1/employees');
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch employees');
      }
  
      res.status(200).json(data.data);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }