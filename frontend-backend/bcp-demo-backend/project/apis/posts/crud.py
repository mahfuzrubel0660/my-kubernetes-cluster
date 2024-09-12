from project import db
from project.apis.users.models import Post

def add_post(title, body, user):
    post = Post(title=title, body=body,user=user)
    db.session.add(post)
    db.session.commit()

def get_all_posts():
    return Post.query.all()

def get_all_posts_single_user(id):
    return Post.query.filter_by(user_id=id).all()