import Navbar from "./components/Navbar";
import Inputform from "./components/Inputform";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="px-6 py-10">
        <Inputform />
      </main>
    </div>
  );
}

export default App;
