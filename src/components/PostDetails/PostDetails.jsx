import React, {Component} from "react";

export class PostDetails extends Component {
    render() {
        return (
            <div className="card ">
                <img src={this.props.PostImage} className="post-details-image" alt="..."
                     onClick={this.props.NextImage}/>


                <h4 className="title card-post-title">
                    {this.props.PostTitle}
                    <h6 className="date-added">Added on {this.props.DateAdded}</h6>
                </h4>


            </div>

        );
    }
}

export default PostDetails;