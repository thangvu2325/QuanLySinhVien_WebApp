import axios from "axios";
export const getAllStudent = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
