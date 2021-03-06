import React, { Component } from 'react';
import { AsyncContent} from "components/AsyncContent";
import { RecipeCard} from "components/recipes/RecipeCard";
import 'whatwg-fetch';
import 'url-search-params';
import {Link} from "react-router-dom";

function noSavedItems(props) {
  return (
    <div>
      <h2>Looks like you haven't saved any recipes!</h2>
      <p className="lead">Try <Link to="/recipe">searching</Link> or&nbsp;
        <Link to="/recipe/browse">browsing</Link> recipes,
        and save the ones you like.</p>
    </div>
  )
}

class RecipeSavedPage extends Component {
  render() {
    return (
        <div className="container" key={this.props.pg_id}>
          <h1>My saved recipes</h1>
          <div className="row">
            <div className="col-md-9">
              <AsyncContent
                  auth={this.props.auth}
                  host={process.env.REACT_APP_HOST}
                  resource='recipes'
                  searchParams={new URLSearchParams('?saved=true')}
                  mergeResults
                  infiniteScrolling
                  loginRequired
                  component={RecipeCard}
                  emptyResultComponent={noSavedItems}
                  extraProps={{saved: true, auth: this.props.auth}}
              />
            </div>
          </div>
        </div>
    );
  }
}

export {RecipeSavedPage};
