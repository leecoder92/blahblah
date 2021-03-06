package com.ssafy.blahblah.api.response.notice;

import com.ssafy.blahblah.db.entity.Qna;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MyQnaDetailRes {
    Long id;
    String title;
    String content;
    LocalDateTime createdAt;
    String imgUrl;
    String answer;
    String userName;

    public MyQnaDetailRes(Qna qna) {
        this.id = qna.getId();
        this.title = qna.getTitle();
        this.content = qna.getContent();
        this.createdAt = qna.getCreatedAt();
        this.imgUrl = qna.getImgUrl();
        this.answer = qna.getAnswer();
        this.userName = qna.getUser().getName();
    }
}
