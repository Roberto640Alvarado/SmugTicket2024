package com.example.demo.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.demo.model.entities.User;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTtools {
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.exptime}")
	private Integer exp;
	public String generateToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		
		return Jwts.builder()
			.addClaims(claims)
			.setSubject(user.getUsername())
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis() + exp))
			.signWith(Keys.hmacShaKeyFor(secret.getBytes()))
			.compact();
	}
	
	public Boolean verifyToken(String token) {
		try {
			JwtParser parser = Jwts.parserBuilder()
					.setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
					.build();
				
			parser.parse(token);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}		
	}
	
	public String getUsernameFrom(String token) {
		try {
			JwtParser parser = Jwts.parserBuilder()
					.setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
					.build();
				
			return parser.parseClaimsJws(token)
					.getBody()
					.getSubject();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}		
	}
}
