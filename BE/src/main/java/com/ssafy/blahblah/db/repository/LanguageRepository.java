package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    Language findByCode(String code);
    Language findByEngName(String engName);
}