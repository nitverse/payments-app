import { Button } from "./button";
import { User } from "lucide-react";

interface AppbarProps {
  user?: { name?: string | null };
  onSignin: () => void | Promise<void>;
  onSignout: () => void | Promise<void>;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const handleAuthAction = () => (user ? onSignout() : onSignin());

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-gray-600">
                Hello, {user.name || "User"}
              </span>
            )}
            <Button
              onClick={handleAuthAction}
              variant={user ? "outline" : "primary"}
              className="flex items-center"
            >
              <User className="mr-2 h-4 w-4" />
              {user ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
 