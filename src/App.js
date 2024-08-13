import React  from 'react';
import HomeScreen from './components/Home/Home';
import './App.css';
import ErrorBoundary from "./commoncomponents/ErrorHandler"

function App() {
  return (
   
      <ErrorBoundary>
     <HomeScreen />
     </ErrorBoundary>
   
  );
}

export default App;
