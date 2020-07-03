import axios, { AxiosResponse } from "axios";
import { IExam } from "../models/exam";

axios.defaults.baseURL = "http://localhost:8000";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Exams = {
  list: (): Promise<IExam[]> => requests.get("/exams"),
  details: (id: number): Promise<IExam> => requests.get(`/exams/${id}`),
  create: (exam: IExam) => requests.post("/exams", exam),
  update: (exam: IExam) => requests.put("/exams", exam),
  delete: (id: string) => requests.delete(`/exams/${id}`),
};

export default Exams;
