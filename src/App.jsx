import { BrowserRouter, Route, Routes } from "react-router";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import AuthLayout from "./features/authentication/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Loader from "./ui/Loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/" element={<Loader />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          // gutter={12}
          // containerStyle={{ margin: "8px" }}
          // toastOptions={{
          //   success: {
          //     duration: 3000,
          //   },
          //   error: {
          //     duration: 5000,
          //   },
          //   style: {
          //     fontSize: "16px",
          //     maxWidth: "500px",
          //     padding: "16px 24px",
          //     backgroundColor: "var(--color-grey-0)",
          //     color: "var(--color-grey-700)",
          //   },
          // }
          // }
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
