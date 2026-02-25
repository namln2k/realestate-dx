import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function MePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto px-6 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div 
                className="w-32 h-32 bg-accent rounded-full flex items-center justify-center shadow-inner ring-4 ring-white dark:ring-gray-700 transition-all duration-300 dark:bg-accent-dark overflow-hidden group cursor-pointer"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl font-bold text-chat-buttonText uppercase">{user.name.charAt(0)}</span>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white font-rubik mb-6">Account Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">User Email</p>
              <p className="pt-4 text-gray-700 dark:text-gray-200 font-mono text-sm truncate">{user.email}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Display name</p>
              <div className="flex-1 text-center md:text-left">
              <div className="group pt-4">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <h1 className="text-gray-700 dark:text-gray-200 font-mono text-sm truncate">
                      {user.name}
                    </h1>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex-1 py-4 bg-accent text-chat-buttonText rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Go to home page
          </button>
          <button 
            onClick={handleLogout}
            className="flex-1 py-4 bg-linear-to-r from-red-500 to-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none transition-all duration-300 hover:shadow-red-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout session
          </button>
        </div>
      </div>
    </div>
  );
}
