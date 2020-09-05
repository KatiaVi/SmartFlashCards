package com.smartflashcards.helpers;

import java.util.*;

import org.springframework.stereotype.Component; 

@Component
public class LanguageCodeConvertor {
    Map<String, String> translationToPronunciation = new HashMap<String, String>();
    public LanguageCodeConvertor(){
        translationToPronunciation.put("ar", "ar-XA");
        translationToPronunciation.put("bn", "bn-IN");
        translationToPronunciation.put("zh-Hans", "cmn-CN"); // Mandarin Chinese
        translationToPronunciation.put("cs", "cs-CZ");
        translationToPronunciation.put("da", "da-DK");
        translationToPronunciation.put("nl", "nl-NL");
        translationToPronunciation.put("en", "en-GB");
        translationToPronunciation.put("fil", "fil-PH");
        translationToPronunciation.put("fi", "fi-FI");
        translationToPronunciation.put("fr", "fr-FR");
        translationToPronunciation.put("de", "de-DE");
        translationToPronunciation.put("el", "el-GR");
        translationToPronunciation.put("gu", "gu-IN");
        translationToPronunciation.put("hi", "hi-IN");
        translationToPronunciation.put("hu", "hu-HU");
        translationToPronunciation.put("id", "id-ID");
        translationToPronunciation.put("it", "it-IT");
        translationToPronunciation.put("ja", "ja-JA");
        translationToPronunciation.put("kn", "kn-IN");
        translationToPronunciation.put("ko", "ko-KR");
        translationToPronunciation.put("ml", "ml-IN");
        translationToPronunciation.put("nb", "nb-NO");
        translationToPronunciation.put("pl", "pl-PL");
        translationToPronunciation.put("pt-pt", "pt-PT"); // Portuguese (Portugal)
        translationToPronunciation.put("ru", "ru-RU");
        translationToPronunciation.put("sk", "sk-SK");
        translationToPronunciation.put("es", "es-ES");
        translationToPronunciation.put("sv", "sv-SE");
        translationToPronunciation.put("ta", "ta-IN");
        translationToPronunciation.put("te", "te-IN");
        translationToPronunciation.put("th", "th-TH");
        translationToPronunciation.put("tr", "tr-TR");
        translationToPronunciation.put("uk", "uk-UA");
        translationToPronunciation.put("vi", "vi-VN");
    }

    public String convertToPronunciationLanguageCode(String languageCode) {
        return translationToPronunciation.get(languageCode);
    }
}