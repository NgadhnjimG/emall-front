import Card from "components/Card/Card";
import React, {Component} from "react";

export class CardPost extends Component {

    render() {
        return (
            <div>
                <div className="card-post post-card-color">
                    <div className="card-post-image">
                        <img src={this.props.post.PostImage} alt="card-post-title" className="post-card-image"/>
                        {/* this should be hidden and only shown on hover */}
                        <div className="card-post-details">
                            View details
                        </div>
                    </div>
                    <div className="card-post-title">
                        {this.props.post.PostTitle}
                    </div>
                    <div className="text-center ">{this.props.buttons}</div>
                </div>
            </div>
        );
    }

}

export default CardPost;