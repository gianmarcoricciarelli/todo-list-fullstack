import { useEffect } from "react";

function App() {
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3000/todos");
      console.log("getTodos ~ response:", response);
    };

    getTodos();
  }, []);

  return <p>Todo App Fullstack</p>;
}

export default App;
