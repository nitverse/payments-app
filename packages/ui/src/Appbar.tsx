import { Button } from "./button";

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
    <div className="flex justify-between border-b px-4 my-4">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className="flex flex-col justify-center pt-2">
        <button
          onClick={handleAuthAction}
          className="bg-black rounded-md mb-3 text-white px-4 py-2"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

