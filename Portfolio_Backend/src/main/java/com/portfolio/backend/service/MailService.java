package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String adminEmail;

    public void sendConfirmation(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Message Received!");
        message.setText("Hi " + name + ",\n\n" +
                "Thanks for reaching out! I've received your message through my portfolio and will get back to you as soon as possible.\n\n" +
                "This is an automated response. You don't need to reply to this email.\n\n" +
                "Best regards,\n" +
                "Aditya Prajapati");
        mailSender.send(message);
    }

    public void sendToAdmin(ContactRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(adminEmail);
        message.setSubject("Portfolio Contact: " + request.getSubject());
        message.setText("New message from: " + request.getFullName() + " (" + request.getEmail() + ")\n\n" +
                "Subject: " + request.getSubject() + "\n\n" +
                "Message:\n" +
                request.getMessage());
        mailSender.send(message);
    }
}
