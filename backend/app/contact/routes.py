from flask import Blueprint, request, jsonify
from .tools import allowed_file
from backend.app.mailer import send_cv_email

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/send-cv", methods=["POST"])
def send_cv():
    name = request.form.get("name")
    cv = request.files.get("cv")

    # VALIDATION
    if not name or not cv:
        return jsonify({"error": "Datos incompletos"}), 400
    
    if not allowed_file(cv.filename):
        return jsonify({
            "error": "Formato de archivo no permitido. Solo PDF, DOC o DOCX."
            }), 415
    
    # SEND EMAIL
    send_cv_email(name, cv)

    return jsonify({"message": "Correo enviado"}), 200