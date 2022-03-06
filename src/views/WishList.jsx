import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import PostCard from "components/Card-Post/CardPost.jsx";
//icons
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { NavLink } from "react-router-dom";

class WishList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FavoritePosts: []
        }
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

    componentWillMount() {
        let stringifiedData = (localStorage.getItem('favoritePosts'));
        var favPosts = [];
        if (stringifiedData != null)
            favPosts = JSON.parse(stringifiedData);

        if (favPosts != null) this.setState({ FavoritePosts: favPosts.postsArray })

    }


    unFavorite = (e, FavPost) => {
        e.preventDefault();
        const favPosts = this.state.FavoritePosts.filter(post => post != FavPost);
        this.notify(false, FavPost.PostTitle + ' removed from favorites')
        this.setState({
            FavoritePosts: favPosts
        })

        localStorage.setItem('favoritePosts', JSON.stringify({ postsArray: favPosts }));
    }

    render() {
        return (
            <div>

                {this.state.FavoritePosts.length != 0 ?
                    <div>
                        <h1>Favorite Products</h1>
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
                        <div className="post-container d-inline-flex">

                            {this.state.FavoritePosts.map(
                                element => {
                                    return (
                                        // <Col lg={3} sm={6} key={element.PostID}>
                                        <NavLink
                                            to={{
                                                pathname: "/admin/post-details",
                                                Post: { element }
                                            }}
                                            key={element.PostID}
                                        >
                                            <PostCard
                                                post={element}
                                                buttons={
                                                    <div>

                                                        <div className="card-post-btn">
                                                            <BsSearch />
                                                        </div>
                                                        {this.state.FavoritePosts.includes(element) ?
                                                            <div className="card-post-btn"
                                                                onClick={e => this.unFavorite(e, element)}>
                                                                <AiTwotoneHeart />
                                                            </div>
                                                            :
                                                            <div className="card-post-btn"
                                                                onClick={e => this.favorite(e, element)}>
                                                                <AiOutlineHeart />
                                                            </div>
                                                        }
                                                        <div className="card-post-btn">
                                                            <BsSearch />
                                                        </div>

                                                    </div>
                                                }
                                            />
                                        </NavLink>

                                    )
                                }
                            )}
                        </div>
                    </div>
                    :
                    <h1>there are no favorites</h1>
                }
            </div>

        )
    }
}

export default WishList;