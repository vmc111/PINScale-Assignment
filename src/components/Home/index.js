import TabBar from "../TabBar/index.js";
import "./index.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="order-2">
        <TabBar />
      </div>
      <div>
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default Home;
