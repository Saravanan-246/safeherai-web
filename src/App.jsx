import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppShell from "./components/layout/AppShell";

import Alerts from "./pages/Alerts";
import Emergency from "./pages/Emergency";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import SafeRoute from "./pages/SafeRoute";
import SafetyBubble from "./pages/SafetyBubble";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}

        <Route
          path="/"
          element={<Landing />}
        />

        {/* Application */}

        <Route element={<AppShell />}>
          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/safe-route"
            element={<SafeRoute />}
          />

          <Route
            path="/safety-bubble"
            element={<SafetyBubble />}
          />

          <Route
            path="/alerts"
            element={<Alerts />}
          />

          <Route
            path="/emergency"
            element={<Emergency />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>

        {/* Fallback */}

        <Route
          path="*"
          element={<Landing />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;