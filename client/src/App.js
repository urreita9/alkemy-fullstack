import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import './App.css';
import { Home } from './components/Home/Home';
import { NavBar } from './components/Navbar/NavBar';
import { Ops } from './components/Ops/Ops';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

function App() {
	return (
		<NextUIProvider>
			<Router>
				<NavBar />
				<Routes>
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/register' element={<Register />} />

					<Route exact path='/' element={<Home />} />
					<Route exact path='/operations' element={<Ops />} />
				</Routes>
			</Router>
		</NextUIProvider>
	);
}

export default App;
