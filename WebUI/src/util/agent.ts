import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { IExam } from "../models/exam";
import { IUser } from "../models/user";
import { getBearerToken } from "./Auth";
import { IResource } from "../models/resource";

axios.defaults.baseURL = "http://localhost:8000";
axios.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${getBearerToken()}`;
  return config;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {} | string, extraConfig?: {}) => axios.post(url, body, extraConfig).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  upload: (url: string, formData: FormData, config: {}) => axios.post(url, formData, config).then(responseBody)
};

export const Exams = {
  list: (onlyPassed: boolean = false): Promise<IExam[]> => requests.get(`/exams/?only_passed=${onlyPassed}`),
  details: (id: number): Promise<IExam> => requests.get(`/exams/${id}`),
  create: (exam: IExam) => requests.post("/exams", exam),
  update: (exam: IExam) => requests.put(`/exams/${exam.id!}`, exam),
  delete: (id: number) => requests.delete(`/exams/${id}`),
  average: (): Promise<number> => requests.get("/exams/average"),
  totalEcts: (): Promise<number> => requests.get("/exams/totalEcts")
};

export const Auth = {
  register: (user: IUser) => requests.post("/auth/register", user),
  login: (username: string, password: string) => requests.post("/auth/token", qs.stringify({ username, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}),
  me: () => requests.get("/auth/me")
}

export const Resource = {
  create: (resource: IResource, file: File): Promise<IResource> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", resource.title);
    return requests.upload(`/resources/${resource.exam_id}?shared=${resource.shared}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  delete: (examId: number, resourceId: string) => requests.delete(`/resources/${examId}?resource_id=${resourceId}`)
}