import Footer from "./Components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import TaskSection from "./components/TaskSection";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <Navbar />
        <HeroSection />
        <TaskSection />
        <Footer />
      </div>
    </TaskProvider>
  );
}

export default App;
