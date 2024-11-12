import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSendMessage from "@/hooks/useSendMessage";
import { Loader, Send } from "lucide-react";
import { FormEvent, useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-2 mt-auto">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow"
      />
      <Button type="submit" disabled={loading}>
        {loading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};
export default MessageInput;
