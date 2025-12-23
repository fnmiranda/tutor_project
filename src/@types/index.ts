export type UserRole = 'student' | 'teacher';

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Student extends BaseUser {
  role: 'student';
  enrollment: string;
  course: string;
  semester: number;
}

export interface Teacher extends BaseUser {
  role: 'teacher';
  department: string;
  employeeId: string;
}

export type User = Student | Teacher;
