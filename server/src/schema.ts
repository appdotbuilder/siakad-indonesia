import { z } from 'zod';

// Enums
export const userRoleEnum = z.enum(['admin', 'teacher', 'student', 'staff']);
export const genderEnum = z.enum(['male', 'female']);
export const attendanceStatusEnum = z.enum(['present', 'absent', 'late', 'excused']);
export const gradeTypeEnum = z.enum(['daily', 'quiz', 'midterm', 'final', 'project']);
export const disciplineTypeEnum = z.enum(['warning', 'suspension', 'violation', 'achievement']);
export const paymentStatusEnum = z.enum(['pending', 'paid', 'overdue', 'cancelled']);
export const transactionTypeEnum = z.enum(['income', 'expense']);
export const bookStatusEnum = z.enum(['available', 'borrowed', 'lost', 'maintenance']);
export const assetStatusEnum = z.enum(['good', 'damaged', 'maintenance', 'disposed']);
export const semesterEnum = z.enum(['1', '2']);

export type UserRole = z.infer<typeof userRoleEnum>;
export type Gender = z.infer<typeof genderEnum>;
export type AttendanceStatus = z.infer<typeof attendanceStatusEnum>;
export type GradeType = z.infer<typeof gradeTypeEnum>;
export type DisciplineType = z.infer<typeof disciplineTypeEnum>;
export type PaymentStatus = z.infer<typeof paymentStatusEnum>;
export type TransactionType = z.infer<typeof transactionTypeEnum>;
export type BookStatus = z.infer<typeof bookStatusEnum>;
export type AssetStatus = z.infer<typeof assetStatusEnum>;
export type Semester = z.infer<typeof semesterEnum>;

// School Profile Schema
export const schoolProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
  website: z.string().url().nullable(),
  principal_name: z.string(),
  vision: z.string().nullable(),
  mission: z.string().nullable(),
  logo_url: z.string().url().nullable(),
  established_year: z.number().int().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type SchoolProfile = z.infer<typeof schoolProfileSchema>;

export const createSchoolProfileInputSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
  website: z.string().url().nullable(),
  principal_name: z.string(),
  vision: z.string().nullable(),
  mission: z.string().nullable(),
  logo_url: z.string().url().nullable(),
  established_year: z.number().int().nullable()
});

export type CreateSchoolProfileInput = z.infer<typeof createSchoolProfileInputSchema>;

