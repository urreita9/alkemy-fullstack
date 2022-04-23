import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import './App.css';
import { Home } from './components/Home/Home';
import { NavBar } from './components/Navbar/NavBar';
import { Ops } from './components/Ops/Ops';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/actions/actions';

function App() {
	const dispatch = useDispatch();
	const token = localStorage.getItem('token-alkemy');
	// useEffect(()=>{
	// 	console.log(token)
	// },[token])

	return (
		<NextUIProvider>
			<Router>
				<NavBar />
				<Routes>
					<Route exact path='/' element={<Home user={token} />} />
					<Route exact path='/operations' element={<Ops user={token} />} />

					<Route exact path='/login' element={<Login />} />
					<Route exact path='/register' element={<Register />} />
					<Route path='*' element={<Navigate replace to='/' />} />
				</Routes>
			</Router>
		</NextUIProvider>
	);
}

export default App;
