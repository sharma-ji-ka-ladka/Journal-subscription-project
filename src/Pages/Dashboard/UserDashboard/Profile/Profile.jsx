import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Profile = () => {
  const { user } = useUser();

  const mockSubscriptions = [
    {
      Id: 1,
      Title: "Nature & Science",
      Category: "Science",
      Price: "299",
      Frequency: "/mo",
      Description: "The world's leading multidisciplinary science journal."
    },
    {
      Id: 2,
      Title: "Tech Weekly",
      Category: "Technology",
      Price: "199",
      Frequency: "/mo",
      Description: "Deep dives into the latest tech trends."
    },
    {
      Id: 3,
      Title: "Modern Architect",
      Category: "Design",
      Price: "249",
      Frequency: "/mo",
      Description: "Inspiration for sustainable design."
    }
  ];

  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const handleUnsubscribe = (journalId) => {
    if (!window.confirm("Are you sure you want to unsubscribe?")) return;
    setSubscriptions(subscriptions.filter(sub => sub.Id !== journalId));
  };

  const totalCost = subscriptions.reduce((total, journal) => {
    return total + parseFloat(journal.Price);
  }, 0).toFixed(2);

  const getIcon = (category) => {
    if (category === 'Science') return (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    );
    if (category === 'Technology') return (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
    );
    return (
      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
              
              {user?.firstName ? user.firstName[0] : "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.fullName || "Guest User"}</h2>
              <p className="text-gray-500 text-sm">Premium Member</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user?.fullName || "Guest User"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Premium Member
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Your Subscriptions</h3>
          
          {subscriptions.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-400">No active subscriptions.</p>
            </div>
          ) : (
            subscriptions.map((journal) => (
              <div key={journal.Id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                
            
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {getIcon(journal.Category)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{journal.Title}</h4>
                    <p className="text-sm text-gray-500">{journal.Category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <span className="block font-bold text-gray-900 text-lg">{journal.Price}</span>
                    <span className="text-xs text-gray-400">{journal.Frequency}</span>
                  </div>
                  <button 
                    onClick={() => handleUnsubscribe(journal.Id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    title="Unsubscribe"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    );
};
export default Profile;
