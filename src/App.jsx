import { useState } from 'react';
import AuthScreen from './pages/AuthScreen.jsx';
import HomeScreen from './pages/HomeScreen.jsx';

function App() {
  const [loggedIn, setloggedIn] = useState(localStorage.getItem("jwt") ? true : false);
  return (
    <>
      { loggedIn ? <HomeScreen setloggedIn={setloggedIn}/> : <AuthScreen setloggedIn={setloggedIn}/>}
    </>
  )
}

export default App
