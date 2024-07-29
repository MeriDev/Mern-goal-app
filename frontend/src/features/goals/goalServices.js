// const getGoals = async () => {
//   const response = await axios.get(API_URL);
//   console.log(response.data);
//   return response.data;
// };

import axios from 'axios';

const API_URL = '/api/goals/';

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

const goalServices = {
  // getGoals,
  createGoal,
};

export default goalServices;
