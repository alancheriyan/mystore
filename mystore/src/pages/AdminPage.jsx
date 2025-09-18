import { useState, useEffect } from "react";
import AdminLogin from "./AdminLoginPage"; 
import AdminPageContent from "./AdminPageContent";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      setLoggedIn(true);
    }
  }, []);

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  return <AdminPageContent />;
}
