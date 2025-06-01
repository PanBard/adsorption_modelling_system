import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Ads from './pages/Ads';
import NotFoundPage from './components/NotFoundPage';
import PostMan from './pages/PostMan';
import ReverseEngineering from './pages/ ReverseEngineering';
import MockData from './pages/MockData';

const router = createBrowserRouter([
  {path:"/", element: <Home/>},
  {path:"/ad", element: <Ads/>},
  {path:"/reverse_engineering", element: <ReverseEngineering/>},
  {path:"/mock_data", element: <MockData/>},
  {path:"/postman", element: <PostMan/>},
  {path:"*", element: <NotFoundPage/>}
]);


function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
