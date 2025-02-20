import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchAllEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENTS_API);
  return data;
};
