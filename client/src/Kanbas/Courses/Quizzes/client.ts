import axios from "axios";

// Define base APIs based on backend routes
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });

/**
 * Fetch all attempts made by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<any[]>} - Array of attempt objects.
 */
export const getUserAttempts = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${USERS_API}/${userId}/attempts`
    );
    return response.data; // Array of attempt objects
  } catch (error) {
    console.error(`Error fetching attempts for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Increment the attempt count for a specific quiz.
 * This is typically equivalent to creating a new attempt.
 * @param {string} courseId - The ID of the course (unused in API call).
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise<any>} - Confirmation or updated attempt count.
 */
// export const incrementUserQuizAttempt = async (
//   courseId: string,
//   quizId: string
// ) => {
//   try {
//     const response = await axiosWithCredentials.post(
//       `${QUIZZES_API}/${quizId}/attempts`
//       // If the backend requires any data, pass it as the second argument
//       // For example: {}, if no data is needed
//     );
//     return response.data; // Updated attempt count or confirmation
//   } catch (error) {
//     console.error("Error incrementing user quiz attempt:", error);
//     throw error;
//   }
// };

// Fetch the number of attempts a user has made on a specific quiz
export const getUserQuizAttempts = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`
  );
  return response.data; // Expected to return { quizId: string, userId: string, attemptCount: number }
};
// Client-side request updated to match server route
export const incrementUserQuizAttempt = async (
  courseId: string,
  quizId: string
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempt`
  );
  return response.data; // Expected to return updated attempt count or confirmation
};

/**
 * Fetch all attempts for a specific quiz.
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise<any[]>} - Array of attempt objects.
 */
export const getAllAttemptsForQuiz = async (quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${QUIZZES_API}/${quizId}/attempts`
    );
    return response.data; // Array of attempt objects
  } catch (error) {
    console.error("Error fetching all attempts for quiz:", error);
    throw error;
  }
};

/**
 * Fetch a specific attempt by its ID.
 * @param {string} attemptId - The ID of the attempt.
 * @returns {Promise<any>} - Attempt object.
 */
export const getAttemptById = async (attemptId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${ATTEMPTS_API}/${attemptId}`
    );
    return response.data; // Attempt object
  } catch (error) {
    console.error("Error fetching attempt by ID:", error);
    throw error;
  }
};

/**
 * Create a new attempt for a quiz.
 * @param {string} courseId - The ID of the course (unused in API call).
 * @param {string} quizId - The ID of the quiz.
 * @param {object} attemptData - Data for the new attempt.
 * @returns {Promise<any>} - Newly created attempt.
 */
export const createAttempt = async (
  courseId: string,
  quizId: string,
  attemptData: object
) => {
  try {
    const response = await axiosWithCredentials.post(
      `${QUIZZES_API}/${quizId}/attempts`,
      attemptData
    );
    return response.data; // Newly created attempt
  } catch (error) {
    console.error("Error creating new attempt:", error);
    throw error;
  }
};

/**
 * Update an existing attempt.
 * @param {string} attemptId - The ID of the attempt to update.
 * @param {object} attemptUpdates - The updates to apply.
 * @returns {Promise<any>} - Updated attempt.
 */
export const updateAttempt = async (
  attemptId: string,
  attemptUpdates: object
) => {
  try {
    const response = await axiosWithCredentials.put(
      `${ATTEMPTS_API}/${attemptId}`,
      attemptUpdates
    );
    return response.data; // Updated attempt
  } catch (error) {
    console.error("Error updating attempt:", error);
    throw error;
  }
};

/**
 * Delete an attempt by its ID.
 * @param {string} attemptId - The ID of the attempt to delete.
 * @returns {Promise<any>} - Confirmation of deletion.
 */
export const deleteAttempt = async (attemptId: string) => {
  try {
    const response = await axiosWithCredentials.delete(
      `${ATTEMPTS_API}/${attemptId}`
    );
    return response.data; // Confirmation of deletion
  } catch (error) {
    console.error("Error deleting attempt:", error);
    throw error;
  }
};

/**
 * Get the latest attempt for a quiz by the authenticated user.
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise<any>} - Latest attempt object.
 */
export const getLatestAttemptForQuiz = async (quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${QUIZZES_API}/${quizId}/attempts/latest`
    );
    return response.data; // Latest attempt object
  } catch (error) {
    console.error("Error fetching latest attempt for quiz:", error);
    throw error;
  }
};