// Academic Year Schema
export const academicYearSchema = z.object({
  id: z.number(),
  year_start: z.number().int(),
  year_end: z.number().int(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type AcademicYear = z.infer<typeof academicYearSchema>;

export const createAcademicYearInputSchema = z.object({
  year_start: z.number().int(),
  year_end: z.number().int(),
  is_active: z.boolean().optional()
});

export type CreateAcademicYearInput = z.infer<typeof createAcademicYearInputSchema>;

// Semester Schema
export const semesterSchema = z.object({
  id: z.number(),
  academic_year_id: z.number(),
  semester: semesterEnum,
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type SemesterSchema = z.infer<typeof semesterSchema>;

export const createSemesterInputSchema = z.object({
  academic_year_id: z.number(),
  semester: semesterEnum,
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  is_active: z.boolean().optional()
});

export type CreateSemesterInput = z.infer<typeof createSemesterInputSchema>;

// Subject Schema
export const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  description: z.string().nullable(),
  credits: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Subject = z.infer<typeof subjectSchema>;

export const createSubjectInputSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string().nullable(),
  credits: z.number().int()
});

export type CreateSubjectInput = z.infer<typeof createSubjectInputSchema>;

// Class Schema
export const classSchema = z.object({
  id: z.number(),
  name: z.string(),
  grade_level: z.number().int(),
  capacity: z.number().int(),
  academic_year_id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Class = z.infer<typeof classSchema>;

export const createClassInputSchema = z.object({
  name: z.string(),
  grade_level: z.number().int(),
  capacity: z.number().int(),
  academic_year_id: z.number()
});

export type CreateClassInput = z.infer<typeof createClassInputSchema>;

// User Schema
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  role: userRoleEnum,
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

export const createUserInputSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: userRoleEnum,
  is_active: z.boolean().optional()
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

// Student Schema
export const studentSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  student_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  gender: genderEnum,
  address: z.string().nullable(),
  phone: z.string().nullable(),
  parent_name: z.string().nullable(),
  parent_phone: z.string().nullable(),
  parent_email: z.string().email().nullable(),
  class_id: z.number().nullable(),
  enrollment_date: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Student = z.infer<typeof studentSchema>;

export const createStudentInputSchema = z.object({
  user_id: z.number(),
  student_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  gender: genderEnum,
  address: z.string().nullable(),
  phone: z.string().nullable(),
  parent_name: z.string().nullable(),
  parent_phone: z.string().nullable(),
  parent_email: z.string().email().nullable(),
  class_id: z.number().nullable(),
  enrollment_date: z.coerce.date()
});

export type CreateStudentInput = z.infer<typeof createStudentInputSchema>;

// Teacher Schema
export const teacherSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  teacher_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  gender: genderEnum,
  address: z.string().nullable(),
  phone: z.string().nullable(),
  qualification: z.string().nullable(),
  hire_date: z.coerce.date(),
  salary: z.number().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Teacher = z.infer<typeof teacherSchema>;

export const createTeacherInputSchema = z.object({
  user_id: z.number(),
  teacher_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  gender: genderEnum,
  address: z.string().nullable(),
  phone: z.string().nullable(),
  qualification: z.string().nullable(),
  hire_date: z.coerce.date(),
  salary: z.number().nullable()
});

export type CreateTeacherInput = z.infer<typeof createTeacherInputSchema>;

// Attendance Schema
export const attendanceSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  date: z.coerce.date(),
  status: attendanceStatusEnum,
  notes: z.string().nullable(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Attendance = z.infer<typeof attendanceSchema>;

export const createAttendanceInputSchema = z.object({
  student_id: z.number(),
  date: z.coerce.date(),
  status: attendanceStatusEnum,
  notes: z.string().nullable(),
  created_by: z.number()
});

export type CreateAttendanceInput = z.infer<typeof createAttendanceInputSchema>;

// Grade Schema
export const gradeSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  subject_id: z.number(),
  semester_id: z.number(),
  grade_type: gradeTypeEnum,
  score: z.number(),
  max_score: z.number(),
  date: z.coerce.date(),
  notes: z.string().nullable(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Grade = z.infer<typeof gradeSchema>;

export const createGradeInputSchema = z.object({
  student_id: z.number(),
  subject_id: z.number(),
  semester_id: z.number(),
  grade_type: gradeTypeEnum,
  score: z.number(),
  max_score: z.number(),
  date: z.coerce.date(),
  notes: z.string().nullable(),
  created_by: z.number()
});

export type CreateGradeInput = z.infer<typeof createGradeInputSchema>;

// Payment Schema
export const paymentSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  amount: z.number(),
  description: z.string(),
  due_date: z.coerce.date(),
  paid_date: z.coerce.date().nullable(),
  status: paymentStatusEnum,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Payment = z.infer<typeof paymentSchema>;

export const createPaymentInputSchema = z.object({
  student_id: z.number(),
  amount: z.number(),
  description: z.string(),
  due_date: z.coerce.date(),
  paid_date: z.coerce.date().nullable(),
  status: paymentStatusEnum.optional()
});

export type CreatePaymentInput = z.infer<typeof createPaymentInputSchema>;

// Discipline Schema
export const disciplineSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  type: disciplineTypeEnum,
  title: z.string(),
  description: z.string().nullable(),
  date: z.coerce.date(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Discipline = z.infer<typeof disciplineSchema>;

export const createDisciplineInputSchema = z.object({
  student_id: z.number(),
  type: disciplineTypeEnum,
  title: z.string(),
  description: z.string().nullable(),
  date: z.coerce.date(),
  created_by: z.number()
});

export type CreateDisciplineInput = z.infer<typeof createDisciplineInputSchema>;

// Schedule Schema
export const scheduleSchema = z.object({
  id: z.number(),
  class_id: z.number(),
  subject_id: z.number(),
  teacher_id: z.number(),
  day_of_week: z.number().int().min(1).max(7),
  start_time: z.string(),
  end_time: z.string(),
  semester_id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Schedule = z.infer<typeof scheduleSchema>;

export const createScheduleInputSchema = z.object({
  class_id: z.number(),
  subject_id: z.number(),
  teacher_id: z.number(),
  day_of_week: z.number().int().min(1).max(7),
  start_time: z.string(),
  end_time: z.string(),
  semester_id: z.number()
});

export type CreateScheduleInput = z.infer<typeof createScheduleInputSchema>;

// Exam Schema
export const examSchema = z.object({
  id: z.number(),
  title: z.string(),
  subject_id: z.number(),
  class_id: z.number(),
  exam_date: z.coerce.date(),
  duration: z.number().int(),
  total_marks: z.number(),
  description: z.string().nullable(),
  semester_id: z.number(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Exam = z.infer<typeof examSchema>;

export const createExamInputSchema = z.object({
  title: z.string(),
  subject_id: z.number(),
  class_id: z.number(),
  exam_date: z.coerce.date(),
  duration: z.number().int(),
  total_marks: z.number(),
  description: z.string().nullable(),
  semester_id: z.number(),
  created_by: z.number()
});

export type CreateExamInput = z.infer<typeof createExamInputSchema>;

// Financial Transaction Schema
export const financialTransactionSchema = z.object({
  id: z.number(),
  type: transactionTypeEnum,
  amount: z.number(),
  description: z.string(),
  date: z.coerce.date(),
  category: z.string().nullable(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type FinancialTransaction = z.infer<typeof financialTransactionSchema>;

export const createFinancialTransactionInputSchema = z.object({
  type: transactionTypeEnum,
  amount: z.number(),
  description: z.string(),
  date: z.coerce.date(),
  category: z.string().nullable(),
  created_by: z.number()
});

export type CreateFinancialTransactionInput = z.infer<typeof createFinancialTransactionInputSchema>;

// Book Schema
export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  isbn: z.string().nullable(),
  publisher: z.string().nullable(),
  publication_year: z.number().int().nullable(),
  category: z.string().nullable(),
  total_copies: z.number().int(),
  available_copies: z.number().int(),
  status: bookStatusEnum,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Book = z.infer<typeof bookSchema>;

export const createBookInputSchema = z.object({
  title: z.string(),
  author: z.string(),
  isbn: z.string().nullable(),
  publisher: z.string().nullable(),
  publication_year: z.number().int().nullable(),
  category: z.string().nullable(),
  total_copies: z.number().int(),
  available_copies: z.number().int().optional(),
  status: bookStatusEnum.optional()
});

export type CreateBookInput = z.infer<typeof createBookInputSchema>;

// Asset Schema
export const assetSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  description: z.string().nullable(),
  serial_number: z.string().nullable(),
  purchase_date: z.coerce.date().nullable(),
  purchase_price: z.number().nullable(),
  location: z.string().nullable(),
  status: assetStatusEnum,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Asset = z.infer<typeof assetSchema>;

export const createAssetInputSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string().nullable(),
  serial_number: z.string().nullable(),
  purchase_date: z.coerce.date().nullable(),
  purchase_price: z.number().nullable(),
  location: z.string().nullable(),
  status: assetStatusEnum.optional()
});

export type CreateAssetInput = z.infer<typeof createAssetInputSchema>;

// Announcement Schema
export const announcementSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  target_audience: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  is_published: z.boolean(),
  publish_date: z.coerce.date().nullable(),
  expire_date: z.coerce.date().nullable(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Announcement = z.infer<typeof announcementSchema>;

export const createAnnouncementInputSchema = z.object({
  title: z.string(),
  content: z.string(),
  target_audience: z.string(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  is_published: z.boolean().optional(),
  publish_date: z.coerce.date().nullable(),
  expire_date: z.coerce.date().nullable(),
  created_by: z.number()
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementInputSchema>;