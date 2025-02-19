import './App.css';
import Header from './components/Header';
import RegSupplier from './components/RegSupplier';
import NavBar from './components/NavBar';
import RegCustomer from './components/RegCustomer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';
import AllCustomers from './components/AllCustomers';
import AllGuides from './components/AllGuides';
import GuideLogin from './components/GuideLogin';
import CustomerLogin from './components/CustomerLogin';
import GuideProfile from './components/GuideProfile';
import AddEvent from './components/AddEvent';
import MyEvents from './components/MyEvents';
import AllEvents from './components/AllEvents';
import EditEvent from './components/EditEvent';
import CustomerProfile from './components/CustomerProfile';
import MyOrders from './components/MyOrders';
import Bookings from './components/Bookings';
import ViewCart from './components/ViewCart';
import Footer from './components/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";  // Ensures dropdowns work


function App() {
  return (
    <div className="App">
      {/* <Header />       */}
      <BrowserRouter>
      <NavBar />
      
        <Switch>
          <Route component={AllEvents} path="/" exact />
          <Route component={AllEvents} path="/cats" />
          <Route component={RegSupplier} path="/regsupplier" />
          <Route component={RegCustomer} path="/register" />          
          <Route component={AdminLogin} path="/alogin" />          
          <Route component={GuideLogin} path="/slogin" />          
          <Route component={CustomerLogin} path="/clogin" />          
          <Route component={AdminProfile} path="/aprofile" />          
          <Route component={GuideProfile} path="/sprofile" />          
          <Route component={CustomerProfile} path="/cprofile" />          
          <Route component={AllCustomers} path="/customers" />          
          <Route component={AllGuides} path="/guides" />                  
          <Route component={AddEvent} path="/add-product" />          
          <Route component={EditEvent} path="/edit/:prodid" />          
          <Route component={MyEvents} path="/myproducts" />          
          <Route component={MyOrders} path="/myorders" />          
          <Route component={Bookings} path="/bookings" />          
          <Route component={ViewCart} path="/cart" /> 
          <Route component={Footer} path="/Footer" />
        </Switch>
        <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
