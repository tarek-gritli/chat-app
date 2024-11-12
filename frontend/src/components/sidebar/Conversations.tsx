import { ScrollArea } from "@/components/ui/scroll-area";
import useGetConversations from "@/hooks/useGetConversations";
import OneConversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col">
      <ScrollArea className="flex-1 mt-4">
        {conversations.map((conversation, idx) => (
          <OneConversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ))}
      </ScrollArea>

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
