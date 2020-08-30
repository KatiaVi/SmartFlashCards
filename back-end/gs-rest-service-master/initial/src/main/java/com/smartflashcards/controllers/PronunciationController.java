package com.smartflashcards.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.smartflashcards.helpers.PronunciationClient;

@RestController
public class PronunciationController {
        
    @Autowired
    private PronunciationClient pronunciationClient;

	@GetMapping("/v1/pronunciation")
    public void downloadPronunciation(
        @RequestParam(value="source") String source, 
        @RequestParam(value="language") String language
    ) {
        try {
            pronunciationClient.downloadPronunciationFile(source, language);
        } catch (Exception e) {
            System.out.println("Couldn't retrieve user. Due to " + e);
        }
    }
}