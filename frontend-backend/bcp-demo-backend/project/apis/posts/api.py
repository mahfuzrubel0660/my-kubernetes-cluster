from flask import request
from flask_restx import Namespace, Resource, fields
from project.apis.posts.crud import *
from project.apis.users.crud import *
from project.apis.users.utils import token_required

posts_namespace = Namespace("posts")

post_create_model = posts_namespace.model(
    "post_create_model",
    {   
        "title": fields.String(required=True),
        "body": fields.String(required=True)
    },
)

post_model = posts_namespace.model(
    "post_model",
    {   
        "id": fields.Integer(required=True),
        "title": fields.String(required=True),
        "body": fields.String(required=True),
        "user_id": fields.Integer(required=True)
    },
)


class CreatePost(Resource):
    @token_required
    @posts_namespace.expect(post_create_model, validate=True)
    @posts_namespace.response(201, "<post> was added!")
    @posts_namespace.response(400, "Sorry. That email already exists.")
    def post(self):
        """Creates a new post."""
        email = CreatePost.post.email
        post_data = request.get_json()
        title = post_data.get("title")
        body = post_data.get("body")
        response_object = {}
        user = get_user_by_email(email)
        if not user:
            response_object["message"] = "Sorry. That User does not exist"
            return response_object, 400
        add_post(title, body, user)

        response_object["message"] = f"Post {title} was added!"
        return response_object, 201
    
    @token_required
    @posts_namespace.marshal_with(post_model, as_list=True)
    def get(self):
        """Returns all posts."""
        return get_all_posts(), 200
        

class SinglePost(Resource):
    @token_required
    @posts_namespace.marshal_with(post_model)
    def get(self):
        """Returns all posts of a user."""
        email = SinglePost.get.email
        response_object = {}
        user = get_user_by_email(email)
        # user = get_user_by_id(user_id)
        if not user:
            response_object["message"] = "Sorry. That User does not have any post"
        single_post = get_all_posts_single_user(user.id)
        return single_post, 200
    

posts_namespace.add_resource(CreatePost, "")
posts_namespace.add_resource(SinglePost, "/user")