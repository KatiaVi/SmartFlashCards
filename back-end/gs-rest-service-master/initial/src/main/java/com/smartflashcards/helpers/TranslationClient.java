package com.smartflashcards.helpers;

import org.springframework.stereotype.Component;

import java.io.*;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

@Component
public class TranslationClient {
    private static String subscriptionKey = System.getenv("TRANSLATOR_TEXT_SUBSCRIPTION_KEY");
    private static String endpoint = System.getenv("TRANSLATOR_TEXT_ENDPOINT");
    private OkHttpClient client;

    public TranslationClient() {
        client = new OkHttpClient();
    }

    // Retrieve Translation from Microsoft Translate client
    public String Post(String source, String language) throws IOException {
        String url = endpoint + "translate?api-version=3.0&to=" + language;
        System.out.println(url);
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType,
                "[{\n\t\"Text\": \"" + source + "\"\n}]");
        System.out.println("[{\n\t\"Text\": \"" + source + "\"\n}]");
        Request request = new Request.Builder()
                .url(url).post(body)
                .addHeader("Ocp-Apim-Subscription-Key", subscriptionKey)
                .addHeader("Ocp-Apim-Subscription-Region", "eastus")
                .addHeader("Content-type", "application/json").build();
        Response response = client.newCall(request).execute();
        String responseStr = response.body().string();
        String translation = prettify(responseStr);
        return translation;
    }

    // This function prettifies the json response.
    public String prettify(String json_text) {
        JsonParser parser = new JsonParser();
        JsonElement json = parser.parse(json_text);
        JsonArray jsonArr = json.getAsJsonArray();
        JsonObject jsonObject = jsonArr.get(0).getAsJsonObject();
        JsonArray translationsArray = jsonObject.getAsJsonArray("translations");
        jsonObject = translationsArray.get(0).getAsJsonObject();

        String translation = jsonObject.get("text").getAsString().toLowerCase();
        return translation;
    }
}