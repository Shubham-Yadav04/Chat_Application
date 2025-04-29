package com.shubham.chat_server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceivedMessage {

    private String receiverName;
    private String senderName;
    private String content;
    private String roomId;
}
