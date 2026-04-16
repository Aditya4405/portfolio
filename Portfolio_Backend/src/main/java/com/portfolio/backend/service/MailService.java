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

    @Value("${EMAILJS_SERVICE_ID:}")
    private String serviceId;

    @Value("${EMAILJS_ADMIN_TEMPLATE_ID:}")
    private String adminTemplateId;

    @Value("${EMAILJS_VISITOR_TEMPLATE_ID:}")
    private String visitorTemplateId;

    @Value("${EMAILJS_PUBLIC_KEY:}")
    private String publicKey;

    @Value("${EMAILJS_PRIVATE_KEY:}")
    private String privateKey;

    @Value("${ADMIN_EMAIL:adityaprajapati4405@gmail.com}")
    private String adminEmail;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

    public void sendToAdmin(ContactRequest request) {
        // Send notification to you (Admin)
        System.out.println("EmailJS: Sending Admin Notification using template: " + adminTemplateId);
        sendViaEmailJS(adminTemplateId, adminEmail, request.getFullName(), request.getEmail(), request.getSubject(), request.getMessage(), request.getFullName(), "Admin Notification");
    }

    public void sendConfirmation(String visitorEmail, String visitorName) {
        // Only send thank you mail if a separate template is provided
        if (visitorTemplateId != null && !visitorTemplateId.isEmpty() && !visitorTemplateId.equals(adminTemplateId)) {
            System.out.println("EmailJS: Sending Visitor Confirmation using template: " + visitorTemplateId);
            sendViaEmailJS(visitorTemplateId, visitorEmail, "Aditya Prajapati", adminEmail, "Thanks for reaching out!", "I have received your message and will get back to you soon.", visitorName, "Visitor Confirmation");
        } else {
            System.out.println("EmailJS: Skipping visitor confirmation as EMAILJS_VISITOR_TEMPLATE_ID is not set or same as admin template (" + visitorTemplateId + ")");
        }
    }

    private void sendViaEmailJS(String templateId, String toEmail, String fromName, String fromEmail, String subject, String message, String visitorName, String logPrefix) {
        if (templateId == null || templateId.isEmpty() || templateId.startsWith("template_xxx")) {
            System.err.println("EmailJS: Invalid or missing Template ID for " + logPrefix + ": " + templateId);
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
        
        // Aliases for common EmailJS template variables
        templateParams.put("user_name", fromName);
        templateParams.put("user_email", fromEmail);
        templateParams.put("name", (logPrefix.contains("Visitor")) ? visitorName : fromName); 
        templateParams.put("email", toEmail); 
        templateParams.put("contact_name", (logPrefix.contains("Visitor")) ? visitorName : fromName);
        templateParams.put("contact_email", fromEmail);
        templateParams.put("visitor_name", visitorName);
        
        body.put("template_params", templateParams);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(EMAILJS_URL, entity, String.class);
            System.out.println("EmailJS " + logPrefix + " [To: " + toEmail + "]: Success (" + response.getStatusCode() + ")");
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            String errorMsg = "EmailJS " + logPrefix + " Error: " + e.getResponseBodyAsString();
            System.err.println(errorMsg);
            throw new RuntimeException("Email delivery failed: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("EmailJS " + logPrefix + " Generic Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Generic email error: " + e.getMessage());
        }
    }
}
