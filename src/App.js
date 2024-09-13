import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from './router';

function App() {
  
  return (
    <div className="App">
      <div className="background"/>
      <RouterProvider router={createBrowserRouter(router)} />
    </div>
  );
}

export default App;
