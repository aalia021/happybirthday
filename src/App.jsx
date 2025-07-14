import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 font-sans">
      {/* Optional: Global music player or header */}
      {/* <Header /> */}

      <Outlet />

      {/* Optional: <Footer /> */}
    </div>
  );
}
