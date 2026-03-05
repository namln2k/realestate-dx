import { MessageInput } from "@/components/chat/MessageInput";
import { fetchMockSessionById } from "@/mockdata";
import { getMessage } from "@/services/translationService";
import type { Message } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

export const ChatView = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { data: messages, error } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => fetchMockSessionById(conversationId),
    enabled: !!conversationId,
  });

  if (error) {
    return (
      <div>{getMessage('MSG-NO-MATCHING-RESULT')}</div>
    )
  }

  if (!messages || messages.length == 0) {
    return null
  }

  const renderMessage = (message: Message) => {
    switch (message.role) {
      case "user":
        return (
          <div className="w-full flex justify-end">
            <div className="bg-primary text-white rounded-lg rounded-tr-none p-4">
              <div className="text-sm whitespace-pre-line">
                {message.content}
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
                  <Markdown>{message.content}</Markdown>
                </div>
              </article>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-gray-200 dark:bg-gray-600 rounded-lg max-w-md self-center">
            <div className="text-sm text-gray-900 dark:text-white">
              {message.content}
            </div>
          </div>
        );
    }
  }

  return (
    <div className="w-full flex flex-col">
      {messages.map(renderMessage)}

      <MessageInput conversationId={conversationId} />
    </div>
  );
};
