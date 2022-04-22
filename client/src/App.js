import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import './App.css';
import { Home } from './components/Home/Home';
import { NavBar } from './components/Navbar/NavBar';
import { Ops } from './components/Ops/Ops';

function App() {
	return (
		<NextUIProvider>
			<Router>
				<NavBar />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/operations' element={<Ops />} />
				</Routes>
			</Router>
		</NextUIProvider>
	);
}

export default App;
