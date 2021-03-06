package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.LangInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Transactional
@Repository
public interface LangInfoRepository extends JpaRepository<LangInfo, Long> {
    LangInfo findByUserId(Long userId);
    LangInfo findByLevel(Integer level);
    List<LangInfo> findListByUserId(Long userId);
    void deleteAllByUserId(Long userId);
}