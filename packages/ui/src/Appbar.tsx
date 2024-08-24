import { Button } from "./button";
import { User } from "lucide-react"; // Assuming you're using lucide-react for icons

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void | Promise<void>;
  onSignout: () => void | Promise<void>;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const handleAuthAction = () => {
    if (user) {
      console.log("Logging out");
      onSignout();
    } else {
      console.log("Logging in");
      onSignin();
    }
    // Add any additional actions here
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="font-bold text-xl text-gray-800">Dashboard</span>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center mr-4">
                <span className="text-gray-700 mr-4">
                  Welcome, {user.name}
                </span>
                <Button
                  onClick={handleAuthAction}
                  variant="outline"
                  className="flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAuthAction}
                variant="primary"
                className="flex items-center"
              >
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
