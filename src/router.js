import { createBrowserRouter } from 'react-router-dom';
import modules from './ktane/modules';
import KTHome from './ktane/KTHome';
import ModuleList from './ktane/ModuleList';
import Home from './Home';

const router = [
    {
      path: "/ktane",
      element: <KTHome />,
      children: [
        {
            index: true,
            element: <ModuleList />
        },
        ...modules
      ]
    },
    {
      path: "/",
      element: <Home />
    }
  ]

export default router;