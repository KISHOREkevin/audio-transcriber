import assemblyai as aai
from dotenv import load_dotenv
import os
load_dotenv()


def transcribeGenerator(file_path):
    aai.settings.api_key=os.getenv('API_KEY_ASSEMBLYAI')
    FILE_URL = file_path
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(FILE_URL)
    return transcript.text

