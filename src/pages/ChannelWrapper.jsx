import { useParams } from "react-router-dom";
import Channel from "./Channel";
import DummyChannel from "./DummyChannel";

// MongoDB ObjectId = 24 hex characters
const isMongoId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

function ChannelWrapper() {
  const { id } = useParams();

  // ✅ Dummy channel → NO backend
  if (!isMongoId(id)) {
    return <DummyChannel />;
  }

  // ✅ Real channel → backend
  return <Channel />;
}

export default ChannelWrapper;


