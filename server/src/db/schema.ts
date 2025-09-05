import { 
  serial, 
  text, 
  pgTable, 
  timestamp, 
  numeric, 
  integer, 
  boolean, 
  date,
  time,
  pgEnum,
  unique,
  index
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'teacher', 'student', 'staff']);
export const genderEnum = pgEnum('gender', ['male', 'female']);
export const attendanceStatusEnum = pgEnum('attendance_status', ['present', 'absent', 'late', 'excused']);
export const gradeTypeEnum = pgEnum('grade_type', ['daily', 'quiz', 'midterm', 'final', 'project']);
export const disciplineTypeEnum = pgEnum('discipline_type', ['warning', 'suspension', 'violation', 'achievement']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid', 'overdue', 'cancelled']);
export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense']);
export const bookStatusEnum = pgEnum('book_status', ['available', 'borrowed', 'lost', 'maintenance']);
export const assetStatusEnum = pgEnum('asset_status', ['good', 'damaged', 'maintenance', 'disposed']);
export const semesterEnum = pgEnum('semester', ['1', '2']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);

// School Profile Table
export const schoolProfilesTable = pgTable('school_profiles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  phone: text('phone'),
  email: text('email'),
  website: text('website'),
  principal_name: text('principal_name').notNull(),
  vision: text('vision'),
  mission: text('mission'),
  logo_url: text('logo_url'),
  established_year: integer('established_year'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Academic Year Table
export const academicYearsTable = pgTable('academic_years', {
  id: serial('id').primaryKey(),
  year_start: integer('year_start').notNull(),
  year_end: integer('year_end').notNull(),
  is_active: boolean('is_active').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueYear: unique().on(table.year_start, table.year_end),
}));

// Semester Table
export const semestersTable = pgTable('semesters', {
  id: serial('id').primaryKey(),
  academic_year_id: integer('academic_year_id').notNull(),
  semester: semesterEnum('semester').notNull(),
  start_date: date('start_date').notNull(),
  end_date: date('end_date').notNull(),
  is_active: boolean('is_active').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Subject Table
export const subjectsTable = pgTable('subjects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  description: text('description'),
  credits: integer('credits').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueCode: unique().on(table.code),
}));

// Class Table
export const classesTable = pgTable('classes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  grade_level: integer('grade_level').notNull(),
  capacity: integer('capacity').notNull(),
  academic_year_id: integer('academic_year_id').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// User Table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password_hash: text('password_hash').notNull(),
  role: userRoleEnum('role').notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueUsername: unique().on(table.username),
  uniqueEmail: unique().on(table.email),
}));

// Student Table
export const studentsTable = pgTable('students', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  student_id: text('student_id').notNull(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  date_of_birth: date('date_of_birth').notNull(),
  gender: genderEnum('gender').notNull(),
  address: text('address'),
  phone: text('phone'),
  parent_name: text('parent_name'),
  parent_phone: text('parent_phone'),
  parent_email: text('parent_email'),
  class_id: integer('class_id'),
  enrollment_date: date('enrollment_date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueStudentId: unique().on(table.student_id),
  uniqueUserId: unique().on(table.user_id),
}));

// Teacher Table
export const teachersTable = pgTable('teachers', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  teacher_id: text('teacher_id').notNull(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  date_of_birth: date('date_of_birth').notNull(),
  gender: genderEnum('gender').notNull(),
  address: text('address'),
  phone: text('phone'),
  qualification: text('qualification'),
  hire_date: date('hire_date').notNull(),
  salary: numeric('salary', { precision: 10, scale: 2 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueTeacherId: unique().on(table.teacher_id),
  uniqueUserId: unique().on(table.user_id),
}));

// Attendance Table
export const attendanceTable = pgTable('attendance', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull(),
  date: date('date').notNull(),
  status: attendanceStatusEnum('status').notNull(),
  notes: text('notes'),
  created_by: integer('created_by').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueStudentDate: unique().on(table.student_id, table.date),
  studentDateIdx: index('attendance_student_date_idx').on(table.student_id, table.date),
}));

// Grade Table
export const gradesTable = pgTable('grades', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull(),
  subject_id: integer('subject_id').notNull(),
  semester_id: integer('semester_id').notNull(),
  grade_type: gradeTypeEnum('grade_type').notNull(),
  score: numeric('score', { precision: 5, scale: 2 }).notNull(),
  max_score: numeric('max_score', { precision: 5, scale: 2 }).notNull(),
  date: date('date').notNull(),
  notes: text('notes'),
  created_by: integer('created_by').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  studentSubjectIdx: index('grades_student_subject_idx').on(table.student_id, table.subject_id),
}));

// Payment Table
export const paymentsTable = pgTable('payments', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  due_date: date('due_date').notNull(),
  paid_date: date('paid_date'),
  status: paymentStatusEnum('status').default('pending').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  studentStatusIdx: index('payments_student_status_idx').on(table.student_id, table.status),
}));

// Discipline Table
export const disciplineTable = pgTable('discipline', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull(),
  type: disciplineTypeEnum('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  date: date('date').notNull(),
  created_by: integer('created_by').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  studentDateIdx: index('discipline_student_date_idx').on(table.student_id, table.date),
}));

// Schedule Table
export const schedulesTable = pgTable('schedules', {
  id: serial('id').primaryKey(),
  class_id: integer('class_id').notNull(),
  subject_id: integer('subject_id').notNull(),
  teacher_id: integer('teacher_id').notNull(),
  day_of_week: integer('day_of_week').notNull(),
  start_time: time('start_time').notNull(),
  end_time: time('end_time').notNull(),
  semester_id: integer('semester_id').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  classScheduleIdx: index('schedules_class_schedule_idx').on(table.class_id, table.day_of_week),
}));

