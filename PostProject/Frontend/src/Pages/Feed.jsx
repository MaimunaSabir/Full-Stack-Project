
import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {

  const [posts, setposts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/feed")
      .then((res) => {
        setposts(res.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="outer">

      <h1 className="feed-title">FEED</h1>

      {
        posts.length > 0 ? (
          posts.map((post) => (
            <div className="con" key={post._id}>

              <img
                src={post.image}
                alt="Post"
              />
              
              <h2>{post.caption}</h2>
              

            </div>
          ))
        ) : (
          <h2 className="no-post">NO POST YET ..</h2>
        )
      }

    </div>
  );
};

export default Feed
