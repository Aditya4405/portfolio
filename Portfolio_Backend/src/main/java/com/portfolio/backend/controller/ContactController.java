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
    origins = {"http://localhost:5173", "https://*.vercel.app"}, // Replace with your exact Vercel URL later for tighter security
    allowCredentials = "true"
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
            // 2. Real Email Validation (Attempt to send confirmation email first)
            mailService.sendConfirmation(request.getEmail(), request.getFullName());
            
            // 3. Send to Admin
            mailService.sendToAdmin(request);
            
            // 4. Increment Quota
            quotaService.increment(request.getEmail());

            return ResponseEntity.ok("Message sent successfully!");
            
        } catch (Exception e) {
            // If confirmation email fails, treat the sender email as invalid/undeliverable
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Please enter a real valid email address.");
        }
    }
}
