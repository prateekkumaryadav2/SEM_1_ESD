// Type definitions for API responses
export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  credits: number;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
  fullName?: string;
}

export interface ErrorResponse {
  error: string;
}

export interface MessageResponse {
  message: string;
}

export interface CourseRequest {
  code: string;
  title: string;
  description: string;
  credits: number;
}

const API = {
  login: (username: string, password: string): Promise<AuthResponse | ErrorResponse> =>
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(r => r.json()),

  googleLogin: (credential: string): Promise<AuthResponse | ErrorResponse> =>
    fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential })
    }).then(r => r.json()),

  logout: (token: string): Promise<MessageResponse> =>
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json()),

  listCourses: (token: string): Promise<Course[]> =>
    fetch('/api/courses', {
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json()),

  createCourse: (token: string, course: CourseRequest): Promise<Course | ErrorResponse> =>
    fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token
      },
      body: JSON.stringify(course)
    }).then(r => r.json()),

  deleteCourse: (token: string, id: number): Promise<MessageResponse | ErrorResponse> =>
    fetch(`/api/courses/${id}`, {
      method: 'DELETE',
      headers: { 'X-Auth-Token': token }
    }).then(r => r.json())
};

export default API;
