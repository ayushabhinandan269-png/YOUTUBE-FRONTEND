import { useParams } from "react-router-dom";

function Explore() {
  const { category } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold capitalize">
        {category || "Explore"}
      </h1>
    </div>
  );
}

export default Explore;

