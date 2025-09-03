import { BrowserRouter, Route, Routes } from "react-router";
import { useDarkMode } from "./contexts/DarkModeContext";
import AuthLayout from "./features/authentication/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Passwords from "./pages/Passwords";
import ProtectedRoute from "./ui/ProtectedRoute";
import Vaults from "./pages/Vaults";
import Settings from "./pages/settings.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import { DashboardStatsProvider } from "./contexts/DashboardStatsContext .jsx";
import Home from "./pages/Home.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <DashboardStatsProvider>
                  <DashboardLayout />
                </DashboardStatsProvider>
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="passwords" element={<Passwords />} />
            <Route path="vaults" element={<Vaults />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="verify-email-change" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
            primary: !isDarkMode ? "#018c29" : "#007020",
            secondary: "black",
          },
          error: {
            duration: 5000,
            primary: !isDarkMode ? "#b00609" : "#970508",
            secondary: "black",
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            backgroundColor: !isDarkMode ? "#fafcff" : "#1a1c21",
            color: !isDarkMode ? "#0b0f14" : "#fafcff",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
