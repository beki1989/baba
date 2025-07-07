import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Award, 
  CreditCard,
  User,
  Settings,
  MessageCircle,
  Phone,
  GraduationCap,
  Clock,
  TrendingUp,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'security', label: 'Security', icon: Settings },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const sidebar = (
    <>
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`nav-link w-full ${activeTab === item.id ? 'active' : ''}`}
        >
          <item.icon size={20} className="mr-3" />
          {item.label}
        </button>
      ))}
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent user={user} />;
      case 'courses':
        return <CoursesContent />;
      case 'transactions':
        return <TransactionsContent />;
      case 'reports':
        return <ReportsContent />;
      case 'security':
        return <SecurityContent />;
      case 'feedback':
        return <FeedbackContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return <DashboardContent user={user} />;
    }
  };

  return (
    <Layout title={`${user?.firstName}'s Dashboard`} sidebar={sidebar}>
      {renderContent()}
    </Layout>
  );
}

function DashboardContent({ user }: { user: any }) {
  const upcomingAssignments = [
    { id: 1, title: 'Mathematics Assignment', course: 'Advanced Mathematics', dueDate: '2024-01-15', status: 'pending' },
    { id: 2, title: 'Physics Lab Report', course: 'Physics I', dueDate: '2024-01-18', status: 'submitted' },
    { id: 3, title: 'Chemistry Quiz', course: 'Organic Chemistry', dueDate: '2024-01-20', status: 'pending' },
  ];

  const recentGrades = [
    { course: 'Advanced Mathematics', assignment: 'Midterm Exam', grade: 'A-', points: '88/100' },
    { course: 'Physics I', assignment: 'Lab Report 1', grade: 'B+', points: '85/100' },
    { course: 'Organic Chemistry', assignment: 'Quiz 1', grade: 'A', points: '92/100' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-primary-100 text-sm">University</p>
            <p className="text-white font-semibold">{user?.universityName}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-primary-100 text-sm">Class Level</p>
            <p className="text-white font-semibold">{user?.classLevel} Year</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-primary-100 text-sm">Semester</p>
            <p className="text-white font-semibold">Semester {user?.semester}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <BookOpen className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <Award className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">GPA</p>
              <p className="text-2xl font-bold text-gray-900">3.7</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Clock className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h3>
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                  <p className="text-xs text-gray-500">{assignment.course}</p>
                  <p className="text-xs text-gray-400">Due: {assignment.dueDate}</p>
                </div>
                <div className="flex items-center">
                  {assignment.status === 'submitted' ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Clock className="text-orange-500" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grades */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Grades</h3>
          <div className="space-y-3">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{grade.assignment}</p>
                  <p className="text-xs text-gray-500">{grade.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{grade.grade}</p>
                  <p className="text-xs text-gray-500">{grade.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <BookOpen className="text-primary-600 mb-2" size={24} />
            <span className="text-xs font-medium text-gray-700">View Courses</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Calendar className="text-green-600 mb-2" size={24} />
            <span className="text-xs font-medium text-gray-700">Schedule</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FileText className="text-blue-600 mb-2" size={24} />
            <span className="text-xs font-medium text-gray-700">Assignments</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Award className="text-purple-600 mb-2" size={24} />
            <span className="text-xs font-medium text-gray-700">Grades</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <CreditCard className="text-orange-600 mb-2" size={24} />
            <span className="text-xs font-medium text-gray-700">Payments</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <User className="text-gray-600 mb-2" size={24} />
            <span className="text-xs font-medium text-gray-700">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CoursesContent() {
  const enrolledCourses = [
    { id: 1, name: 'Advanced Mathematics', code: 'MATH301', instructor: 'Dr. Smith', credits: 3, progress: 75 },
    { id: 2, name: 'Physics I', code: 'PHYS101', instructor: 'Prof. Johnson', credits: 4, progress: 60 },
    { id: 3, name: 'Organic Chemistry', code: 'CHEM201', instructor: 'Dr. Brown', credits: 3, progress: 85 },
    { id: 4, name: 'Computer Science Fundamentals', code: 'CS101', instructor: 'Prof. Davis', credits: 4, progress: 90 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <button className="btn-primary">Enroll in New Course</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.code}</p>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              </div>
              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-medium">
                {course.credits} Credits
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="btn-primary flex-1 text-sm py-2">View Course</button>
              <button className="btn-secondary text-sm py-2 px-4">Materials</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionsContent() {
  const transactions = [
    { id: 1, type: 'enrollment', description: 'Course Enrollment - Advanced Mathematics', amount: 500, status: 'completed', date: '2024-01-10', icon: BookOpen },
    { id: 2, type: 'assessment', description: 'Re-assessment Fee - Physics I', amount: 150, status: 'pending', date: '2024-01-12', icon: FileText },
    { id: 3, type: 'supplementary', description: 'Supplementary Exam - Chemistry', amount: 200, status: 'completed', date: '2024-01-08', icon: Award },
    { id: 4, type: 'makeup', description: 'Makeup Exam - Computer Science', amount: 100, status: 'failed', date: '2024-01-05', icon: Clock },
  ];

  const transactionTypes = [
    { id: 'enrollment', label: 'Enroll on Courses', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'add-course', label: 'Add Courses', icon: BookOpen, color: 'bg-green-500' },
    { id: 'drop-course', label: 'Drop Courses', icon: XCircle, color: 'bg-red-500' },
    { id: 'evaluation', label: 'Semester Evaluation', icon: FileText, color: 'bg-purple-500' },
    { id: 'reassessment', label: 'Request Re-assessment', icon: FileText, color: 'bg-orange-500' },
    { id: 'supplementary', label: 'Request Supplementary Exam', icon: Award, color: 'bg-yellow-500' },
    { id: 'makeup', label: 'Request Makeup Exam', icon: Clock, color: 'bg-pink-500' },
    { id: 'thesis', label: 'Submit Thesis Title', icon: Upload, color: 'bg-indigo-500' },
    { id: 'readmission', label: 'Request Re-admission', icon: User, color: 'bg-teal-500' },
    { id: 'withdrawal', label: 'Request Withdrawal', icon: AlertCircle, color: 'bg-gray-500' },
    { id: 'department', label: 'Select Department', icon: GraduationCap, color: 'bg-cyan-500' },
    { id: 'exit-exam', label: 'Exit Exam', icon: Award, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      </div>

      {/* Transaction Types Grid */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Transactions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {transactionTypes.map((type) => (
            <button
              key={type.id}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className={`${type.color} p-3 rounded-lg mb-2 group-hover:scale-110 transition-transform`}>
                <type.icon className="text-white" size={20} />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <transaction.icon className="text-gray-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{transaction.amount} ETB</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                  transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">CBE Bank</h4>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Available</div>
            </div>
            <p className="text-sm text-gray-600">Commercial Bank of Ethiopia</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Dashen Bank</h4>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Available</div>
            </div>
            <p className="text-sm text-gray-600">Dashen Bank payment gateway</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Abay Bank</h4>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Available</div>
            </div>
            <p className="text-sm text-gray-600">Abay Bank mobile payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsContent() {
  const reportTypes = [
    { id: 'enrolled-courses', label: 'Enrolled Courses', icon: BookOpen, description: 'View all your enrolled courses' },
    { id: 'assessment', label: 'Course Assessment', icon: FileText, description: 'Assessment results and feedback' },
    { id: 'progress', label: 'Mark Progress', icon: TrendingUp, description: 'Academic progress tracking' },
    { id: 'timetable', label: 'Time Table', icon: Calendar, description: 'Class schedule and timetable' },
    { id: 'grade-report', label: 'Grade Report', icon: Award, description: 'Comprehensive grade report' },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen, description: 'Detailed course information' },
    { id: 'drop-history', label: 'Course Drop History', icon: XCircle, description: 'History of dropped courses' },
    { id: 'withdrawal-status', label: 'Withdrawal Status', icon: AlertCircle, description: 'Withdrawal request status' },
    { id: 'course-add', label: 'Course Add', icon: BookOpen, description: 'Added courses report' },
    { id: 'makeup-exam', label: 'Makeup Exam', icon: Clock, description: 'Makeup exam schedules' },
    { id: 'withdrawal-report', label: 'Withdrawal Report', icon: FileText, description: 'Detailed withdrawal report' },
    { id: 'outstanding', label: 'Outstanding Students', icon: Award, description: 'Outstanding performance report' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="card hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                <report.icon className="text-primary-600" size={24} />
              </div>
              <Download className="text-gray-400 group-hover:text-primary-600 transition-colors" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.label}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <button className="btn-primary w-full text-sm">Generate Report</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Username
              </label>
              <div className="flex">
                <input
                  type="text"
                  value="john.doe@student.edu"
                  className="input-field flex-1"
                  readOnly
                />
                <button className="ml-2 btn-secondary">Change</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex">
                <input
                  type="password"
                  value="••••••••"
                  className="input-field flex-1"
                  readOnly
                />
                <button className="ml-2 btn-secondary">Change</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="bg-gray-200 relative inline-flex h-6 w-11 items-center rounded-full">
                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                <p className="text-xs text-gray-500">Get notified of account activity</p>
              </div>
              <button className="bg-primary-600 relative inline-flex h-6 w-11 items-center rounded-full">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Login Alerts</p>
                <p className="text-xs text-gray-500">Alert on new device login</p>
              </div>
              <button className="bg-primary-600 relative inline-flex h-6 w-11 items-center rounded-full">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Successful login</p>
                <p className="text-xs text-gray-500">Chrome on Windows - IP: 192.168.1.100</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">2 min ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Password changed</p>
                <p className="text-xs text-gray-500">Security settings updated</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Feedback</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback Type
            </label>
            <select className="input-field">
              <option>General Feedback</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Course Related</option>
              <option>Technical Issue</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Brief description of your feedback"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows={6}
              className="input-field"
              placeholder="Please provide detailed feedback..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Send Feedback
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Feedback</h3>
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">Course Material Access Issue</h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Resolved</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Unable to access course materials for Advanced Mathematics...</p>
            <p className="text-xs text-gray-500">Submitted: Jan 10, 2024 • Response: Jan 11, 2024</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">Feature Request: Mobile App</h4>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">In Progress</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Would be great to have a mobile app for easier access...</p>
            <p className="text-xs text-gray-500">Submitted: Jan 8, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="text-primary-600 mr-3" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900">Phone Support</p>
                <p className="text-sm text-gray-600">+251-11-123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <MessageCircle className="text-primary-600 mr-3" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">support@bics.edu.et</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="text-primary-600 mr-3" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900">Support Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select className="input-field">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="input-field"
                placeholder="Describe your issue or question..."
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">How do I reset my password?</h4>
            <p className="text-sm text-gray-600">You can reset your password by clicking on "Forgot Password" on the login page or by going to Security settings in your dashboard.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">How do I enroll in a new course?</h4>
            <p className="text-sm text-gray-600">Navigate to the Transactions section and click on "Enroll on Courses" to browse and enroll in available courses.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Where can I view my grades?</h4>
            <p className="text-sm text-gray-600">Your grades are available in the Reports section under "Grade Report" or you can see recent grades on your dashboard.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">How do I make payments?</h4>
            <p className="text-sm text-gray-600">Payments can be made through the Transactions section using CBE Bank, Dashen Bank, or Abay Bank payment gateways.</p>
          </div>
        </div>
      </div>
    </div>
  );
}