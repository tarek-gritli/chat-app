import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="w-96 border-r p-4 flex flex-col h-full">
      <SearchInput />
      <Conversations />
      <Button variant="ghost" className="mt-auto" onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};
export default Sidebar;
