import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import "./Home.css";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

var isbn;
const Home = () => {
  const navigate = useNavigate();

  const txt = useContext(context);
  let [datas, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://openlibrary.org/search.json?q=${txt.book}&mode=ebooks&has_fulltext=true&limit=10`
    )
      .then((response) => response.json())
      .then((res) => {
        setData(res.docs);
        txt.setLoading(false);
      });
  }, []);

  const readMore = (event) => {
    isbn = event.target.name;
    if (isbn !== "") {
      txt.setIsbn(isbn);
      navigate("/reader");
    }
  };

  

  return (
    <div className="mainContainer">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "4vh",
          }}
        >
          <h1 className="searchResHead">Search Result</h1>
         
        </div>
        {txt.isLoading === true ? (
          <div className="overLay">
            <div>
              <Box id="loader" sx={{ display: "flex" }}>
                <CircularProgress sx={{ color: "White" }} />
                <div style={{ color: "white" }}>Loading...</div>
              </Box>
            </div>
          </div>
        ) : datas !== "" ? (
          datas.map((val, i) => {
            if (val.hasOwnProperty("isbn")) {
              return (
                <div key={i} className="card">
                  <div className="card-image">
                    <img
                      src={`https://covers.openlibrary.org/b/olid/${val.cover_edition_key}.jpg`}
                      width="100%"
                      height="100%"
                      alt=""
                    />
                  </div>
                  <div className="card-content">
                    <h4>{val.title}</h4>
                    <p>
                      <b>by:</b>{" "}
                      <span className="authorName">
                        {" " + val.author_name + " "}
                      </span>
                    </p>
                    <span className="firstPublished">
                      <b>First Published In:</b> {val.first_publish_year}
                    </span>
                    <br />
                    <span>
                      {val.edition_count} <b>editions</b>
                    </span>
                    &nbsp;
                    <span>
                      in{" "}
                      {val.language !== undefined ? val.language.length : "0"}{" "}
                      <b>
                        {val.language !== undefined && val.language.length < 2
                          ? "language"
                          : "languages"}
                      </b>
                    </span>
                    <span>
                      {" "}
                      -- {val.ebook_count_i} <b>previewables</b>
                    </span>
                    <br />
                    <span>
                      {val.ia.map((src, ind) => {
                        if (ind < 10) {
                          return (
                            <img
                              src={`https://archive.org/services/img/${src}`}
                              alt=""
                              width="8%"
                              height="20%"
                            />
                          );
                        }
                        return "";
                      })}
                    </span>
                  </div>

                  <div className="btnSet">
                    <Button
                      variant="contained"
                      name={val.isbn !== "" ? `${val.isbn[0]}` : ""}
                      onClick={readMore}
                    >
                      Know More <ReadMoreIcon />
                    </Button>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <>
            <div className="err">
              <h1>
                <span style={{ fontSize: "5vw" }}>\_(ツ)_/</span> <br /> ERROR
                404, Not Found!
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
