import { Grid, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import allAxios from "../../lib/allAxios";
export default function QnaWrite() {
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const write = () => {
    allAxios
      .post(
        `qna/`,
        {
          content: content,
          title: title,
        },
        {
          headers: setToken(),
        }
      )
      .then(() => {
        window.location.replace("/qna");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Image
          priority
          src="/images/notice.PNG"
          alt="notice2 image"
          width="200"
          height="40"
          layout="responsive"
        />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h3 className="text-center">제목</h3>
          </Grid>
          <Grid item xs={9}>
            <textarea
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
              placeholder="제목을 입력해주세요."
              style={{ width: "80%" }}
            />
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h3 className="text-center">문의 내용</h3>
          </Grid>
          <Grid item xs={9}>
            <textarea
              onChange={(e: any) => {
                setContent(e.target.value);
              }}
              placeholder="문의 내용을 작성해주세요"
              style={{ minHeight: 300, width: "80%" }}
            />
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <div className="m">
          <Button variant="contained" disabled>
            취소
          </Button>{" "}
          <Button variant="contained" onClick={write}>
            작성
          </Button>
        </div>
        <Grid item xs={2} />
      </Grid>
      <style jsx>
        {`
          .m {
            width: 200px;
            margin: 0 auto;
          }
        `}
      </style>
    </Grid>
  );
}