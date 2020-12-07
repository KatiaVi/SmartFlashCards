package com.smartflashcards.controllers;

import com.smartflashcards.helpers.TranslationClient;
import com.smartflashcards.objects.Translation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TranslationController {
        
    @Autowired
    private TranslationClient translationClient;

	@GetMapping("/v1/translation")
    public Translation getTranslation(
        @RequestParam(value="source") String source, 
        @RequestParam(value="language") String language
    ) {
        Translation translation;
        try {
            // Todo call Google API to retrieve the translation for the source
            String translated = translationClient.Post(source, language);
            translation = new Translation(translated);
            return translation;
        } catch (Exception e) {
            System.out.println("Couldn't retrieve translation. Due to " + e);
            return null;
        }
    }
}