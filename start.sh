
VOICE2JSON="/home/lexayo/voice2json"

$VOICE2JSON/voice2json.sh transcribe-stream \
  | $VOICE2JSON/voice2json.sh recognize-intent \
  | node ~/Documents/voice-commands/interpret.js

