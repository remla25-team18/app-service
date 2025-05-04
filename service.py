from dotenv import load_dotenv
import os

load_dotenv()

model_service_url = os.getenv("MODEL_SERVICE_URL")
print("Model Service URL: ", model_service_url)
