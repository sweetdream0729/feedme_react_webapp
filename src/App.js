import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { MainNav } from './components/MainNav';
import {
  ImpactPage, SearchPage
} from "./pages/MainPages";
import { initializeApp } from 'firebase';
import {RecipeRoutes} from "./components/RecipesRoutes";

class App extends Component {
  constructor(props) {
    super(props);
    this.firebase = initializeApp({
      apiKey: "AIzaSyDJdcBZSwLlpWENN5oWZYQVZL0u7ZPSzhc",
      authDomain: "feedmee-appsppl-dev.firebaseapp.com",
      databaseURL: "https://feedmee-appsppl-dev.firebaseio.com",
      projectId: "feedmee-appsppl-dev",
      storageBucket: "feedmee-appsppl-dev.appspot.com",
      messagingSenderId: "704262352076"
    });
    this.state = {auth: {authService: this.firebase.auth.bind(this.firebase)}};
  }
  componentDidMount() {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((id_token) => {
          this.setState({
            auth: {
              user: user,
              authService: this.firebase.auth.bind(this.firebase),
              token: id_token
            }
          });
        });
      } else {
        this.setState({auth: {authService: this.firebase.auth.bind(this.firebase)}});
      }
    });
  }
  render() {
    return (
      <Router>
        <div className="Feedmee-App">
          <MainNav auth={this.state.auth} />
          <Route exact path="/" component={SearchPage}/>
          <Route path="/impact" component={ImpactPage}/>
          <Route path="/recipes" render={({match, location}) => {
            return <RecipeRoutes auth={this.state.auth} match={match} />
          }} />
        </div>
      </Router>
    );
  }
}

export default App;
