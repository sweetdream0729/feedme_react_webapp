import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import 'css/Cards.css';
import {AspectConstrainedImage} from "components/AspectConstrainedImage";
import {RecipePropertyRow} from "./RecipePropertyRow";
import {Reviewer} from "components/Reviewer";
import {RatingsSummary} from "components/RatingsSummary";
import {IngredientList} from "components/IngredientList";
import {DownloadCard} from "components/DownloadCard";
import {RecipeToolbar} from "./RecipeToolbar";
import {HostLink} from "components/HostLink";
import {SourceLink} from "components/SourceLink";

class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {rating: 0, userRating: 0, ratingsLoading: true}
  }
  handleRatingsUpdate = (data) => {
    this.setState({
      userRating: data.user_rating, rating: data.rating,
      ratingsLoading: false, ratingsCount: data.ratings_count
    })
  };
  handleUserRating = () => {
    this.refs.ratingsSummary.updateData()
  };
  render() {
    let source_url = this.props.data.source_url;
    let pageUrl = `https://www.feedmeeapp.com/recipe/${this.props.data.pg_id}`;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="card bordered padded margin-top-lg">
              <div className="row">
                <AspectConstrainedImage
                    imageUrl={this.props.data.image_url}
                    className="margin-bottom ratings-summary-parent"
                    alt={this.props.data.name} ratio="16:9">
                  <RatingsSummary rating={this.state.rating}
                                  ratingsCount={this.state.ratingsCount}
                                  onUpdate={this.handleRatingsUpdate}
                                  subject="recipes"
                                  pg_id={this.props.data.pg_id}
                                  ref="ratingsSummary"
                                  auth={this.props.auth}
                  />
                </AspectConstrainedImage>
              </div>
              <div className="row">
                <div className="col-sm-6 bordered-right-tablet">
                  <h2 className="pink">{this.props.data.name}</h2>
                  <p className="text-muted">{this.props.data.description}</p>
                  <SourceLink url={source_url} type="Recipe" />
                  <ul className="list-inline text-muted">
                    {this.props.data.keywords.map((item, idx) => {
                      return (<li key={idx}>{item}</li>)
                    })}
                  </ul>
                  <hr className="visible-xs"/>
                </div>
                <div className="col-sm-6 margin-top" style={{  }}>
                  <strong>Share recipe</strong>
                  <RecipeToolbar url={pageUrl} pg_id={this.props.data.pg_id}
                                 auth={this.props.auth} saved={this.props.data.saved}
                                 title={this.props.data.name}
                  />
                </div>
              </div>
            </div>
            <div className="card bordered padded">
              <div className="row">
                <div className="col-sm-7 bordered-right-tablet">
                  <RecipePropertyRow
                      prepTimeSeconds={this.props.data.prep_time_seconds}
                      cookTimeSeconds={this.props.data.cook_time_seconds}
                      servings={this.props.data.servings}
                      difficulty={this.props.data.difficulty}
                  />
                  <hr className="visible-xs"/>
                </div>
                <div className="col-sm-5">
                  <Reviewer subject="recipe" rating={this.state.userRating}
                            auth={this.props.auth} pg_id={this.props.data.pg_id}
                            handleUpdate={this.handleUserRating}
                            loading={this.state.ratingsLoading}
                  />
                </div>
              </div>
            </div>
            <div className="card bordered padded">
              <div className="row">
                <div className="col-sm-6">
                  <h3>Ingredients</h3>
                  <IngredientList ingredients={this.props.data.ingredients} />
                </div>
                <div className="col-sm-6">
                  <h3>Instructions</h3>
                  <p>Recipe instructions from <HostLink url={source_url} /></p>
                  <Button href={this.props.data.source_url} target="_blank" block
                          bsStyle="danger" bsSize="large" className="btn-red">View Instructions</Button>
                  <div className="card bordered border-dashed padded margin-top">
                    <p>This recipe was originally from <HostLink url={source_url} />.</p>
                    <p>You can’t view the recipe on Feedmee because we respect the original author and prefer to refer you to their sites.</p>
                    <p>If you are the original author, you can claim your profile now & contribute.</p>
                  </div>
                </div>
              </div>
            </div>
            <DownloadCard />
          </div>
        </div>
      </div>
    )
  }
}

export {RecipeDetail};
