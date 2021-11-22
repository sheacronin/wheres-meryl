# Where's Meryl

[Live Site](https://wheres-meryl.web.app/).

A Where's Waldo-inspired game featuring characters from _Mamma Mia!_

## How to Play

Find Donna (Meryl Streep), Tanya (Christine Baranski), and Rosie (Julie Walters) in an image of Greece as fast as you can. Click on where you think a character is, and then select the corresponding character. If you are correct, a marker will appear above the character.

Once you've found all three characters, you a popup will tell you if you've made the top 10 leaderboard. If you have, congratulations! You can enter your name to get up on the leaderboard until other players knock you off.

## Technology

This app uses React and Firebase. The positions of the characters are stored in Firestore so that the user cannot access their locations through the source code. The top 10 leaderboard scores are also stored in Firebase and ordered by the fastest time.
