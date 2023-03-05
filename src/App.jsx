import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthContext } from './contexts/AuthProvider/AuthProvider';
import { router } from './Routes/Routes/Routes';

function App() {

  const {darkmode} = useContext(AuthContext)

  return (
    <div className={`${darkmode && 'dark'} mx-auto`}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
