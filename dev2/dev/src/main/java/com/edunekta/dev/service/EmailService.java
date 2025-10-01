package com.edunekta.dev.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Send a massive email to a list of recipients.
     * @param to List of recipient email addresses
     * @param subject Email subject
     * @param text Email body (plain text or HTML)
     * @param isHtml true if the body is HTML, false for plain text
     * @throws MessagingException if sending fails
     */
    public void sendMassiveEmail(List<String> to, String subject, String text, boolean isHtml) throws MessagingException {
        for (String recipient : to) {
            sendEmail(recipient, subject, text, isHtml);
        }
    }

    /**
     * Send a single email.
     */
    public void sendEmail(String to, String subject, String text, boolean isHtml) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("david.sansena1@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, isHtml);
        mailSender.send(message);
    }
}
