import CategoryPill from "@/components/category-pill";
import { Sermons } from "../_components/sermons";

const Dasboard = async () => {
  return (
    <>
      <div className="sticky top-0 bg-white z-10 pt-2">
        <CategoryPill />
      </div>
      <div className="p-6">
        <Sermons />
      </div>
    </>
  );
};

export default Dasboard;
