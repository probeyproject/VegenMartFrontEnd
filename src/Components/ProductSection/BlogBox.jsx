import React from "react";

const BlogBox = ({ imageUrl, blogLink, date, title }) => {
  return (
    <div className="blog-box">
      <div
        className="blog-box-image"
        tabIndex={0}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          height: "250px",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          display: "block",
        }}
      >
        <a href={blogLink}>
          <img
            src={imageUrl}
            className="bg-img blur-up lazyload"
            alt={title}
            style={{ display: "none" }}
          />
        </a>
      </div>
      <a href={blogLink} className="blog-detail" tabIndex={0}>
        <h6>{date}</h6>
        <h5>{title}</h5>
      </a>
    </div>
  );
};

export default BlogBox;
