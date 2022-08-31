import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import "./Reader.css";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const Reader = () => {
  let txt = useContext(context);
  let [detail, setDetail] = useState([]);

  useEffect(() => {
    if (txt.bookData !== "")
      fetch(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${txt.isbn}&jscmd=details&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setDetail(Object.values(data)[0].details);
          console.log(Object.values(data)[0].details);
          txt.setLoading(false);
        });
  }, []);

  return (
    <div className="detail-page">
      {txt.isLoading === true ? (
        <>
          <div className="overLay">
            <div>
              <Box id="loader" sx={{ display: "flex" }}>
                <CircularProgress sx={{ color: "White" }} />
                <div style={{ color: "white" }}>Loading...</div>
              </Box>
            </div>
          </div>
        </>
      ) : detail.length !== 0 ? (
        <div className="book-div">
          <div className="img_div">
            {detail.covers !== undefined ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${detail.covers}-L.jpg`}
                alt="Not Found"
                className="detail_img"
              />
            ) : (
              <img
                src="https://bitsofco.de/content/images/2018/12/broken-1.png"
                alt="not found"
                className="detail_img"
                height="40%"
              />
            )}
          </div>

          <div className="content_div">
            <em>An edition of {detail.title}</em>

            <h2>{detail.title}</h2>
            <div className="basic_desc">
              {detail.hasOwnProperty("authors") ? (
                <>
                  <p>by: {detail.authors[0].name}</p>
                </>
              ) : (
                ""
              )}
            </div>

            <h4 style={{ color: "dodgerblue" }}>Overview -&gt;</h4>
            <div className="info">
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  <strong>Publish Date</strong>
                </span>
                <br />
                {detail.hasOwnProperty("publish_date") ? (
                  <>
                    <div className="publishDate">
                      <span>{detail.publish_date}</span>
                    </div>
                  </>
                ) : (
                  "not found"
                )}
              </div>

              <div
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  <strong>Published by:</strong>
                </span>
                <br />
                {detail.hasOwnProperty("publishers") ? (
                  <>
                    <div className="publishDate">
                      <span>{detail.publishers}</span>
                    </div>
                  </>
                ) : (
                  "not found"
                )}
              </div>

              <div
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  <strong>Number of Pages:</strong>
                </span>
                <br />
                {detail.hasOwnProperty("number_of_pages") ? (
                  <>
                    <div className="publishDate">
                      <span>{detail.number_of_pages}</span>
                    </div>
                  </>
                ) : (
                  "not found"
                )}
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  width: "50%",
                  
                  padding: "1vw",
                }}
              >
                <strong>&gt; Latest Revision: </strong>&nbsp;
                {detail.hasOwnProperty("latest_revision") ? (
                  <>
                    
                      <span>{detail.latest_revision}</span>
                    
                  </>
                ) : (
                  ""
                )}
                <br />
                <br />
                <h4 style={{ color: "dodgerblue" }}>
                  The Physical Apperance -&gt;
                </h4>
                <strong>&gt; Pagination:</strong>&nbsp;
                {detail.hasOwnProperty("pagination") ? (
                  <>
                    <span>{detail.pagination}</span>
                  </>
                ) : (
                  "N.A."
                )}
                <br />
                <strong>&gt; Number of Pages:</strong>&nbsp;
                {detail.hasOwnProperty("number_of_pages") ? (
                  <>
                    <span>{detail.number_of_pages}</span>
                  </>
                ) : (
                  "N.A."
                )}
                <br/>
                <br />

                <h4 style={{color:'dodgerblue'}}>IDs -&gt;</h4>


              </div>

              <div style={{ width: "50%", padding: "1vw" }}>

                  <strong style={{color:'dodgerblue'}}>Subjects: </strong>
                    {
                      // detail.hasOwnProperty('')
                    }
                  <br/>

                  <strong style={{color:'dodgerblue'}}>People: </strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="err">
            <h1>
              <span style={{ fontSize: "5vw" }}>\_(ツ)_/</span> <br /> ERROR
              404, Not Found!
            </h1>
            <br />
            <br />
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button variant="contained" id="goBackFromErr">
                SEARCH AGAIN
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Reader;
