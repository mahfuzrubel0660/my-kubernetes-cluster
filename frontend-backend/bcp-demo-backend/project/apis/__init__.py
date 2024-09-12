from flask_restx import Api

from project.apis.ping import ping_namespace
from project.apis.users.api import users_namespace
from project.apis.posts.api import posts_namespace


api = Api(version="1.0", title="Users API", doc="/docs", prefix='/api/v1')

api.add_namespace(ping_namespace, path="/ping")
api.add_namespace(users_namespace, path="/users")
api.add_namespace(posts_namespace, path="/posts")