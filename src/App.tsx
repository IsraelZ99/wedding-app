import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SwipperContainer from "./components/SwiperContainer";
import NotFound from "./components/NotFound";
import { InvitationProvider } from "./store/wedding-context";
import InviteCreation from "./components/InviteCreation";

function App() {
  return (
    <InvitationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NotFound />} />
          <Route path="/add-custom-invitation" element={<InviteCreation />} />
          <Route path="/:invitationId" element={<SwipperContainer />} />
        </Routes>
      </Router>
    </InvitationProvider>
  );
}

export default App;
