import React, {Component} from "react";
// import { DropdownButton, Dropdown } from "reactstrap";
import {NavLink} from "react-router-dom";

//icons
import {BsSearch} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";
import {AiTwotoneHeart} from "react-icons/ai";
import {ImCross} from "react-icons/im";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";


import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import PostCard from "components/Card-Post/CardPost.jsx";
import Posts from "../posts-data.js";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OriginalPostData: Posts,
            PostsData: Posts,
            FavoritePosts: [],
            Tag: this.props.location.tag
        }
    }

    componentWillMount() {

        let stringifiedData = (localStorage.getItem('favoritePosts'));
        var favPosts = [];
        if (stringifiedData != null || stringifiedData != NaN)
            favPosts = JSON.parse(stringifiedData);

        if (favPosts != null) {
            favPosts = this.populateFavorites(favPosts);
            this.setState({FavoritePosts: favPosts})
        }

        this.checkTagFilter();
    }

    checkTagFilter = () => {
        if (this.state.Tag == null) return;

        let NewPostsArray = this.state.OriginalPostData.filter(element => {

            if (element.PostTags.includes(this.state.Tag))
                return element;
        })

        this.setState({
            PostsData: NewPostsArray
        })
    }

    populateFavorites = (posts) => {
        let list = [];
        if (posts.length == 0) {
            return;
        }
        for (let originalPost of Posts) {
            for (let localPost of posts.postsArray) {
                if (localPost.PostID == originalPost.PostID) {
                    list.push(originalPost);
                    break;
                }
            }
        }
        return list;
    }

    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i}/>);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }

    favorite = (e, post) => {
        e.preventDefault();
        this.addToFavorites(post);
        this.notify(true, post.PostTitle + ' added to favorites')
        //add to backend data

    }

    notify = (added, text) => {
        if (added)
            toast.success(text, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        else
            toast.warn(text, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
    }

    addToFavorites = (post) => {
        let postsArray = this.state.FavoritePosts;
        postsArray.push(post);
        this.setState({
            FavoritePosts: postsArray
        })
        localStorage.setItem('favoritePosts', JSON.stringify({postsArray: postsArray}));
        console.log(post);
    }

    unFavorite = (e, FavPost) => {
        e.preventDefault();
        const favPosts = this.state.FavoritePosts.filter(post => post != FavPost);
        this.notify(false, FavPost.PostTitle + ' removed from favorites')
        this.setState({
            FavoritePosts: favPosts
        })

        localStorage.setItem('favoritePosts', JSON.stringify({postsArray: favPosts}));
    }

    searchProducts = e => {
        e.preventDefault();
        let searched = e.target.value;

        let tempPostArray = this.state.OriginalPostData.filter(post => post.PostTitle.toLowerCase().match(searched))

        this.setState({
            PostsData: tempPostArray
        })
    }

    removeTag(e) {
        e.preventDefault();
        this.setState({
            Tag: "",
            PostsData: this.state.OriginalPostData
        })
    }


    render() {
        return (
            <div className="content">
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                />
                <div>
                    <div>
                        <FormControl className="search-input" placeholder="Search your product here..."
                                     onChange={e => this.searchProducts(e)}/>
                        <BsSearch/>
                        {this.state.Tag == null || this.state.Tag == "" ? "" :
                            <span>
                <span className="tag-text">Tag:</span>
                <span className="post-tag remove-right-margin remove-right-radius">{this.state.Tag}</span>
                <span className="cancel-btn-container" onClick={e => this.removeTag(e)}><ImCross
                    className="cancel-btn"/></span>
              </span>}
                    </div>
                    <div>

                    </div>
                </div>
                <div className="post-container d-inline-flex">
                    {this.state.PostsData.map(
                        element => {
                            return (
                                <NavLink
                                    to={{
                                        pathname: "/admin/post-details",
                                        Post: {element}
                                    }}
                                    key={element.PostID}
                                >
                                    <PostCard
                                        post={element}
                                        buttons={
                                            <div>

                                                <div className="card-post-btn">
                                                    <BsSearch/>
                                                </div>
                                                {this.state.FavoritePosts.includes(element) ?
                                                    <div className="card-post-btn"
                                                         onClick={event => this.unFavorite(event, element)}>
                                                        <AiTwotoneHeart/>
                                                    </div>
                                                    :
                                                    <div className="card-post-btn"
                                                         onClick={event => this.favorite(event, element)}>
                                                        <AiOutlineHeart/>
                                                    </div>
                                                }


                                            </div>
                                        }
                                    />
                                </NavLink>
                            )
                        }
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
