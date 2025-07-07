import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Calendar,
  Award,
  Settings,
  MessageCircle,
  Phone,
  Plus,
  Edit,
  Eye,
  Download
} from 'lucide-react';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'grades', label: 'Grades', icon: Award },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
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
        return <TeacherDashboardContent user={user} />;
      case 'courses':
        return <TeacherCoursesContent />;
      case 'students':
        return <StudentsContent />;
      case 'assignments':
        return <AssignmentsContent />;
      case 'grades':
        return <GradesContent />;
      case 'schedule':
        return <ScheduleContent />;
      case 'settings':
        return <TeacherSettingsContent />;
      case 'feedback':
        return <TeacherFeedbackContent />;
      case 'contact':
        return <TeacherContactContent />;
      default:
        return <TeacherDashboardContent user={user} />;
    }
  };

  return (
    <Layout title={`${user?.firstName}'s Teaching Portal`} sidebar={sidebar}>
      {renderContent()}
    </Layout>
  );
}

function TeacherDashboardContent({ user }: { user: any }) {
  const stats = [
    { label: 'My Courses', value: '4', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Total Students', value: '156', icon: Users, color: 'bg-green-500' },
    { label: 'Pending Grades', value: '23', icon: Award, color: 'bg-orange-500' },
    { label: 'Assignments', value: '12', icon: FileText, color: 'bg-purple-500' },
  ];

  const recentActivity = [
    { type: 'assignment', title: 'New assignment submitted', description: 'Mathematics Quiz - 15 submissions', time: '2 hours ago' },
    { type: 'grade', title: 'Grades published', description: 'Physics Lab Report - 25 students', time: '1 day ago' },
    { type: 'course', title: 'Course material updated', description: 'Advanced Mathematics - Chapter 5', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, Prof. {user?.firstName}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-primary-100 text-sm">University</p>
            <p className="text-white font-semibold">{user?.universityName}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-primary-100 text-sm">Department</p>
            <p className="text-white font-semibold">{user?.department || 'Computer Science'}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start py-3 border-b border-gray-100 last:border-b-0">
                <div className="bg-primary-100 p-2 rounded-lg mr-3">
                  <FileText className="text-primary-600" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Plus className="text-primary-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">Create Assignment</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Award className="text-green-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">Grade Submissions</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <BookOpen className="text-blue-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">Course Materials</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Users className="text-purple-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">View Students</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Advanced Mathematics</p>
              <p className="text-xs text-gray-500">Room 201 • 2nd Year Students</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">10:00 AM</p>
              <p className="text-xs text-gray-500">90 minutes</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Physics Laboratory</p>
              <p className="text-xs text-gray-500">Lab 3 • 1st Year Students</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">2:00 PM</p>
              <p className="text-xs text-gray-500">120 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherCoursesContent() {
  const courses = [
    { id: 1, name: 'Advanced Mathematics', code: 'MATH301', students: 45, assignments: 8, status: 'active' },
    { id: 2, name: 'Physics I', code: 'PHYS101', students: 38, assignments: 6, status: 'active' },
    { id: 3, name: 'Calculus II', code: 'MATH201', students: 52, assignments: 10, status: 'active' },
    { id: 4, name: 'Linear Algebra', code: 'MATH205', students: 28, assignments: 5, status: 'draft' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <button className="btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.code}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                course.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {course.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Students</p>
                <p className="text-xl font-bold text-gray-900">{course.students}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assignments</p>
                <p className="text-xl font-bold text-gray-900">{course.assignments}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="btn-primary flex-1 text-sm py-2 flex items-center justify-center">
                <Eye size={16} className="mr-1" />
                View
              </button>
              <button className="btn-secondary text-sm py-2 px-4 flex items-center">
                <Edit size={16} className="mr-1" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentsContent() {
  const students = [
    { id: 1, name: 'John Doe', email: 'john.doe@student.edu', course: 'Advanced Mathematics', grade: 'A-', attendance: '95%' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@student.edu', course: 'Physics I', grade: 'B+', attendance: '88%' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@student.edu', course: 'Calculus II', grade: 'A', attendance: '92%' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@student.edu', course: 'Advanced Mathematics', grade: 'B', attendance: '85%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">Export List</button>
          <button className="btn-primary">Add Student</button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.attendance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AssignmentsContent() {
  const assignments = [
    { id: 1, title: 'Mathematics Quiz 1', course: 'Advanced Mathematics', dueDate: '2024-01-20', submissions: 35, total: 45, status: 'active' },
    { id: 2, title: 'Physics Lab Report', course: 'Physics I', dueDate: '2024-01-18', submissions: 28, total: 38, status: 'grading' },
    { id: 3, title: 'Calculus Problem Set', course: 'Calculus II', dueDate: '2024-01-25', submissions: 0, total: 52, status: 'draft' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <button className="btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                <p className="text-sm text-gray-600">{assignment.course}</p>
                <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                assignment.status === 'active' ? 'bg-green-100 text-green-800' :
                assignment.status === 'grading' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {assignment.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Submissions</p>
                <p className="text-xl font-bold text-gray-900">{assignment.submissions}/{assignment.total}</p>
              </div>
              <div className="w-32">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="btn-primary text-sm py-2 px-4 flex items-center">
                <Eye size={16} className="mr-1" />
                View
              </button>
              <button className="btn-secondary text-sm py-2 px-4 flex items-center">
                <Edit size={16} className="mr-1" />
                Edit
              </button>
              <button className="btn-secondary text-sm py-2 px-4 flex items-center">
                <Download size={16} className="mr-1" />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GradesContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Grades Management</h1>
        <button className="btn-primary">Publish Grades</button>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Grades</h3>
        <p className="text-gray-600">You have 23 assignments waiting to be graded.</p>
        <div className="mt-4">
          <button className="btn-primary">Start Grading</button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="bg-green-500 h-20 rounded-t flex items-end justify-center pb-2">
              <span className="text-white font-bold">15</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">A</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500 h-16 rounded-t flex items-end justify-center pb-2">
              <span className="text-white font-bold">12</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">B</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500 h-12 rounded-t flex items-end justify-center pb-2">
              <span className="text-white font-bold">8</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">C</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-500 h-8 rounded-t flex items-end justify-center pb-2">
              <span className="text-white font-bold">5</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">D</p>
          </div>
          <div className="text-center">
            <div className="bg-red-500 h-4 rounded-t flex items-end justify-center pb-2">
              <span className="text-white font-bold text-xs">2</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">F</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleContent() {
  const schedule = [
    { day: 'Monday', time: '10:00 AM', course: 'Advanced Mathematics', room: 'Room 201', duration: '90 min' },
    { day: 'Monday', time: '2:00 PM', course: 'Physics I', room: 'Lab 3', duration: '120 min' },
    { day: 'Wednesday', time: '10:00 AM', course: 'Advanced Mathematics', room: 'Room 201', duration: '90 min' },
    { day: 'Wednesday', time: '2:00 PM', course: 'Calculus II', room: 'Room 105', duration: '90 min' },
    { day: 'Friday', time: '10:00 AM', course: 'Linear Algebra', room: 'Room 301', duration: '90 min' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Teaching Schedule</h1>
        <button className="btn-primary">Add Class</button>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-lg mr-4">
                  <Calendar className="text-primary-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.course}</p>
                  <p className="text-xs text-gray-600">{item.day} • {item.time} • {item.room}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{item.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeacherSettingsContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" className="input-field" defaultValue="John" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" className="input-field" defaultValue="Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="input-field" defaultValue="john.smith@university.edu" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input type="text" className="input-field" defaultValue="Mathematics" />
          </div>
        </div>
        <div className="mt-4">
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function TeacherFeedbackContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Feedback</h3>
        <p className="text-gray-600">View and respond to student feedback about your courses.</p>
      </div>
    </div>
  );
}

function TeacherContactContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Help</h3>
        <p className="text-gray-600">Contact technical support for assistance with the platform.</p>
      </div>
    </div>
  );
}