import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AuthComponent from "./components/AuthCom.jsx";

const theme = extendTheme({
  fonts: {
    body: "'Fira Sans', sans-serif",
    heading: "'Fira Sans', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <AuthComponent>
            <App />
          </AuthComponent>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

// const init = async () => {
//   try {
//     const authClient = await AuthClient.create();
//     console.log(authClient);
//     if (await authClient.isAuthenticated()) {
//       handleAuth(authClient);
//     } else {
//       console.log("User is not authenticated, starting login process");
//       await authClient.login({
//         identityProvider: "https://identity.ic0.app/#authorize",
//         onSuccess: () => {
//           handleAuth(authClient);
//         },
//         onError: (error) => {
//           console.error("Login failed", error);
//         },
//       });
//     }
//   } catch (error) {
//     console.error("AuthClient initialization failed", error);
//   }
// };

// init();

// async function handleAuth(authClient) {

// }

// init();
