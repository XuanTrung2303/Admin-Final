import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import AddEditBanner from './pages/AddEditBanner';
import AddBannerRealtime from './pages/AddBannerRealtime';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import ViewBanner from './pages/ViewBanner';
import AddCategory from './pages/AddCategory';
import AddImageCategory from './pages/AddImageCategory';
import ViewCategory from './pages/ViewCategory';
import UpdateCategory from './pages/UpdateCategory';
import ViewReview from './pages/ViewReview';
import ViewItem from './pages/ViewItem';


function App() {
  return (
    <BrowserRouter>
     <div className="App">
     <NavBar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddEditBanner />} />
      <Route path="/addBanner" element={<AddBannerRealtime />} />
      <Route path="/viewBanner" element={<ViewBanner />} />
      <Route path="/update/:id" element={<AddEditBanner />} />
      <Route path='/addCategory' element={<AddCategory/>}/>
      <Route path="/addImage" element={<AddImageCategory />} />
      <Route path="/viewCategory" element={<ViewCategory />} />
      <Route path="/updateCate/:firebaseId" element={<UpdateCategory />} />
      <Route path="/viewReview" element={<ViewReview />} />
      <Route path="/viewItem" element={<ViewItem />} />
     </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
