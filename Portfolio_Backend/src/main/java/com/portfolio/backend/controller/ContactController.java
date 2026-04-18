package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.service.MailService;
import com.portfolio.backend.service.QuotaService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(
    origins = "https://aditya-prajapati.vercel.app", 
    allowCredentials = "true",
    allowedHeaders = "*"
)
public class ContactController {

    @Autowired
    private MailService mailService;

    @Autowired
    private QuotaService quotaService;

    @PostMapping("/send")
    public ResponseEntity<?> sendContactMessage(@Valid @RequestBody ContactRequest request, HttpServletRequest httpRequest) {
        String clientIp = getClientIp(httpRequest);
        
        // 1. Quota Check (By IP)
        if (!quotaService.isAllowed(clientIp)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Daily limit reached for your IP. Try again tomorrow.");
        }

        try {
            // 2. Send reaching out notification to Admin
            mailService.sendToAdmin(request);

            // 3. Try to send confirmation to user
            mailService.sendConfirmation(request.getEmail(), request.getFullName());
            
            // 4. Increment Quota (By IP)
            quotaService.increment(clientIp);

            return ResponseEntity.ok("Message sent successfully!");
            
        } catch (RuntimeException e) {
            String message = e.getMessage();
            if (message != null && message.contains("Email delivery failed")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Invalid email address. Please check and try again.");
            }
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Mail service error. Please try again later.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server error while sending message. Please try again later.");
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            // X-Forwarded-For can be a comma-separated list of IPs. The first one is the client.
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
