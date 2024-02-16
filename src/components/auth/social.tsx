import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button variant="outline" className="w-full" size="lg" onClick={() => {}}>
        <FcGoogle className=" h-5 w-5" />
      </Button>
    </div>
  );
};
