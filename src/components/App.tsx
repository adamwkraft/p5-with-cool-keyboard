import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Canvas from "components/Canvas";
import { animations } from "controller";
import Home from "./Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  ...animations.map(({ name, hotCanvas }) => ({
    path: `/animations/${name}`,
    element: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#5f5f8f",
          width: "100vw",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            fontSize: 24,
          }}
        >
          <Link to="/">Back</Link>
        </div>
        <Canvas canvas={hotCanvas} />
      </div>
    ),
  })),
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
