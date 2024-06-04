package com.example.demo.utils;
import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.model.entities.User;
import com.example.demo.services.UserService;

import jakarta.servlet.http.HttpServletResponse;
@Configuration
@EnableWebSecurity

public class WebSecurityConfiguration {

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JWTTokenFilter filter;
	

	@Bean
	AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
	    AuthenticationManagerBuilder managerBuilder 
	    	= http.getSharedObject(AuthenticationManagerBuilder.class);
	    
	    managerBuilder
	    	.userDetailsService(identifier -> {
	    		User user = userService.getUserByUsername(identifier);
	    		
	    		if(user == null)
	    			throw new UsernameNotFoundException("User: " + identifier + ", not found!");
	    		
	    		return user;
	    	})
	    	.passwordEncoder(passwordEncoder);
	    
	    return managerBuilder.build();
	}
	
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.cors().and() // Habilitar la configuración CORS
			.httpBasic(withDefaults())
			.csrf().disable()
			.authorizeRequests(auth -> auth
				.requestMatchers("/user/**").permitAll()
				.requestMatchers("/evento/all").permitAll()
				.requestMatchers("/evento/buscarEventos").permitAll()
				.requestMatchers("/email/sendEmail").permitAll()
				.requestMatchers("/evento/getSingleEvent").permitAll()
				.requestMatchers("/lugares/getLocalidad").permitAll()
				.requestMatchers("/ubicacion/**").permitAll()
				.anyRequest().authenticated()
			)
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.exceptionHandling().authenticationEntryPoint((req, res, ex) -> {
				res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Auth fail!");
			})
			.and()
			.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}


}
