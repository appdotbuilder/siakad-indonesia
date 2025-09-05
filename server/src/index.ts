import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import {
  createSchoolProfileInputSchema,
  createAcademicYearInputSchema,
  createSemesterInputSchema,
  createSubjectInputSchema,
  createClassInputSchema,
  createUserInputSchema,
  createStudentInputSchema,
  createTeacherInputSchema,
  createAttendanceInputSchema,
  createGradeInputSchema,
  createPaymentInputSchema,
  createDisciplineInputSchema,
  createScheduleInputSchema,
  createExamInputSchema,
  createFinancialTransactionInputSchema,
  createBookInputSchema,
  createAssetInputSchema,
  createAnnouncementInputSchema
} from './schema';

// Import handlers
import { createSchoolProfile, getSchoolProfile, updateSchoolProfile } from './handlers/school_profile';
import { createAcademicYear, getAcademicYears, getActiveAcademicYear, setActiveAcademicYear } from './handlers/academic_year';
import { createSemester, getSemesters, getActiveSemester, getSemestersByAcademicYear } from './handlers/semester';
import { createSubject, getSubjects, getSubjectById, updateSubject, deleteSubject } from './handlers/subject';
import { createClass, getClasses, getClassesByAcademicYear, getClassById, updateClass } from './handlers/class';
import { createUser, getUserById, getUserByUsername, getUsersByRole, updateUserStatus, changePassword } from './handlers/user';
import { createStudent, getStudents, getStudentById, getStudentsByClass, updateStudent, assignStudentToClass } from './handlers/student';
import { createTeacher, getTeachers, getTeacherById, updateTeacher, getTeacherSubjects } from './handlers/teacher';
import { createAttendance, getAttendanceByStudent, getAttendanceByDate, getAttendanceByClass, updateAttendance, bulkCreateAttendance } from './handlers/attendance';
import { createGrade, getGradesByStudent, getGradesBySubject, getStudentReportCard, updateGrade, getClassGradeSummary } from './handlers/grade';
import { createPayment, getPaymentsByStudent, getOverduePayments, markPaymentAsPaid, getPaymentSummary, updatePayment } from './handlers/payment';
import { createDiscipline, getDisciplineByStudent, getDisciplineByType, updateDiscipline, deleteDiscipline } from './handlers/discipline';
import { createSchedule, getSchedulesByClass, getSchedulesByTeacher, updateSchedule, deleteSchedule, getScheduleConflicts } from './handlers/schedule';
import { createExam, getExams, getExamsByClass, getExamsBySubject, getUpcomingExams, updateExam, deleteExam } from './handlers/exam';
import { createFinancialTransaction, getFinancialTransactions, getFinancialSummary, getTransactionsByType, updateFinancialTransaction, deleteFinancialTransaction } from './handlers/financial_transaction';
import { createBook, getBooks, searchBooks, getBooksByCategory, getAvailableBooks, updateBook, updateBookAvailability, deleteBook } from './handlers/book';
import { createAsset, getAssets, getAssetsByCategory, getAssetsByStatus, getAssetsByLocation, updateAsset, updateAssetStatus, deleteAsset } from './handlers/asset';
import { createAnnouncement, getAnnouncements, getPublishedAnnouncements, getAnnouncementsByAudience, publishAnnouncement, updateAnnouncement, deleteAnnouncement } from './handlers/announcement';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // School Profile routes
  createSchoolProfile: publicProcedure
    .input(createSchoolProfileInputSchema)
    .mutation(({ input }) => createSchoolProfile(input)),
  getSchoolProfile: publicProcedure
    .query(() => getSchoolProfile()),
  updateSchoolProfile: publicProcedure
    .input(z.object({ id: z.number() }).merge(createSchoolProfileInputSchema.partial()))
    .mutation(({ input }) => updateSchoolProfile(input.id, input)),

  // Academic Year routes
  createAcademicYear: publicProcedure
    .input(createAcademicYearInputSchema)
    .mutation(({ input }) => createAcademicYear(input)),
  getAcademicYears: publicProcedure
    .query(() => getAcademicYears()),
  getActiveAcademicYear: publicProcedure
    .query(() => getActiveAcademicYear()),
  setActiveAcademicYear: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => setActiveAcademicYear(input.id)),

  // Semester routes
  createSemester: publicProcedure
    .input(createSemesterInputSchema)
    .mutation(({ input }) => createSemester(input)),
  getSemesters: publicProcedure
    .query(() => getSemesters()),
  getActiveSemester: publicProcedure
    .query(() => getActiveSemester()),
  getSemestersByAcademicYear: publicProcedure
    .input(z.object({ academicYearId: z.number() }))
    .query(({ input }) => getSemestersByAcademicYear(input.academicYearId)),

  // Subject routes
  createSubject: publicProcedure
    .input(createSubjectInputSchema)
    .mutation(({ input }) => createSubject(input)),
  getSubjects: publicProcedure
    .query(() => getSubjects()),
  getSubjectById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getSubjectById(input.id)),
  updateSubject: publicProcedure
    .input(z.object({ id: z.number() }).merge(createSubjectInputSchema.partial()))
    .mutation(({ input }) => updateSubject(input.id, input)),
  deleteSubject: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteSubject(input.id)),

  // Class routes
  createClass: publicProcedure
    .input(createClassInputSchema)
    .mutation(({ input }) => createClass(input)),
  getClasses: publicProcedure
    .query(() => getClasses()),
  getClassesByAcademicYear: publicProcedure
    .input(z.object({ academicYearId: z.number() }))
    .query(({ input }) => getClassesByAcademicYear(input.academicYearId)),
  getClassById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getClassById(input.id)),
  updateClass: publicProcedure
    .input(z.object({ id: z.number() }).merge(createClassInputSchema.partial()))
    .mutation(({ input }) => updateClass(input.id, input)),

  // User routes
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),
  getUserById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getUserById(input.id)),
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ input }) => getUserByUsername(input.username)),
  getUsersByRole: publicProcedure
    .input(z.object({ role: z.enum(['admin', 'teacher', 'student', 'staff']) }))
    .query(({ input }) => getUsersByRole(input.role)),
  updateUserStatus: publicProcedure
    .input(z.object({ id: z.number(), isActive: z.boolean() }))
    .mutation(({ input }) => updateUserStatus(input.id, input.isActive)),
  changePassword: publicProcedure
    .input(z.object({ id: z.number(), newPassword: z.string() }))
    .mutation(({ input }) => changePassword(input.id, input.newPassword)),

  // Student routes
  createStudent: publicProcedure
    .input(createStudentInputSchema)
    .mutation(({ input }) => createStudent(input)),
  getStudents: publicProcedure
    .query(() => getStudents()),
  getStudentById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getStudentById(input.id)),
  getStudentsByClass: publicProcedure
    .input(z.object({ classId: z.number() }))
    .query(({ input }) => getStudentsByClass(input.classId)),
  updateStudent: publicProcedure
    .input(z.object({ id: z.number() }).merge(createStudentInputSchema.partial()))
    .mutation(({ input }) => updateStudent(input.id, input)),
  assignStudentToClass: publicProcedure
    .input(z.object({ studentId: z.number(), classId: z.number() }))
    .mutation(({ input }) => assignStudentToClass(input.studentId, input.classId)),

  // Teacher routes
  createTeacher: publicProcedure
    .input(createTeacherInputSchema)
    .mutation(({ input }) => createTeacher(input)),
  getTeachers: publicProcedure
    .query(() => getTeachers()),
  getTeacherById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getTeacherById(input.id)),
  updateTeacher: publicProcedure
    .input(z.object({ id: z.number() }).merge(createTeacherInputSchema.partial()))
    .mutation(({ input }) => updateTeacher(input.id, input)),
  getTeacherSubjects: publicProcedure
    .input(z.object({ teacherId: z.number() }))
    .query(({ input }) => getTeacherSubjects(input.teacherId)),

  // Attendance routes
  createAttendance: publicProcedure
    .input(createAttendanceInputSchema)
    .mutation(({ input }) => createAttendance(input)),
  getAttendanceByStudent: publicProcedure
    .input(z.object({ studentId: z.number(), startDate: z.coerce.date().optional(), endDate: z.coerce.date().optional() }))
    .query(({ input }) => getAttendanceByStudent(input.studentId, input.startDate, input.endDate)),
  getAttendanceByDate: publicProcedure
    .input(z.object({ date: z.coerce.date() }))
    .query(({ input }) => getAttendanceByDate(input.date)),
  getAttendanceByClass: publicProcedure
    .input(z.object({ classId: z.number(), date: z.coerce.date() }))
    .query(({ input }) => getAttendanceByClass(input.classId, input.date)),
  updateAttendance: publicProcedure
    .input(z.object({ id: z.number() }).merge(createAttendanceInputSchema.partial()))
    .mutation(({ input }) => updateAttendance(input.id, input)),
  bulkCreateAttendance: publicProcedure
    .input(z.array(createAttendanceInputSchema))
    .mutation(({ input }) => bulkCreateAttendance(input)),

  // Grade routes
  createGrade: publicProcedure
    .input(createGradeInputSchema)
    .mutation(({ input }) => createGrade(input)),
  getGradesByStudent: publicProcedure
    .input(z.object({ studentId: z.number(), semesterId: z.number().optional() }))
    .query(({ input }) => getGradesByStudent(input.studentId, input.semesterId)),
  getGradesBySubject: publicProcedure
    .input(z.object({ subjectId: z.number(), semesterId: z.number() }))
    .query(({ input }) => getGradesBySubject(input.subjectId, input.semesterId)),
  getStudentReportCard: publicProcedure
    .input(z.object({ studentId: z.number(), semesterId: z.number() }))
    .query(({ input }) => getStudentReportCard(input.studentId, input.semesterId)),
  updateGrade: publicProcedure
    .input(z.object({ id: z.number() }).merge(createGradeInputSchema.partial()))
    .mutation(({ input }) => updateGrade(input.id, input)),
  getClassGradeSummary: publicProcedure
    .input(z.object({ classId: z.number(), subjectId: z.number(), semesterId: z.number() }))
    .query(({ input }) => getClassGradeSummary(input.classId, input.subjectId, input.semesterId)),

  // Payment routes
  createPayment: publicProcedure
    .input(createPaymentInputSchema)
    .mutation(({ input }) => createPayment(input)),
  getPaymentsByStudent: publicProcedure
    .input(z.object({ studentId: z.number() }))
    .query(({ input }) => getPaymentsByStudent(input.studentId)),
  getOverduePayments: publicProcedure
    .query(() => getOverduePayments()),
  markPaymentAsPaid: publicProcedure
    .input(z.object({ id: z.number(), paidDate: z.coerce.date() }))
    .mutation(({ input }) => markPaymentAsPaid(input.id, input.paidDate)),
  getPaymentSummary: publicProcedure
    .input(z.object({ startDate: z.coerce.date(), endDate: z.coerce.date() }))
    .query(({ input }) => getPaymentSummary(input.startDate, input.endDate)),
  updatePayment: publicProcedure
    .input(z.object({ id: z.number() }).merge(createPaymentInputSchema.partial()))
    .mutation(({ input }) => updatePayment(input.id, input)),

  // Discipline routes
  createDiscipline: publicProcedure
    .input(createDisciplineInputSchema)
    .mutation(({ input }) => createDiscipline(input)),
  getDisciplineByStudent: publicProcedure
    .input(z.object({ studentId: z.number() }))
    .query(({ input }) => getDisciplineByStudent(input.studentId)),
  getDisciplineByType: publicProcedure
    .input(z.object({ type: z.string(), startDate: z.coerce.date().optional(), endDate: z.coerce.date().optional() }))
    .query(({ input }) => getDisciplineByType(input.type, input.startDate, input.endDate)),
  updateDiscipline: publicProcedure
    .input(z.object({ id: z.number() }).merge(createDisciplineInputSchema.partial()))
    .mutation(({ input }) => updateDiscipline(input.id, input)),
  deleteDiscipline: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteDiscipline(input.id)),

  // Schedule routes
  createSchedule: publicProcedure
    .input(createScheduleInputSchema)
    .mutation(({ input }) => createSchedule(input)),
  getSchedulesByClass: publicProcedure
    .input(z.object({ classId: z.number(), semesterId: z.number() }))
    .query(({ input }) => getSchedulesByClass(input.classId, input.semesterId)),
  getSchedulesByTeacher: publicProcedure
    .input(z.object({ teacherId: z.number(), semesterId: z.number() }))
    .query(({ input }) => getSchedulesByTeacher(input.teacherId, input.semesterId)),
  updateSchedule: publicProcedure
    .input(z.object({ id: z.number() }).merge(createScheduleInputSchema.partial()))
    .mutation(({ input }) => updateSchedule(input.id, input)),
  deleteSchedule: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteSchedule(input.id)),
  getScheduleConflicts: publicProcedure
    .input(createScheduleInputSchema)
    .query(({ input }) => getScheduleConflicts(input)),

  // Exam routes
  createExam: publicProcedure
    .input(createExamInputSchema)
    .mutation(({ input }) => createExam(input)),
  getExams: publicProcedure
    .query(() => getExams()),
  getExamsByClass: publicProcedure
    .input(z.object({ classId: z.number(), semesterId: z.number() }))
    .query(({ input }) => getExamsByClass(input.classId, input.semesterId)),
  getExamsBySubject: publicProcedure
    .input(z.object({ subjectId: z.number(), semesterId: z.number() }))
    .query(({ input }) => getExamsBySubject(input.subjectId, input.semesterId)),
  getUpcomingExams: publicProcedure
    .input(z.object({ days: z.number().optional() }))
    .query(({ input }) => getUpcomingExams(input.days)),
  updateExam: publicProcedure
    .input(z.object({ id: z.number() }).merge(createExamInputSchema.partial()))
    .mutation(({ input }) => updateExam(input.id, input)),
  deleteExam: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteExam(input.id)),

  // Financial Transaction routes
  createFinancialTransaction: publicProcedure
    .input(createFinancialTransactionInputSchema)
    .mutation(({ input }) => createFinancialTransaction(input)),
  getFinancialTransactions: publicProcedure
    .input(z.object({ startDate: z.coerce.date().optional(), endDate: z.coerce.date().optional() }))
    .query(({ input }) => getFinancialTransactions(input.startDate, input.endDate)),
  getFinancialSummary: publicProcedure
    .input(z.object({ startDate: z.coerce.date(), endDate: z.coerce.date() }))
    .query(({ input }) => getFinancialSummary(input.startDate, input.endDate)),
  getTransactionsByType: publicProcedure
    .input(z.object({ type: z.enum(['income', 'expense']), startDate: z.coerce.date().optional(), endDate: z.coerce.date().optional() }))
    .query(({ input }) => getTransactionsByType(input.type, input.startDate, input.endDate)),
  updateFinancialTransaction: publicProcedure
    .input(z.object({ id: z.number() }).merge(createFinancialTransactionInputSchema.partial()))
    .mutation(({ input }) => updateFinancialTransaction(input.id, input)),
  deleteFinancialTransaction: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteFinancialTransaction(input.id)),

  // Book routes
  createBook: publicProcedure
    .input(createBookInputSchema)
    .mutation(({ input }) => createBook(input)),
  getBooks: publicProcedure
    .query(() => getBooks()),
  searchBooks: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => searchBooks(input.query)),
  getBooksByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ input }) => getBooksByCategory(input.category)),
  getAvailableBooks: publicProcedure
    .query(() => getAvailableBooks()),
  updateBook: publicProcedure
    .input(z.object({ id: z.number() }).merge(createBookInputSchema.partial()))
    .mutation(({ input }) => updateBook(input.id, input)),
  updateBookAvailability: publicProcedure
    .input(z.object({ id: z.number(), availableCopies: z.number() }))
    .mutation(({ input }) => updateBookAvailability(input.id, input.availableCopies)),
  deleteBook: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteBook(input.id)),

  // Asset routes
  createAsset: publicProcedure
    .input(createAssetInputSchema)
    .mutation(({ input }) => createAsset(input)),
  getAssets: publicProcedure
    .query(() => getAssets()),
  getAssetsByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ input }) => getAssetsByCategory(input.category)),
  getAssetsByStatus: publicProcedure
    .input(z.object({ status: z.string() }))
    .query(({ input }) => getAssetsByStatus(input.status)),
  getAssetsByLocation: publicProcedure
    .input(z.object({ location: z.string() }))
    .query(({ input }) => getAssetsByLocation(input.location)),
  updateAsset: publicProcedure
    .input(z.object({ id: z.number() }).merge(createAssetInputSchema.partial()))
    .mutation(({ input }) => updateAsset(input.id, input)),
  updateAssetStatus: publicProcedure
    .input(z.object({ id: z.number(), status: z.string() }))
    .mutation(({ input }) => updateAssetStatus(input.id, input.status)),
  deleteAsset: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteAsset(input.id)),

  // Announcement routes
  createAnnouncement: publicProcedure
    .input(createAnnouncementInputSchema)
    .mutation(({ input }) => createAnnouncement(input)),
  getAnnouncements: publicProcedure
    .query(() => getAnnouncements()),
  getPublishedAnnouncements: publicProcedure
    .query(() => getPublishedAnnouncements()),
  getAnnouncementsByAudience: publicProcedure
    .input(z.object({ targetAudience: z.string() }))
    .query(({ input }) => getAnnouncementsByAudience(input.targetAudience)),
  publishAnnouncement: publicProcedure
    .input(z.object({ id: z.number(), publishDate: z.coerce.date().optional() }))
    .mutation(({ input }) => publishAnnouncement(input.id, input.publishDate)),
  updateAnnouncement: publicProcedure
    .input(z.object({ id: z.number() }).merge(createAnnouncementInputSchema.partial()))
    .mutation(({ input }) => updateAnnouncement(input.id, input)),
  deleteAnnouncement: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteAnnouncement(input.id)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`School Management System TRPC server listening at port: ${port}`);
}

start();