package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.service.MailService;
import com.portfolio.backend.service.QuotaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(
    originPatterns = "*", 
    allowCredentials = "true",
    allowedHeaders = "*"
)
public class ContactController {

    @Autowired
    private MailService mailService;

    @Autowired
    private QuotaService quotaService;

    @PostMapping("/send")
    public ResponseEntity<?> sendContactMessage(@Valid @RequestBody ContactRequest request) {
        // 1. Quota Check
        if (!quotaService.isAllowed(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Daily limit reached. Try again tomorrow.");
        }

        try {
            // 1. Send reaching out notification to Admin (This is most important)
            mailService.sendToAdmin(request);

            // 2. Try to send confirmation to user (Might fail on Resend free tier)
            try {
                mailService.sendConfirmation(request.getEmail(), request.getFullName());
            } catch (Exception e) {
                System.out.println("Wait: Resend free tier blocked visitor confirmation. Admin mail still sent.");
            }
            
            // 3. Increment Quota
            quotaService.increment(request.getEmail());

            return ResponseEntity.ok("Message sent successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server error while sending message. Please try again later.");
        }
    }
}
