
import { useNavigate } from 'react-router-dom';

const Subscriptions = () => {
  const navigate = useNavigate();

  const availableJournals = [
    {
      id: 1,
      title: "Nature & Science",
      category: "Science",
      price: "299",
      frequency: "/mo",
      description: "Leading multidisciplinary science journal."
    },
    {
      id: 2,
      title: "Tech Weekly",
      category: "Technology",
      price: "199",
      frequency: "/mo",
      description: "Deep dives into the latest tech trends."
    },
    {
      id: 3,
      title: "Modern Architect",
      category: "Design",
      price: "249",
      frequency: "/mo",
      description: "Inspiration for sustainable design."
    },
    {
      id: 4,
      title: "Global Finance",
      category: "Business",
      price: "449",
      frequency: "/mo",
      description: "Market analysis and financial news."
    }
  ];

  const handleSubscribe = (journalTitle) => {
    if(window.confirm(`Subscribe to {journalTitle}?`)) {
      navigate('/payment-gateway');
    }
  };


  const getIcon = (category) => {
    if (category === 'Science') return (
      <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    );
    if (category === 'Technology') return (
      <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
    );
    if (category === 'Business') return (
       <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    );

    return (
      <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
    );
  };

  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-6 transition-colors">
    <div className="max-w-6xl mx-auto">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Available Plans
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Select a journal to start reading
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {availableJournals.map((journal) => (
          <div
            key={journal.id}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800 flex flex-col hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200"
          >

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8">
                    {getIcon(journal.category)}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                    {journal.title}
                  </h3>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full inline-block mt-1">
                    {journal.category}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow">
              {journal.description}
            </p>

            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
              <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {journal.price}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500 ml-1">
                  {journal.frequency}
                </span>
              </div>
              
              <button 
                onClick={() => handleSubscribe(journal.title)}
                className="px-5 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Subscriptions;
