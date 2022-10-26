import { Link } from "react-router-dom";

import { animations } from "controller";

function Home() {
  return (
    <div
      style={{
        background: "#5f5f8f",
        height: "100vh",
      }}
    >
      <ul
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {animations.map(({ name }) => (
          <li
            key={name}
            style={{
              marginBottom: 10,
              fontSize: 24,
            }}
          >
            <Link to={`/animations/${name}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
