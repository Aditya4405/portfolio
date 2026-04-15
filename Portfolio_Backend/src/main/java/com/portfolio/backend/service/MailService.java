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

    @Value("${EMAILJS_TEMPLATE_ID}")
    private String templateId;

    @Value("${EMAILJS_PUBLIC_KEY}")
    private String publicKey;

    @Value("${EMAILJS_PRIVATE_KEY}")
    private String privateKey;

    @Value("${ADMIN_EMAIL:adityaprajapati4405@gmail.com}")
    private String adminEmail;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

    public void sendToAdmin(ContactRequest request) {
        sendViaEmailJS(request);
    }

    // EmailJS handles both admin notification and auto-reply within its own template system
    public void sendConfirmation(String toEmail, String name) {
        // With EmailJS, the auto-reply is usually configured inside the EmailJS dashboard 
        // as an 'Auto-Reply' or triggered by the same template. 
        // We just need to make sure the API call is successful.
    }

    private void sendViaEmailJS(ContactRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("service_id", serviceId);
        body.put("template_id", templateId);
        body.put("user_id", publicKey);
        body.put("accessToken", privateKey);

        Map<String, String> templateParams = new HashMap<>();
        templateParams.put("name", request.getFullName());
        templateParams.put("email", request.getEmail());
        templateParams.put("to_email", adminEmail);
        templateParams.put("subject", request.getSubject());
        templateParams.put("message", request.getMessage());
        // Ensure these keys match the {{variables}} in your EmailJS template!
        
        body.put("template_params", templateParams);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(EMAILJS_URL, entity, String.class);
            System.out.println("EmailJS Success: " + response.getBody());
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            System.err.println("EmailJS Error Status: " + e.getStatusCode());
            System.err.println("EmailJS Error Response: " + e.getResponseBodyAsString());
            throw e;
        } catch (Exception e) {
            System.err.println("EmailJS Generic Error: " + e.getMessage());
            throw e;
        }
    }
}
