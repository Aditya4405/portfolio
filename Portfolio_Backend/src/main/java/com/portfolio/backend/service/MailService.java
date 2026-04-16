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

    @Value("${EMAILJS_SERVICE_ID}")
    private String serviceId;

    @Value("${EMAILJS_ADMIN_TEMPLATE_ID:${EMAILJS_TEMPLATE_ID}}")
    private String adminTemplateId;

    @Value("${EMAILJS_VISITOR_TEMPLATE_ID:${EMAILJS_TEMPLATE_ID}}")
    private String visitorTemplateId;

    @Value("${EMAILJS_PUBLIC_KEY}")
    private String publicKey;

    @Value("${EMAILJS_PRIVATE_KEY}")
    private String privateKey;

    @Value("${ADMIN_EMAIL:adityaprajapati4405@gmail.com}")
    private String adminEmail;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

    public void sendToAdmin(ContactRequest request) {
        sendViaEmailJS(adminTemplateId, adminEmail, request.getFullName(), request.getEmail(), request.getSubject(), request.getMessage(), "New Contact Message");
    }

    public void sendConfirmation(String toEmail, String name) {
        sendViaEmailJS(visitorTemplateId, toEmail, "Aditya Prajapati", "adityaprajapati4405@gmail.com", "Thanks for reaching out!", "I have received your message and will get back to you soon.", "Confirmation");
    }

    private void sendViaEmailJS(String templateId, String toEmail, String fromName, String fromEmail, String subject, String message, String logPrefix) {
        if (templateId == null || templateId.isEmpty()) {
            System.err.println("EmailJS: Template ID is missing for " + logPrefix);
            return;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("service_id", serviceId);
        body.put("template_id", templateId);
        body.put("user_id", publicKey);
        body.put("accessToken", privateKey);

        Map<String, String> templateParams = new HashMap<>();
        templateParams.put("to_email", toEmail);
        templateParams.put("from_name", fromName);
        templateParams.put("from_email", fromEmail);
        templateParams.put("reply_to", fromEmail);
        templateParams.put("subject", subject);
        templateParams.put("message", message);
        templateParams.put("name", fromName); // Support different template variable names
        templateParams.put("email", fromEmail);
        
        body.put("template_params", templateParams);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(EMAILJS_URL, entity, String.class);
            System.out.println("EmailJS " + logPrefix + " Success: " + response.getBody());
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            System.err.println("EmailJS " + logPrefix + " Error Status: " + e.getStatusCode());
            System.err.println("EmailJS " + logPrefix + " Error Response: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("EmailJS " + logPrefix + " Generic Error: " + e.getMessage());
        }
    }
}
