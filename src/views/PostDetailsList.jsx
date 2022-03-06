import React, {Component} from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";

import {Card} from "components/Card/Card.jsx";
import {FormInputs} from "components/FormInputs/FormInputs.jsx";
import {UserCard} from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import PostDetails from "components/PostDetails/PostDetails";
import SmallImage from "components/SmallImage/SmallImage.jsx";
import {AiOutlineRight, AiOutlineLeft} from "react-icons/ai";
import {BsTypeH1} from "react-icons/bs";
import {NavLink} from "react-router-dom";


class PostDetailsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PostData: {},
            index: 0
        }
    }

    componentWillMount() {
        if (this.props.location.Post != null) {
            this.setState({
                PostData: this.props.location.Post.element
            })
            let stringifiedData = JSON.stringify({
                Post: this.props.location.Post.element
            })
            localStorage.setItem('currentPost', stringifiedData)
        } else if (JSON.parse(localStorage.getItem('currentPost')) != null) {
            let cachedData = JSON.parse(localStorage.getItem('currentPost'))
            this.setState({PostData: cachedData.Post})
        }
    }

    componentDidMount() {
        this.makeSmallPhotoActive(0);
    }


    imageSlide = (e, i) => {
        e.preventDefault();
        let tempIndex = this.state.index + i;

        if (tempIndex > this.state.PostData.PostImagesList.length - 1) tempIndex = 0;
        else if (tempIndex < 0) tempIndex = this.state.PostData.PostImagesList.length - 1;
        console.log(tempIndex);
        this.setState({
            index: tempIndex
        })

        this.makeSmallPhotoActive(tempIndex);
    }

    makeSmallPhotoActive = index => {
        var containers = document.getElementsByClassName('small-image-container');

        for (var i = 0; i < containers.length; i++) {
            if (containers[i].classList.contains('active-image'))
                containers[i].classList.remove('active-image')
        }
        containers[index].classList.add('active-image')
    }

    nextImage = (e) => {
        this.imageSlide(e, 1);
    }

    changeImage = (e, receivedIndex) => {
        e.preventDefault();
        this.setState({
            index: receivedIndex
        })

        this.makeSmallPhotoActive(receivedIndex);
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title={this.state.PostData.PostTitle}
                                Price={this.state.PostData.Price}
                                content={
                                    <div>
                                        <h4 className="post-details-description">Description</h4>
                                        <p className="post-details-description">{this.state.PostData.PostDescription}</p>
                                        <div className="post-tags">
                                            {this.state.PostData.PostTags.length > 0 ?
                                                this.state.PostData.PostTags.map((tagName, index) => {
                                                    return (
                                                        <NavLink to={{
                                                            pathname: "/admin/dashboard",
                                                            tag: tagName
                                                        }}
                                                                 key={index}>
                                                            <span className="post-tag">{tagName}</span>
                                                        </NavLink>
                                                    )
                                                })
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>

                                }
                            />
                        </Col>
                        <Col md={4}>
                            <PostDetails
                                PostImage={this.state.PostData.PostImagesList[this.state.index]}
                                PostTitle={this.state.PostData.PostTitle}
                                DateAdded={this.state.PostData.DateAdded}
                                NextImage={this.nextImage}
                            />
                            <AiOutlineRight className="image-arrows right-arrow" onClick={e => this.imageSlide(e, 1)}/>
                            <AiOutlineLeft className="image-arrows left-arrow" onClick={e => this.imageSlide(e, -1)}/>

                            <div className="image-flex-container">

                                {this.state.PostData.PostImagesList.length > 0 ?
                                    this.state.PostData.PostImagesList.map((image, index) => {

                                        return (
                                            <span key={index} onClick={e => this.changeImage(e, index)}>
                                                <SmallImage imageKey={index} Image={image}
                                                            Alternative={"this is image " + index}/>
                                            </span>
                                        )
                                    })
                                    : <p></p>}
                            </div>
                            <h5 className="title">Tags:</h5>
                            <div className="post-tags">
                                {this.state.PostData.PostTags.length > 0 ?
                                    this.state.PostData.PostTags.map((tag, index) => {
                                        return (
                                            <NavLink to={{
                                                pathname: "/admin/dashboard",
                                                tag: {tag}

                                            }} key={index}>
                                                <span className="post-tag">{tag}</span>
                                            </NavLink>
                                        )
                                    })
                                    :
                                    ""
                                }
                            </div>

                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default PostDetailsList;
