from flask import Flask
from flask_cors import CORS
from .config import CORS_ORIGINS
from .contact.routes import contact_bp

def create_app():
    app = Flask(__name__)

    # CORS
    CORS(app, origins=CORS_ORIGINS)

    # BLUEPRINTS
    app.register_blueprint(contact_bp)

    return app