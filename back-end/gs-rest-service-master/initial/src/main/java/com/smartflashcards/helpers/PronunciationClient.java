package com.smartflashcards.helpers;

import com.google.cloud.texttospeech.v1beta1.AudioConfig;
import com.google.cloud.texttospeech.v1beta1.AudioEncoding;
import com.google.cloud.texttospeech.v1beta1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1beta1.SynthesisInput;
import com.google.cloud.texttospeech.v1beta1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1beta1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1beta1.VoiceSelectionParams;
import com.google.protobuf.ByteString;
import java.io.FileOutputStream;
import java.io.File;
import java.io.OutputStream;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import org.springframework.stereotype.Component;

@Component
public class PronunciationClient {
    private static TextToSpeechClient textToSpeechClient;
    
    public PronunciationClient() {
        try {
            textToSpeechClient = TextToSpeechClient.create();
        } catch (Exception e) {
            System.out.println("Failed to initialize pronunciation client due to " + e);
            textToSpeechClient = null;
        }
    }

    public String createPronunciation(String source, String translation, String languageCode) throws Exception {
            // Set the text input to be synthesized
            SynthesisInput input = SynthesisInput.newBuilder().setText(translation).build();

            VoiceSelectionParams voice =
                VoiceSelectionParams.newBuilder()
                    .setLanguageCode(languageCode)
                    .setSsmlGender(SsmlVoiceGender.FEMALE)
                    .build();

            // Select the type of audio file you want returned
            AudioConfig audioConfig =
                AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();

            // Perform the text-to-speech request on the text input with the selected voice parameters and
            // audio file type
            SynthesizeSpeechResponse response =
                textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

            // Get the audio contents from the response
            ByteString audioContents = response.getAudioContent();

            // Write the response to the output file.
            String outputFileName = source + "-" + languageCode + ".mp3";
            try (OutputStream out = new FileOutputStream(outputFileName)) {
                out.write(audioContents.toByteArray());
                System.out.println("Audio content written to file " + outputFileName);
                saveAudioFileToS3Bucket(outputFileName);
            }
            return outputFileName;
    }

    public void downloadPronunciationFile(String source, String languageCode) {
        String fileName = source + "-" + languageCode + ".mp3";
        loadAudioFileFromS3Bucket(fileName);
    }

    public void saveAudioFileToS3Bucket(String outputFileName){
        try {
            String uploadItemCommand = "aws s3 cp " + outputFileName + " s3://pronunciations-smart-flash-cards/";
            Runtime.getRuntime().exec(uploadItemCommand);
        } catch (Exception e) {
            System.out.println("Couldn't upload pronunciation item to s3 bucket due to " + e);
        }
    }

    public void loadAudioFileFromS3Bucket(String fileName){
        try {
            String downloadItemCommand = "aws s3 cp s3://pronunciations-smart-flash-cards/"+fileName + " ./";
            Runtime.getRuntime().exec(downloadItemCommand);
        } catch (Exception e) {
            System.out.println("Couldn't download pronunciation item to s3 bucket due to " + e);
        } 
    }
}