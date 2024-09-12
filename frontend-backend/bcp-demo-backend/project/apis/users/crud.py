from project import db
from project.apis.users.models import User
from project import bcrypt
from flask import current_app as app


def get_all_users():
    return User.query.all()


def get_user_by_id(user_id):
    return User.query.filter_by(id=user_id).first()


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()


def add_user(fullname, email, password):
    user = User(fullname=fullname, email=email, password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode())
    db.session.add(user)
    db.session.commit()
    return user


def update_user(user, fullname, email):
    user.fullname = fullname
    user.email = email
    db.session.commit()
    return user


def delete_user(user):
    db.session.delete(user)
    db.session.commit()
    return user