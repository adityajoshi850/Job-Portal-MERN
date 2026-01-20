import React from 'react'
import Navbar from './Navbar.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import About from './About.jsx'


const App = () => {
    return (
        <div>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </BrowserRouter>





        </div>
    )
}

export default App
