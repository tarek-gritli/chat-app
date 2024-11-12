import MessageContainer from "@/components/messages/MessageContainer";
import Sidebar from "@/components/sidebar/Sidebar";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="flex w-full max-w-4xl h-[550px] overflow-hidden bg-background/80 backdrop-blur-lg">
      <Sidebar />
      <MessageContainer />
    </Card>
  );
}
