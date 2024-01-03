import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "./Redux/App/app";

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <SnackbarProvider maxSnack={3}>
          <Outlet />
        </SnackbarProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
