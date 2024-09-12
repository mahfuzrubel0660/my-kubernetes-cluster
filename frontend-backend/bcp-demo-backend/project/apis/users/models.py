from sqlalchemy.sql import func
from datetime import datetime
from project import db


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fullname = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_date = db.Column(db.DateTime, default=func.now(), nullable=False)
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __init__(self, fullname, email, password):
        self.fullname = fullname
        self.email = email
        self.password = password


class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(140))
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, title, body,user):  
        self.title = title
        self.body = body
        self.author=user
    
    def __repr__(self):
        return '<Post {}>'.format(self.body)
