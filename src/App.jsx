import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="flex-grow">
        <Manager />
      </div>

      <Footer />

    </div>
  );
}

export default App;