package com.ssafy.blahblahchat.api.controller;


import com.ssafy.blahblahchat.api.dto.MessageDTO;
import com.ssafy.blahblahchat.api.entity.ChatMeta;
import com.ssafy.blahblahchat.api.entity.Message;
import com.ssafy.blahblahchat.api.service.ChatService;
import com.ssafy.blahblahchat.api.service.MessageService;
import com.ssafy.blahblahchat.common.auth.JwtAuthentication;
import com.ssafy.blahblahchat.common.auth.SsafyUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import java.util.List;


// Topic Subscribe 방식, STOMP 프로토콜
@Controller
@RequiredArgsConstructor
@Log4j2
public class StompChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final MessageService messageService;
    private final JwtAuthentication jwtAuthentication;

    @MessageMapping(value = "/list") //로그인하면 구독 상태, 자기 채팅 리스트를 받아와야함
    public void enter(@Header(name="Authorization", required=false) String token) throws Exception {
        Long userId = getUserIdByToken(token);
        List<ChatMeta> chatList= chatService.findChatListByUserId(userId);
        log.debug("userId:{} listCnt:{}",userId,chatList.size());
        template.convertAndSend("/topic/list/"+userId,chatList);
    }

    @MessageMapping("/send/{opponentId}/to-other")
    public void sendToOther(@Header(name="Authorization", required=false) String token, MessageDTO messageDTO, @DestinationVariable String opponentId) throws Exception {
        Long userId = getUserIdByToken(token);
        log.debug("StompChatController.sendToOther");
        log.debug("senderId: {} receiverId:{}",userId,messageDTO.getReceiverId());

        Message saveMessage=messageService.saveMessage(messageDTO);
        saveMessage.setContent(messageDTO.getContent());
        //채팅이 오가면 MySql에 저장된 채팅 리스트 메타 정보를 바꿔줘야함
        chatService.updateList(Long.parseLong(messageDTO.getSenderId()),Long.parseLong(opponentId),messageDTO.getReceiverName(),saveMessage);
        chatService.updateList(Long.parseLong(opponentId),Long.parseLong(messageDTO.getSenderId()),messageDTO.getSenderName(),saveMessage);
        template.convertAndSend("/topic/"+opponentId, messageDTO);
    }

    @MessageMapping("/send/to-me")
    public void sendToMe(@Header(name="Authorization", required=false) String token,MessageDTO messageDTO) throws Exception {
        Long userId = getUserIdByToken(token);
        template.convertAndSend("/topic/"+userId, messageDTO);

    }

    @MessageMapping("/read/{opponentId}")
    public void readMsg(@Header(name="Authorization", required=false) String token,@DestinationVariable String opponentId) throws Exception {
        Long userId = getUserIdByToken(token);
        chatService.updateLastRead(userId,Long.parseLong(opponentId));
        List<ChatMeta> chatList= chatService.findChatListByUserId(userId);
        template.convertAndSend("/topic/list/"+userId,chatList);
    }

    private Long getUserIdByToken(String token) throws Exception{
        Authentication authentication=jwtAuthentication.getAuthentication(token);
        if(authentication!=null) {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            return userDetails.getUserId();
        }else{
            return -1L;
        }
    }

}
