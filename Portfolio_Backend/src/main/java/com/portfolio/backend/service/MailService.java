package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MailService {

    @Value("${RESEND_API_KEY}")
    private String resendApiKey;

    @Value("${GMAIL_USERNAME:adityaprajapati4405@gmail.com}")
    private String adminEmail;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String RESEND_URL = "https://api.resend.com/emails";

    public void sendConfirmation(String toEmail, String name) {
        String content = "Hi " + name + ",\n\n" +
                "Thanks for reaching out! I've received your message through my portfolio and will get back to you as soon as possible.\n\n" +
                "Best regards,\nAditya Prajapati";
        
        sendViaResend(toEmail, "Message Received!", content);
    }

    public void sendToAdmin(ContactRequest request) {
        String content = "New message from: " + request.getFullName() + " (" + request.getEmail() + ")\n\n" +
                "Subject: " + request.getSubject() + "\n\n" +
                "Message:\n" + request.getMessage();

        sendViaResend(adminEmail, "Portfolio Contact: " + request.getSubject(), content);
    }

    private void sendViaResend(String to, String subject, String text) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + resendApiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("from", "Aditya <onboarding@resend.dev>");
            body.put("to", to);
            body.put("subject", subject);
            body.put("text", text);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(RESEND_URL, entity, String.class);
            System.out.println("Resend Response: " + response.getBody());
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            System.err.println("Resend API Error: " + e.getResponseBodyAsString());
            throw e; // Re-throw to trigger the 500 for now so we can see it
        } catch (Exception e) {
            System.err.println("Generic Mail Error: " + e.getMessage());
            throw e;
        }
    }
}
