import './App.css';
import './scss/global.scss'
import Login from './components/Login';
import Register from './components/Register';
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import MainLayout from './Layout/MainLayout';
import PostsSaved from './components/PostsSaved'
import PostsTagged from './components/PostsTagged'
import PostsUser from './components/PostsUser';
import Account from './components/Account';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path=':nameUser' element={<UserDetail />} >
            <Route index element={<PostsUser />} />
            <Route path='saved' element={<PostsSaved />} />
            <Route path='tagged' element={<PostsTagged />} />
          </Route>

          <Route path='accounts/edit' element={<Account />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
