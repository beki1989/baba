import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function UniversityDashboard() {
  const { universityId } = useParams();
  const { user } = useAuth();

  return (
    <Layout title={`${user?.universityName} Portal`}>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to {user?.universityName}</h1>
          <p className="text-primary-100">
            {user?.role === 'admin' ? 'Manage your university portal' : 'Access your courses and resources'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-primary-600">1,250</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Courses</h3>
            <p className="text-3xl font-bold text-green-600">45</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Teachers</h3>
            <p className="text-3xl font-bold text-blue-600">85</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Departments</h3>
            <p className="text-3xl font-bold text-purple-600">12</p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">New course created</p>
                <p className="text-xs text-gray-500">Advanced Mathematics - Dr. Smith</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">Student enrolled</p>
                <p className="text-xs text-gray-500">John Doe - Computer Science</p>
              </div>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Assignment submitted</p>
                <p className="text-xs text-gray-500">Physics Lab Report - 25 submissions</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}