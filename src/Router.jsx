import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DiscoIntro from "./components/DiscoIntro";
import MemoryLane from "./components/MemoryLane";
// import MovieChoice from "./components/MovieChoice";
import AccountingGame from "./components/AccountingGame";
import RocketLaunch from "./components/RocketLaunch";
import MailLetter from "./components/MailLetter";
// import Itinerary from "./components/Itinerary";
import CakeFinal from "./components/CakeFinal";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DiscoIntro />} />
          <Route path="memory" element={<MemoryLane />} />
          <Route path="choice/game" element={<AccountingGame />} />
          <Route path="rocket" element={<RocketLaunch />} />
          <Route path="mail" element={<MailLetter />} />
          <Route path="cake" element={<CakeFinal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
