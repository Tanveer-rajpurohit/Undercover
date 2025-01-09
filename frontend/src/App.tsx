import Home from "./components/home/Home";
import NavBar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <div className="w-full h-screen font-Quicksand flex flex-col bg-[#E9E8E4]">
        <NavBar />

        <Home />
      </div>
    </>
  );
}

export default App;
