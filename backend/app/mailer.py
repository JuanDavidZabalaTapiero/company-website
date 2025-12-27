import os
import base64
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition

def send_cv_email(name, file):
    message = Mail(
        from_email=os.getenv("FROM_EMAIL"),
        to_emails=os.getenv("TO_EMAIL"),
        subject="== NUEVA HOJA DE VIDA ==",
        html_content=f"""
        <p>Nombre: {name}</p>
        """
    )

    encoded_file = base64.b64encode(file.read()).decode()

    attachment = Attachment(
        FileContent(encoded_file),
        FileName(file.filename),
        FileType(file.mimetype),
        Disposition("attachment")
    )

    message.attachment = attachment

    sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
    sg.send(message)