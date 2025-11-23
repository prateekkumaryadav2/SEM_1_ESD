// src/models/types.ts

export interface User {
  employee_id: number;
  first_name: string;
  email: string;
  department: string; // Essential to check if they are 'Admin'
}

export interface LoginResponse {
  token: string;
  user: User;
}