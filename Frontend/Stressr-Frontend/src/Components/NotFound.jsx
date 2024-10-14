import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("This page doesn't exist. Redirecting to the landing page...");
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return null; 
};

export default NotFound;
