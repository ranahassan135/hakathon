import React, { useState } from 'react';

const NGODashboardHome = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Donations', value: '$45,230', icon: '💰', color: 'from-green-500 to-green-600' },
    { label: 'Active Projects', value: '12', icon: '📋', color: 'from-blue-500 to-blue-600' },
    { label: 'Supporters', value: '1,245', icon: '👥', color: 'from-purple-500 to-purple-600' },
    { label: 'Impact Stories', value: '89', icon: '❤️', color: 'from-pink-500 to-pink-600' },
  ];

  const recentDonations = [
    { donor: 'John Doe', amount: '$150', date: '2025-09-20', status: 'completed' },
    { donor: 'Sarah Wilson', amount: '$75', date: '2025-09-19', status: 'pending' },
    { donor: 'Mike Johnson', amount: '$300', date: '2025-09-18', status: 'completed' },
    { donor: 'Emily Brown', amount: '$50', date: '2025-09-17', status: 'completed' },
  ];

  const quickActions = [
    { label: 'Create New Project', icon: '➕', color: 'bg-green-500', to: '/projects/create' },
    { label: 'View Donations', icon: '📊', color: 'bg-blue-500', to: '/donations' },
    { label: 'Manage Supporters', icon: '👥', color: 'bg-purple-500', to: '/supporters' },
    { label: 'Post Update', icon: '✍️', color: 'bg-orange-500', to: '/updates/create' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="text-blue-600">Green Earth NGO</span>!
          </h1>
          <p className="text-gray-600">Here's what's happening with your organization today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
            📊 View Full Analytics
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.to}
              className="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 text-white text-xl`}>
                <span>{action.icon}</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">{action.label}</h3>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Donations */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Donations</h2>
            <div className="space-y-3">
              {recentDonations.map((donation, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{donation.donor}</p>
                      <p className="text-sm text-gray-600">{donation.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${donation.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                      {donation.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      donation.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <a href="/donations" className="text-blue-600 hover:text-blue-700 font-medium">View All Donations →</a>
            </div>
          </div>
        </div>

        {/* Upcoming Activities */}
        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Activities</h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-gray-800">Tree Planting Drive</p>
                <p className="text-sm text-gray-600">Sep 25, 2025</p>
                <p className="text-xs text-blue-600 mt-1">15 volunteers needed</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="font-medium text-gray-800">Fundraising Event</p>
                <p className="text-sm text-gray-600">Sep 28, 2025</p>
                <p className="text-xs text-green-600 mt-1">Goal: $5,000</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="font-medium text-gray-800">Community Workshop</p>
                <p className="text-sm text-gray-600">Oct 2, 2025</p>
                <p className="text-xs text-purple-600 mt-1">50 spots available</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a href="/activities" className="text-blue-600 hover:text-blue-700 font-medium">Manage Activities →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboardHome;