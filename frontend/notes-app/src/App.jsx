import React from 'react'
import { Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp'
import Front from './components/Frontpage/Front';


const routes=(
  // <Router>
    <Routes>
      <Route path='/' exact element={<Front/>}/>
      <Route path='/dashboard' exact element={<Home/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
    </Routes>
  // </Router>
)


const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App