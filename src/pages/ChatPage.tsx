import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ConversationSidebar } from '@/components/chat/ConversationSidebar';
import { ChatView } from '@/components/chat/ChatView';

// const MOCK_CONVERSATIONS: Conversation[] = [
//   { id: '1', title: 'Bre.Shibuya 渋谷ベストオフィス', timestamp: '2/26/25, 5:15 PM' },
//   { id: '2', title: 'ドルテック青山渋谷ベストオフィス', timestamp: '2/26/25, 5:15 PM' },
//   { id: '3', title: 'template1 (2)', timestamp: '2/26/25, 4:54 PM' },
//   { id: '4', title: 'template1 (1)', timestamp: '2/26/25, 4:52 PM' },
// ];

export function ChatPage() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  if (!user) {
    navigate('/login');
    return;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNewAnalysis = () => {
    setSelectedConversation(null);
  };

  const handleSelectPDF = () => {
    console.log('Select PDF clicked');
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex">
      <div className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white p-4">Chat</h1>

        <div className="px-4">
          <button
            onClick={handleNewAnalysis}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mb-3 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>+</span>
            <span>New Analysis</span>
          </button>
        </div>
        <div className="py-2 px-4 border-y border-gray-200">
          <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All</option>
          </select>
        </div>
        <ConversationSidebar activeId={selectedConversation} onSelect={(id) => setSelectedConversation(id)} />

        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 cursor-pointer text-sm font-medium"
        >
          Sign Out
        </button>
      </div>
      <div className="w-full h-full max-h-screen flex-1 flex items-center justify-center space-y-4">
        {
          selectedConversation ? (
            <ChatView conversationId={selectedConversation} />
          ) : (

            <div className="w-xl border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/50">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <h3 className="text-md font-semibold text-gray-900 dark:text-white">Drop your PDF here</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">or click to browse</p>

              <button
                onClick={handleSelectPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Select PDF
              </button>
            </div>
          )
        }
      </div>

      <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col p-1">
        <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pl-2 pr-4 pt-2 pb-3 flex items-center justify-between">
          <div className="w-full flex items-center justify-between gap-4">
            <h2 className="text-md font-semibold text-gray-900 dark:text-white px-3">物件確認</h2>
            <select className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">すべて</option>
              <option value="done">完了</option>
              <option value="pending">確認中</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center h-full text-gray-400 text-sm"> PDFをアップロードして物件情報を表示 </div>
      </div>
    </div>
  );
}
