import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

message = Mail(
    from_email="aiyanacookey@hotmail.co.uk",
    to_emails="aiyanacookey@hotmail.co.uk",
    subject="Test Email",
    html_content="<strong>Testing SendGrid</strong>",
)

try:
    sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
    response = sg.send(message)
    print("Status:", response.status_code)
except Exception as e:
    print("Failed:", e)