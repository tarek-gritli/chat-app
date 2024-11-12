import { ScrollArea } from "@/components/ui/scroll-area";
import useGetMessages from "@/hooks/useGetMessages";
import useListenMessages from "@/hooks/useListenMessages";
import { useEffect, useRef } from "react";
import MessageSkeleton from "./MessageSkeleton";
import OneMessage from "./OneMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <ScrollArea className="p-4">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <OneMessage message={message} />
          </div>
        ))}

      {loading &&
        [...Array(3)].map((_, idx) => (
          <div key={idx}>
            <MessageSkeleton />
          </div>
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </ScrollArea>
  );
};
export default Messages;
