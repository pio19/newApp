import HomeAdmin from './admin/HomeAdmin';
import './App.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import Login from './pages/Login';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      {/* <Login /> */}
      <HomeAdmin />
    </div>
    </QueryClientProvider>
  );
}

export default App;
