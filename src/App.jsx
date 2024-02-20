
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import CreateBlog from './pages/CreateBlog'
import SavedBlogs from './pages/SavedBlogs'
import BlogListing from './pages/BlogListing'
import Blogify from "../src/images/Blogify.png"
import { FullContentPage } from './pages/FullContentPage'
import AboutSection from './pages/AboutSection'
import UpdateSection from './pages/UpdateSection'
import NavbarMenu from './components/NavbarMenu'
import Carousel from './pages/Carousel'





function App() {

  const backgroundImageStyle = {
    backgroundImage: `url(${Blogify})`,
    backgroundSize: 'cover', // You can adjust the background size as needed
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };
  return (
  
      <div class="bg-slate-100">
          <Router>
            <NavbarMenu />
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/create' element={<CreateBlog />} />
              <Route path='/saved' element={<Carousel />} />
              <Route path='/listing' element={<BlogListing />} />
              <Route path="/full-content/:id" element={<FullContentPage />} />
              <Route path='/about' element={<AboutSection />} />
              <Route path='/update/:id' element={<UpdateSection />} />
            </Routes>
          </Router>
      </div>
  
  )
}

export default App
