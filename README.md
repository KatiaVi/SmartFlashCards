# SmartFlashCards

Smart FlashCards is a web application that lets you quickly create and practice virtual flashcards for language learning. It does so by automatically generating translations and pronunciation audio for the words/phrases the user wants to learn. Currently, Smart FlashCards supports over 10 languages (including Hindi, German, Japanese, Korean, Russian, Spanish and others).

## Motivation
Quarantine resulted in me trying a lot of new things, including trying to learn Korean. While learning, I created regular flashcards to practice new vocab. One thing that I wished I could do was also hear the correct pronunciation of the words when practicing, since Korean uses a different alphabet from English and has sounds that I wasn't yet used to. Queue Smart Flashcards!

## Who would use this?
Interested language learners who want to learn the basic vocabulary of a new language. This is especially targetted for learners who:
1. Want to hear the words/phrases they are learning
2. Want to get started quickly, without the added cost of googling a translation/update the language of their keyboard

Ex: Someone who is going on vacation to Germany and would like to learn some basic words/phrases. Smart Flashcards will help them create a deck with all those phrases/words quickly. When practicing their deck, the vacationer will start to familiarize themselves with both how the word is written and spoken, helping really solidify what they're learning.

## Walkthrough (German Vacationer Example, let's name her Anne)
1. Anne visits the homepage and fills out some info to get her unique learning space link.
![Main](https://github.com/KatiaVi/SmartFlashCards/blob/master/MainPage.png)
![Onboard](https://github.com/KatiaVi/SmartFlashCards/blob/master/UserOnboard.png)

2. After receiving an email with the link, Anne uses the link to get to Anne's learning space. There she gets started by creating a deck for some basic German words/phases.

Video with walkthrough for steps 3-7: https://youtu.be/W6AXKTgKVl8

3. Clicking to view the cards in her new deck, Anne is redirected to the Deck page where she can add some German cards.
4. Anne creates her first card for the phrase `Good Morning`. All she needs to do is enter the phrase she wants to learn in English, click `Auto-Translate` and `Create Card`. Now Anne has a card that shows her how `Good Morning` looks and sounds in German.
5. Anne enters a few more German words/phrases she wants to learn before her trip.
6. Anne goes back to her deck page and clicks `Practice Deck`.
7. Now Anne can review her words/phrases.

8. Anne flies to Germany with her German knowlege.

## Tech Stack
Data Storage: 
- Information about the user, the decks and the cards (including translations) are all stored on a local MySQL database.
- The audio files with pronunciations are stored in an Amazon S3 Bucket.

External APIs:
- Microsoft Azure's Translator API was used to automatically generate the translations: https://azure.microsoft.com/en-us/services/cognitive-services/translator/
- Google's Text-To-Speech API was used to generate pronunciations of the translations: https://cloud.google.com/text-to-speech
- SendGrid's Email API was used to send the unique learning space link automatically to an onboarding user: https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/

The backend logic was written in Java, using the Spring Framework. The front-end is written in React.

## Potential Improvements/Next Steps
- Translations aren't always right.
- Have a way of marking which cards are learned.
- Have a way to practice pronunciation of the word with flash cards. Perhaps, highlight the phrase as it's being read by the audio.
- More aesthetic UI.
- Package and host the code on the cloud.

