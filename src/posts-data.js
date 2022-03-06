import PhotoOne from "assets/img/phones/first.jfif";
import PhotoTwo from "assets/img/phones/photo2.jpg";
import PhotoFive from "assets/img/phones/photo3.png";
import PhotoThree from "assets/img/phones/photo3.jpg";
import PhotoFour from "assets/img/phones/photo4.jpg";
import PhotoSix from "assets/img/phones/photo6.jpg";

const Posts = [
    {
        PostID: "1",
        PostTitle: "First product",
        PostDescription: "test desc",
        PostImage: PhotoOne,
        DateAdded: '01-01-2020',
        PostImagesList: [PhotoOne, PhotoTwo, PhotoThree],
        Price: 10.3,
        PostTags: ['Phone']
    },
    {
        PostID: "2",
        PostTitle: "Second product",
        PostDescription: "test desc",
        PostImage: PhotoOne,
        DateAdded: '01-01-2020',
        PostImagesList: [PhotoOne, PhotoTwo, PhotoTwo, PhotoSix],
        Price: 10.3,
        PostTags: ['Phone', "Samsung"]
    },
    {
        PostID: "3",
        PostTitle: "Third product",
        PostDescription: "test desc",
        PostImage: PhotoOne,
        DateAdded: '01-01-2020',
        PostImagesList: [PhotoOne, PhotoTwo],
        Price: 10.3,
        PostTags: ["another tag"]
    },
    {
        PostID: "4",
        PostTitle: "Forth product",
        PostDescription: "test desc",
        PostImage: PhotoOne,
        DateAdded: '01-01-2020',
        PostImagesList: [PhotoOne],
        Price: 10.3,
        PostTags: ['Phone', "another tag"]
    },
    {
        PostID: "5",
        PostTitle: "Fifth product",
        PostDescription: "test desc",
        PostImage: PhotoOne,
        DateAdded: '01-01-2020',
        PostImagesList: [PhotoOne, PhotoTwo, PhotoSix, PhotoThree, PhotoFour, PhotoFive],
        Price: 10.3,
        PostTags: ["Samsung", "another tag"]
    },
    {
        PostID: "6",
        PostTitle: "Sixth product",
        PostDescription: "test desc",
        PostImage: PhotoOne,
        DateAdded: '01-01-2020',
        PostImagesList: [PhotoOne, PhotoTwo, PhotoSix, PhotoThree, PhotoFour, PhotoFive],
        Price: 10.3,
        PostTags: ["Samsung"]
    }

];
export default Posts;