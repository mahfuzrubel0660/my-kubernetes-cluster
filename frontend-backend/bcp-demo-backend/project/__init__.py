import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS

cors = CORS()
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()



def create_app():

    app = Flask(__name__)

    app_settings = os.getenv("APP_SETTINGS","project.config.DevelopmentConfig")
    app.config.from_object(app_settings)

    cors.init_app(app)
    db.init_app(app)
    migrate.init_app(app,db)
    bcrypt.init_app(app)

    from project.apis import api
    api.init_app(app)
    
    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app
