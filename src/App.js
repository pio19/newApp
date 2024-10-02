import HomeAdmin from './admin/HomeAdmin';
import './App.css';
<<<<<<< HEAD
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import Login from './pages/Login';

const queryClient = new QueryClient();
=======
// import Index from './client/pages/Index';
import ShoppingCart from './client/pages/ShoppingCart';
// import Login from './pages/Login';
// import ClientHome from './client/pages/ClientHome';

>>>>>>> 6456d9aa9b945cae5adef349f7500ed02af01fc6

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      {/* <Login /> */}
<<<<<<< HEAD
      <HomeAdmin />
=======
      {/* <ClientHome/> */}
      {/* <Index/> */}
      <ShoppingCart/>
>>>>>>> 6456d9aa9b945cae5adef349f7500ed02af01fc6
    </div>
    </QueryClientProvider>
  );
}

export default App;
