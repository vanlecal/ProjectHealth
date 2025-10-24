// import PatientDashboard from "./components/patient/patient-dashboard";
// import Homepage from "./pages/homepage";

// export default function App() {
//   return (
//     <div>
//       {/* <Homepage /> */}
//       <PatientDashboard />
//     </div>
//   );
// }

import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/public/LoadingScreen";

const Routes = lazy(() => import("./AppRoutes"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes />
      <Toaster position="top-right" />
    </Suspense>
  );
}

export default App;
