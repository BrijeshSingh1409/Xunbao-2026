import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const initSession = useAuthStore((state) => state.initSession);

  useEffect(() => {
    initSession();
  }, [initSession]);

  return <RouterProvider router={router} />;
}
