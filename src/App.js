import React from 'react'
import Character from './components/Character';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Character />
      </QueryClientProvider>
    </div>
  );
}

export default App;