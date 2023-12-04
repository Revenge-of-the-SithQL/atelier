import axios from 'axios';

export const getListOfQuestions = (id) => axios.get(`/qa/questions/?product_id=${id}&page=1&count=100`);

export const markQuestionHelpful = (id) => axios.put(`/qa/questions/${id}/helpful`, null);

export const markAnswerHelpful = (id) => axios.put(`/qa/answers/${id}/helpful`, null);

export const reportAnswer = (id) => axios.put(`/qa/answers/${id}/report`, null);

export const addQuestion = (data) => axios.post('/qa/questions', data);

export const addAnswer = (id, data) => axios.post(`/qa/questions/${id}/answers`, data);
