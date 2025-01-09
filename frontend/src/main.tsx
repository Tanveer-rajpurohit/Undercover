import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lobby from "./router/offine/Lobby.tsx";
import CreateGroupe from "./router/offine/CreateGroupe.tsx";
import Playground from "./router/offine/Playground.tsx";
import { PlaygroundProvider } from "./context/PlayGround.tsx";
import Login from "./router/Login.tsx";
// import Profile from "./router/Profile.tsx";
// import Setting from "./router/Setting.tsx";
import SelectGame from "./router/online/SelectGame.tsx";
import WaitingLobby from "./router/online/WaitingLobby.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import PlayGame from "./router/online/PlayGame.tsx";
import CWIN from "./router/online/CWIN.tsx";
import UWIN from "./router/online/UWIN.tsx";
import WWIN from "./router/online/WWIN.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/offline/lobby",
    element: <Lobby />,
  },
  {
    path: "/offline/lobby/creategroupe",
    element: <CreateGroupe />,
  },
  {
    path: "/offline/playground",
    element: <Playground />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/profile",
  //   element: <Profile />,
  // },
  // {
  //   path: "/setting",
  //   element: <Setting />,
  // },
  {
    path: "/selectgame",
    element: <SelectGame />,
  },
  {
    path: "/waitinglobby",
    element: <WaitingLobby />,
  },{
    path: '/playgame',
    element: <PlayGame />
  },
  {
    path:'/cwin',
    element: <CWIN />
  },
  {
    path: '/uwin',
    element: <UWIN />
  },
  {
    path: '/wwin',
    element: <WWIN />
  }
]);

createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <PlaygroundProvider>
      <RouterProvider router={router} />
    </PlaygroundProvider>
  </SocketProvider>
);
