



import CreateUser from "../components/CreateUser";
import ChannelManager from "../components/ChannelManager";

export default function AdminDashboard() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <CreateUser />
      <ChannelManager />
    </>
  );
}
