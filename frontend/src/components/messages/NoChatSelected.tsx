import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare } from "lucide-react";

export default function NoChatSelected() {
  const { authUser } = useAuth();

  return (
    <Card className="flex-1 flex items-center justify-center">
      <CardContent className="text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">
          Welcome, {authUser?.fullName || "User"} 👋
        </h2>
        <p className="text-muted-foreground">
          Select a chat to start messaging
        </p>
      </CardContent>
    </Card>
  );
}
