import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app/app";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/theme";
import { ApiProvider } from "./context/api";
import { LangProvider } from "./context/lanuage";
import { ResulutionContext } from "./context/resolution";
import { ShareLinkProvider } from "./context/shareLink";

// import { SocketProvider } from './context/socket'
import { LoginProvider } from "./context/login";
import { AuthorizetionProvider } from "./context/user";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ApiProvider>
          <LangProvider>
            <ResulutionContext>
              <ShareLinkProvider>
                {/* <SocketProvider> */}
                <LoginProvider>
                  <AuthorizetionProvider>
                    <App />
                  </AuthorizetionProvider>
                </LoginProvider>
                {/* </SocketProvider> */}
              </ShareLinkProvider>
            </ResulutionContext>
          </LangProvider>
        </ApiProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
