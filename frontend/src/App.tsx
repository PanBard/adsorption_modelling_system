import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import { ReverseEngineering, Home, Ads, PostMan } from './pages';

const router = createBrowserRouter([
  {path:"/", element: <Home/>},
  {path:"/ad", element: <Ads/>},
  {path:"/reverse_engineering", element: <ReverseEngineering/>},
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
