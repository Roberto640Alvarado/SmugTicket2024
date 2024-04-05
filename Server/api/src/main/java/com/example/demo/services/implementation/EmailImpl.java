package com.example.demo.services.implementation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.services.EmailService;
@Service
public class EmailImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;



    @Override
    public void EnviarEmail(String to, String subject, String text) {
        try {
                    SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(to);
        mensaje.setSubject(subject);
        mensaje.setText(text);
        mailSender.send(mensaje);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
}
