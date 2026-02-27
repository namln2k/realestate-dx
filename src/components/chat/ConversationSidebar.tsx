import { List } from "react-window";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMockSessions } from "@/mockdata";

export const ConversationSidebar = ({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["conversations"],
    // TODO: Replace with real API call and handle pagination
    queryFn: async ({ pageParam = null }) => {
      // const res = await fetch(`/api/conversations?cursor=${pageParam ?? ""}`);
      // const data = res.json();
      const data = await fetchMockSessions();
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const conversations =
    data?.pages.flatMap((page) => page.items) ?? [];

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
    <div className="space-y-2">
      <List
        rowProps={{ activeId }}
        rowCount={conversations.length}
        rowHeight={72}
        rowComponent={Row}
        onRowsRendered={({ stopIndex }) => {
          if (hasNextPage && stopIndex >= conversations.length - 5) {
            fetchNextPage();
          }
        }}
      />
    </div>
  );
}
