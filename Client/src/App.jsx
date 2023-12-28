import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("loggedin") !== "true") {
      navigate("/login");
      localStorage.clear();
    }
  }, [localStorage.getItem("loggedin")]);

  return <>Main Page</>;
}

export default App;
