import Home from "./routes/pages/Home";
import CustomCursor from "./components/ui/customCursor";

export default function App() {
  return (
    <div className="w-full h-full bg-black text-white">
      <CustomCursor />
      <Home />
    </div>
  );
}
