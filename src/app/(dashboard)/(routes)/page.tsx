import { Sermons } from "../_components/sermons";

const Dasboard = async () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Latest Sermon</h2>
      <p className="mb-4">List of sermons</p>

      <Sermons />
    </div>
  );
};

export default Dasboard;
