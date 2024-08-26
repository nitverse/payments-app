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
    <header className="bg-white shadow-sm mb-3">
      <div className="max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center jutify-end">
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Payments App
            </span>
          </div>
          <button
            onClick={handleAuthAction}
            className="flex items-center justify-end  bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <User className="h-5 w-5" />
            <span>{user ? "Logout" : "Login"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
