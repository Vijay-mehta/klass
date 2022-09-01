import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./shared/Login/login";
import Dashboard from "./shared/Dashboard/dashboard";
import Students from "./shared/Students/Students";
import Categories from "./shared/categories/categories";
import Subcategories from "./shared/Subcategories/subcategories";
import Tags from "./shared/Tags/tags";
import Business from "./shared/Business/Business";
import Class from "./shared/Class/Class";
import "./style.css";
import Events from "./shared/Events/Events";
import Groups from "./shared/Groups/GroupsData";
import Grouptags from "./shared/Grouptags/Grouptags";
import AddEvents from "./shared/Events/AddEvents"
import AddClass from "./shared/Class/AddClass";
import UpdateClass from "./shared/Class/UpdateClass";
import UpdateEvents from "./shared/Events/UpdateEvents";
import Articles from "./shared/Articles/Articles";
import AddArticles from './shared/Articles/AddArticles'
import UpdateArticles from './shared/Articles/UpdateArticles'
import Faqs from './shared/Faqs/Faqs';
import AddFaqs from './shared/Faqs/AddFaqs';
import UpdateFaqs from "./shared/Faqs/UpdateFaqs";
import Sections from './shared/Sections/Sections'
import Product_Category_Group from "./shared/Procuct_Category_Group/productCategoryGroup";
import Product_Categories from "./shared/Product_Categories/productCategories";
import GroupsData from './shared/Groups/GroupsData';

const PrivateRoute = (props) => {
  const token = localStorage.getItem("token");
  // console.log(token);
  // console.log(props, "privateRoute");

  return (
    <>
      {token ? (
        <Route {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )}
    </>
  );
};

const PublicRoute = (props) => {
  const token = localStorage.getItem("token");

  return token ? (
    <Redirect to={{ pathname: "/dashboard" }} />
  ) : (
    <Route {...props} />
  );
};

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login}></PublicRoute>
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/Students" component={Students} />
          <PrivateRoute exact path="/Business" component={Business} />
          <PrivateRoute exact path="/Events" component={Events} />
          <PrivateRoute exact path="/AddEvents" component={AddEvents} />
          <PrivateRoute exact path="/UpdateEvents" component={UpdateEvents} />
          <PrivateRoute exact path="/UpdateEvents/:id" component={UpdateEvents} />

          <PrivateRoute exact path="/Articles" component={Articles} />
          <PrivateRoute exact path="/AddArticles" component={AddArticles} />
          <PrivateRoute exact path="/UpdateArticles" component={UpdateArticles} />


          <PrivateRoute exact path="/Class" component={Class} />
          <PrivateRoute exact path="/AddClass" component={AddClass} />
          <PrivateRoute exact path="/UpdateClass" component={UpdateClass} />

          <PrivateRoute exact path="/Categories" component={Categories} />
          <PrivateRoute exact path="/Subcategories" component={Subcategories} />
          <PrivateRoute exact path="/Tags" component={Tags} />
          <PrivateRoute exact path="/GroupsData" component={GroupsData} />

          <PrivateRoute exact path="/Grouptags" component={Grouptags} />
          <PrivateRoute exact path="/Faqs" component={Faqs} />
          <PrivateRoute exact path="/AddFaqs" component={AddFaqs} />
          <PrivateRoute exact path="/UpdateFaqs" component={UpdateFaqs} />
          <PrivateRoute exact path="/Sections" component={Sections} />

          <PrivateRoute exact path="/Product_Category_Group" component={Product_Category_Group} />
          <PrivateRoute exact path="/Product_Categories" component={Product_Categories} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
