import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import Navbar from "./Components/Navbar";
import TaskSection from "./Components/TaskSection";
import { TaskProvider } from "./Context/TaskContext";

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
