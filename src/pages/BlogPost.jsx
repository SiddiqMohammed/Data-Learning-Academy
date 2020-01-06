import React, { useEffect, useState } from "react";
import storage from "local-storage-fallback";
import Markdown from "markdown-to-jsx";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import {
  blogPost,
  blogPostBackground,
  box,
  socialMediaButtonBackground,
  socialMediaButtonBackgroundDark,
  blogPostDark
} from "../stylesheets/BlogPost.module.sass";
import ImageCarousel from "../components/ImageCarousel";
import { folders, mapFileNameToId } from "../utils/FileManager.utils";
import SocialMediaBar from "../components/Footer/SocialMediaBar";

import Signature from "../data/images/signature.svg";
import { signature } from "../stylesheets/components/Footer.module.sass";

const blogNavbar = require("../data/blogNavbar");
const footer = require("../data/footer");

const getInitialTheme = () => {
  const savedTheme = storage.getItem("theme");
  return savedTheme === 'true';
};

const BlogPost = ({ match }) => {
  const [post, setPost] = useState("");
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    window.scrollTo(0, 0);

    storage.setItem("theme", isDark.toString());

    fetch(`/static/media/${mapFileNameToId(match.params.blogPost, folders.blogFiles)}`)
      .then(res => res.text())
      .then(response => setPost(response))
      .catch(err => setPost(err));
  }, [match.params.blogPost, isDark]);

  return (
    <div className={`${isDark ? blogPostDark : null} ${blogPost}`}>
      <Container className={`col-lg-6 col-md-8 py-4 rounded-top  ${blogPostBackground}`}>
        <div className="py-lg-5 pb-4 pt-2 row justify-content-between">
          <Link to={blogNavbar.blogLink} className={box}>
            {blogNavbar.goBackLabel}
          </Link>
          <button onClick={_ => setIsDark(!isDark)}>{isDark ? "Dark" : "Light"}</button>
          <Link to={blogNavbar.homeLink} className={box}>
            {blogNavbar.homeLabel}
          </Link>
        </div>

        <Markdown
          options={{
            overrides: {
              ImageCarousel: {
                component: ImageCarousel
              }
            }
          }}
        >
          {post}
        </Markdown>
        <hr />
        <Row className="text-center">
          <div className="col-md-4 pb-md-0 pb-3">
            <span>{footer.title}</span>
            <br />
            <img
              src={Signature}
              alt="signature"
              className={`img-responsive img-centered ${signature}`}
            />
          </div>
          <div className="col-md-8 my-auto px-0">
            <SocialMediaBar
              socialMediaLinks={footer.socialMediaLinks}
              buttonBackground={isDark ? socialMediaButtonBackgroundDark : socialMediaButtonBackground}
            />
          </div>
        </Row>
      </Container>
    </div>
  );
};

BlogPost.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      blogPost: PropTypes.string.isRequired
    })
  }).isRequired
};

export default BlogPost;
