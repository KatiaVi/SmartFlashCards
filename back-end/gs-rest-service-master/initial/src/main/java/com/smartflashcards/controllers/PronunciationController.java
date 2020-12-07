package com.smartflashcards.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.smartflashcards.helpers.LanguageCodeConvertor;
import com.smartflashcards.helpers.PronunciationClient;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PronunciationController {
        
    @Autowired
    private PronunciationClient pronunciationClient;

    @Autowired 
    private LanguageCodeConvertor languageCodeConvertor;

	@GetMapping("/v1/pronunciation")
    public void downloadPronunciation(
        @RequestParam(value="source") String source, 
        @RequestParam(value="language") String language
    ) {
        try {
            String languageCode = languageCodeConvertor.convertToPronunciationLanguageCode(language);
            pronunciationClient.downloadPronunciationFile(source, languageCode);
        } catch (Exception e) {
            System.out.println("Couldn't retrieve user. Due to " + e);
        }
    }
}