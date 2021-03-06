package com.ssafy.blahblahchat.api.repository;


import com.ssafy.blahblahchat.api.entity.ChatMeta;
import com.ssafy.blahblahchat.api.entity.Message;
import lombok.extern.log4j.Log4j2;
import com.ssafy.blahblahchat.common.encryption.Seed;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.*;

@Repository
@Log4j2
@RequiredArgsConstructor
public class ChatRepository {

    @PersistenceContext
    EntityManager em;

      private final Seed seed;

    public String createChat(ChatMeta chatMeta){
        em.persist(chatMeta);
        return chatMeta.getRoomId();
    }

    public String findChat(long userId, long opponentId){
        try {
            ChatMeta chat = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatMeta.class)
                    .setParameter("userId", userId)
                    .setParameter("opponentId", opponentId)
                    .getSingleResult();
            return chat.getRoomId();
        } catch (NoResultException e){
                return "No Result";
        }
    }

    public String updateChatList(long userId, long opponentId, Message message){
        try {
            ChatMeta target = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatMeta.class)
                    .setParameter("userId", userId)
                    .setParameter("opponentId", opponentId)
                    .getSingleResult();
            target.setLastMsgDate(message.getCreatedAt());
            int lastMagLength=message.getContent().length();
            if(lastMagLength>20)
                target.setLastMsg(message.getContent().substring(0,18));
            else
                target.setLastMsg(message.getContent());
            if(userId!=Long.parseLong(message.getSenderId()))
                target.setUnread(target.getUnread()+1);
            else
                target.setUnread(0);
            target.setType(message.getType());
            return "Success";
        } catch (NoResultException e){
            return "No Result";
        }
    }

    public String updateLastRead(long userId, long opponentId){
        try {
            ChatMeta target = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatMeta.class)
                    .setParameter("userId", userId)
                    .setParameter("opponentId", opponentId)
                    .getSingleResult();
           target.setLastReadDate(LocalDateTime.now());
           target.setUnread(0);
            return "Success";
        } catch (NoResultException e){
            return "No Result";
        }
    }


    public List<ChatMeta> findChatListByUserId(long userId){
        try {
            List<ChatMeta> chatList = em.createQuery("select c from chat_list c where c.userId=:userId order by c.lastMsgDate DESC", ChatMeta.class)
                    .setParameter("userId", userId)
                    .getResultList();
            return chatList;
        } catch (NoResultException e){
            return null;
        }
    }
}
