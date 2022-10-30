import { Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './components/Account';
import Login from './components/Login';
import PostsSaved from './components/PostsSaved';
import PostsTagged from './components/PostsTagged';
import PostsUser from './components/PostsUser';
import Register from './components/Register';
import MainLayout from './Layout/MainLayout';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import './scss/global.scss';

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
