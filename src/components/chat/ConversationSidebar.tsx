import { fetchMockSessions } from "@/mockdata";
import { useQuery } from "@tanstack/react-query";

export const ConversationSidebar = ({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) => {
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    // TODO: Replace with real API call and handle pagination
    queryFn: async () => {
      // const res = await fetch(`/api/conversations?cursor=${pageParam ?? ""}`);
      // const data = res.json();
      const data = await fetchMockSessions();
      return data;
    },
  });

  if (isLoading) {
    return <div className="p-4 text-sm text-gray-500">Loading conversations...</div>;
  }

  if (!conversations || conversations.length === 0) {
    return <div className="p-4 text-sm text-gray-500">No conversations found.</div>;
  }

  const rowCount = conversations.length;

  const Row = (row: any) => {
    const conv = conversations[row.index];

    return (
      <div className={`w-full p-4 cursor-pointer hover:bg-gray-50 transition-colors border-blue-600 ${conv.id === activeId ? "bg-blue-50 dark:bg-blue-900/20 border-l-4" : "bg-white dark:bg-gray-800"}`}
        onClick={() => onSelect(conv.id)}
      >
        <div className="font-medium text-gray-900 dark:text-white text-sm">{conv.title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {conv.timestamp}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full space-y-2 overflow-y-auto">
      {
        conversations.map((conv, index) => (
          <Row key={conv.id} index={index} />
        ))
      }
    </div>
  );
}