// Exam Table
export const examsTable = pgTable('exams', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  subject_id: integer('subject_id').notNull(),
  class_id: integer('class_id').notNull(),
  exam_date: timestamp('exam_date').notNull(),
  duration: integer('duration').notNull(),
  total_marks: numeric('total_marks', { precision: 5, scale: 2 }).notNull(),
  description: text('description'),
  semester_id: integer('semester_id').notNull(),
  created_by: integer('created_by').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  classDateIdx: index('exams_class_date_idx').on(table.class_id, table.exam_date),
}));

// Financial Transaction Table
export const financialTransactionsTable = pgTable('financial_transactions', {
  id: serial('id').primaryKey(),
  type: transactionTypeEnum('type').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  description: text('description').notNull(),
  date: date('date').notNull(),
  category: text('category'),
  created_by: integer('created_by').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  typeDateIdx: index('financial_transactions_type_date_idx').on(table.type, table.date),
}));

// Book Table
export const booksTable = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  isbn: text('isbn'),
  publisher: text('publisher'),
  publication_year: integer('publication_year'),
  category: text('category'),
  total_copies: integer('total_copies').notNull(),
  available_copies: integer('available_copies').notNull(),
  status: bookStatusEnum('status').default('available').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  titleAuthorIdx: index('books_title_author_idx').on(table.title, table.author),
  isbnIdx: index('books_isbn_idx').on(table.isbn),
}));

// Asset Table
export const assetsTable = pgTable('assets', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  serial_number: text('serial_number'),
  purchase_date: date('purchase_date'),
  purchase_price: numeric('purchase_price', { precision: 10, scale: 2 }),
  location: text('location'),
  status: assetStatusEnum('status').default('good').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  categoryStatusIdx: index('assets_category_status_idx').on(table.category, table.status),
}));

// Announcement Table
export const announcementsTable = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  target_audience: text('target_audience').notNull(),
  priority: priorityEnum('priority').default('medium').notNull(),
  is_published: boolean('is_published').default(false).notNull(),
  publish_date: timestamp('publish_date'),
  expire_date: timestamp('expire_date'),
  created_by: integer('created_by').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  publishedDateIdx: index('announcements_published_date_idx').on(table.is_published, table.publish_date),
}));

// Relations
export const academicYearRelations = relations(academicYearsTable, ({ many }) => ({
  semesters: many(semestersTable),
  classes: many(classesTable),
}));

export const semesterRelations = relations(semestersTable, ({ one, many }) => ({
  academicYear: one(academicYearsTable, {
    fields: [semestersTable.academic_year_id],
    references: [academicYearsTable.id],
  }),
  schedules: many(schedulesTable),
  exams: many(examsTable),
  grades: many(gradesTable),
}));

export const classRelations = relations(classesTable, ({ one, many }) => ({
  academicYear: one(academicYearsTable, {
    fields: [classesTable.academic_year_id],
    references: [academicYearsTable.id],
  }),
  students: many(studentsTable),
  schedules: many(schedulesTable),
  exams: many(examsTable),
}));

export const userRelations = relations(usersTable, ({ one }) => ({
  student: one(studentsTable, {
    fields: [usersTable.id],
    references: [studentsTable.user_id],
  }),
  teacher: one(teachersTable, {
    fields: [usersTable.id],
    references: [teachersTable.user_id],
  }),
}));

export const studentRelations = relations(studentsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [studentsTable.user_id],
    references: [usersTable.id],
  }),
  class: one(classesTable, {
    fields: [studentsTable.class_id],
    references: [classesTable.id],
  }),
  attendance: many(attendanceTable),
  grades: many(gradesTable),
  payments: many(paymentsTable),
  discipline: many(disciplineTable),
}));

export const teacherRelations = relations(teachersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [teachersTable.user_id],
    references: [usersTable.id],
  }),
  schedules: many(schedulesTable),
}));

export const scheduleRelations = relations(schedulesTable, ({ one }) => ({
  class: one(classesTable, {
    fields: [schedulesTable.class_id],
    references: [classesTable.id],
  }),
  subject: one(subjectsTable, {
    fields: [schedulesTable.subject_id],
    references: [subjectsTable.id],
  }),
  teacher: one(teachersTable, {
    fields: [schedulesTable.teacher_id],
    references: [teachersTable.id],
  }),
  semester: one(semestersTable, {
    fields: [schedulesTable.semester_id],
    references: [semestersTable.id],
  }),
}));

export const gradeRelations = relations(gradesTable, ({ one }) => ({
  student: one(studentsTable, {
    fields: [gradesTable.student_id],
    references: [studentsTable.id],
  }),
  subject: one(subjectsTable, {
    fields: [gradesTable.subject_id],
    references: [subjectsTable.id],
  }),
  semester: one(semestersTable, {
    fields: [gradesTable.semester_id],
    references: [semestersTable.id],
  }),
}));

// Export all tables for proper query building
export const tables = {
  schoolProfiles: schoolProfilesTable,
  academicYears: academicYearsTable,
  semesters: semestersTable,
  subjects: subjectsTable,
  classes: classesTable,
  users: usersTable,
  students: studentsTable,
  teachers: teachersTable,
  attendance: attendanceTable,
  grades: gradesTable,
  payments: paymentsTable,
  discipline: disciplineTable,
  schedules: schedulesTable,
  exams: examsTable,
  financialTransactions: financialTransactionsTable,
  books: booksTable,
  assets: assetsTable,
  announcements: announcementsTable,
};