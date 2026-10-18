import Home from "./routes/pages/Home";
import CustomCursor from "./components/ui/customCursor";
import DitherBlobTracker from "./components/ui/DitherBlobTracker";

export default function App() {
  return (
    <div className="w-full h-full bg-black text-white">
      <DitherBlobTracker />
      <CustomCursor />
      <Home />
    </div>
  );
}
