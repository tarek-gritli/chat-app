import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Message } from "@/types/types";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";

const OneMessage = ({ message }: { message: Message }) => {
  const { authUser } = useAuth();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser!._id;
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser!.profilePicture
    : selectedConversation?.profilePicture;

  return (
    <div className={`flex items-start mb-4 ${fromMe ? "justify-end" : ""}`}>
      {!fromMe && (
        <Avatar className="mr-2">
          <AvatarImage src={profilePic} />
          <AvatarFallback>{selectedConversation?.fullName}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`rounded-lg p-3 max-w-[70%] ${
          fromMe ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        <p>{message.message}</p>
        <p className="text-xs mt-1 opacity-70">{formattedTime}</p>
      </div>
      {fromMe && (
        <Avatar className="ml-2">
          <AvatarImage src={profilePic} />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
export default OneMessage;
