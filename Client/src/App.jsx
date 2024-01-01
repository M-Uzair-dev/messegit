import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <SnackbarProvider maxSnack={3}>
        <Outlet />
      </SnackbarProvider>
    </CookiesProvider>
  );
}

export default App;
