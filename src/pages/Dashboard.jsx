import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="AppBody">
      <header>
        <h1>Dashboard</h1>
      </header>
      <p>Welcome, {user?.username}!</p>
    </div>
  );
};

export default Dashboard;
