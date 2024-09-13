import Gallery from "../components/Gallery/Gallery";
import Navbar from "../components/NavBar";


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <Gallery />
    </div>
  );
};

export default Home;
