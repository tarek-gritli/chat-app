import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocket } from "@/hooks/useSocket";
import { User } from "@/types/types";
import useConversation from "@/zustand/useConversation";

type Props = {
  conversation: User;
  lastIdx: boolean;
};

const OneConversation = ({ conversation, lastIdx }: Props) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocket();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        key={conversation._id}
        className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-accent ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="relative">
          <Avatar>
            <AvatarImage
              src={conversation.profilePicture}
              alt={conversation.fullName}
            />
            <AvatarFallback>
              {conversation.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {isOnline && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">
            {conversation.fullName}
          </p>
          <p className="text-sm text-muted-foreground">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      {!lastIdx && <div className="border-t my-2" />}
    </>
  );
};

export default OneConversation;
