import './App.css'
import { BrowserRouter, Routes, Route , Link, Outlet } from "react-router-dom";

function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
         
          <Route path = "/home" element = {<Home/>} />
          <Route path = "/blog" element = {<Blog/>} />
          <Route path = "/post" element = {<Post/>} />
          <Route path = "*" element = {<NoPage/>} />
          
         
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  
}

function Layout(){
  return <div style={{backgroundColor :" Red", height:"100vh"}}>
    <Link to="/home"> Home </Link>
      |
      <Link to="/blog"> Blog </Link>
      |
      <Link to="/post"> Post </Link>
    <div style={{backgroundColor:"cyan" , height:"50vh"}}>
    <Outlet/>
    </div>
    footer

  </div>
}

function Home(){
  return <div>
    Home Page
  </div>
}

function Blog(){
  return <div>
    Blog Page
  </div>
}

function Post(){
  return <div>
    Post Page
  </div>
}

function NoPage(){
  return <div>
    No Page Found
  </div>
}

export default App
