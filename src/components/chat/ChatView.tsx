import { MessageInput } from "@/components/chat/MessageInput";
import { fetchMockSessionById } from "@/mockdata";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import Markdown from "react-markdown";
import { List } from "react-window";

export const ChatView = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["messages", conversationId],
    queryFn: async ({ pageParam = null }) => {
      // const res = await fetch(
      //   `/api/messages?conversationId=${conversationId}&cursor=${pageParam ?? ""}`
      // );
      // return res.json();

      const data = await fetchMockSessionById(conversationId);
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.prevCursor ?? undefined,
  });

  const messages =
    data?.pages.flatMap((page) => page.items.map(item => ({
      ...item,
      id: `${conversationId}-${item.timestamp}` // Generate a unique ID for react-window
    }))) ?? [];

  const Row = useCallback(
    ({ index }: any) => {
      const msg = messages[index];
      if (!msg) return null;

      switch (msg.role) {
        case "user":
          return (
            <div className="w-full flex justify-end">
              <div className="bg-primary text-white rounded-lg rounded-tr-none p-4">
                <div className="text-sm whitespace-pre-line">
                  {msg.content}
                </div>
              </div>
            </div>
          );
        case "assistant":
          return (
            <div className="w-full flex justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600"> AI </div>
              <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm border border-gray-100">
                <article className="prose prose-slate lg:prose-xl">
                  <div className="text-sm text-gray-700 markdown-content">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </article>
              </div>
            </div>
          );
        default:
          return (
            <div className="p-4 bg-gray-200 dark:bg-gray-600 rounded-lg max-w-md self-center">
              <div className="text-sm text-gray-900 dark:text-white">
                {msg.content}
              </div>
            </div>
          );
      }
    },
    [messages]
  );

  return (
    <div className="flex flex-col">
      <List
        className="space-y-4 p-6 max-h-[calc(100vh-72px)]!"
        rowProps={{ className: "message" }}
        rowCount={messages.length}
        rowHeight={80}
        rowComponent={Row}
        onRowsRendered={({ stopIndex }) => {
          if (hasNextPage && stopIndex >= messages.length - 5) {
            fetchNextPage();
          }
        }}
      />

      <MessageInput conversationId={conversationId} />
    </div>
  );
};
