from flask import json, request,current_app as app
from flask_restx import Namespace, Resource, fields
from project.apis.users.crud import *
from project.apis.users.utils import *
from project import bcrypt

users_namespace = Namespace("users")


user_create_model = users_namespace.model(
    "user_create_model",
    {
        "fullname": fields.String(required=True),
        "email": fields.String(required=True),
        "password": fields.String(required=True)
    },
)

user_model = users_namespace.model(
    "user_model",
    {   
        "id": fields.Integer(required=True),
        "fullname": fields.String(required=True),
        "email": fields.String(required=True),
        "created_date": fields.String(required=True)
    },
)

user_login_model = users_namespace.model(
    "user_login_model",
    {
        "email": fields.String(required=True),
        "password": fields.String(required=True)
    },
)

user_update_model = users_namespace.model(
    "user_update_model",
    {   
        "fullname": fields.String(required=True),
        "email": fields.String(required=True)
    },
)

class CreateUser(Resource):
    @users_namespace.expect(user_create_model, validate=True)
    @users_namespace.response(201, "<user_email> was added!")
    @users_namespace.response(400, "Sorry. That email already exists.")
    def post(self):
        """Creates a new user."""
        post_data = request.get_json()
        fullname = post_data.get("fullname")
        email = post_data.get("email")
        password = post_data.get("password")
        response_object = {}

        user = get_user_by_email(email)
        if user:
            response_object["message"] = "Sorry. That email already exists."
            return response_object, 400

        add_user(fullname, email, password)

        response_object["message"] = f"{email} was added!"
        return response_object, 201
    

class LoginUser(Resource):
    @users_namespace.expect(user_login_model, validate=True)
    @users_namespace.response(200, "Successfully logged in!")
    @users_namespace.response(400, "Invalid Email or Password!")
    def post(self):
        """Login User."""
        post_data = request.get_json()
        email = post_data.get("email")
        password = post_data.get("password")
        response_object = {}
        
        user = get_user_by_email(email)
        if not user:
            users_namespace.abort(400, "User not found!")
        auth_token = encode_auth_token(user.email)
        if user and bcrypt.check_password_hash(user.password, password):
            response_object["status"]="success"
            response_object["message"]="Successfully logged in!"
            response_object["id"]=user.id
            response_object["auth_token"]=auth_token
            return response_object, 200
        else:
            users_namespace.abort(400, "Invalid Email or Password!")


class AuthenticateToken(Resource):
    @token_required
    @users_namespace.response(200, "The user's token is valid.")
    def get(self):
        """Validate Token."""
        return {"message": "The user's token is valid."}, 200

class UsersList(Resource):
    @token_required
    @users_namespace.marshal_with(user_model, as_list=True)
    def get(self):
        """Returns all users."""
        return get_all_users(), 200


class Users(Resource):
    @token_required
    @users_namespace.marshal_with(user_model)
    @users_namespace.response(200, "Success")
    @users_namespace.response(404, "User <user_id> does not exist")
    def get(self, user_id):
        """Returns a single user."""
        user = get_user_by_id(user_id)
        if not user:
            users_namespace.abort(404, f"User {user_id} does not exist")
        return user, 200

    @token_required
    @users_namespace.expect(user_update_model, validate=True)
    @users_namespace.response(200, "User info is updated!")
    @users_namespace.response(400, "Sorry. That email already exists.")
    @users_namespace.response(404, "User <user_name> does not exist")
    def put(self, user_id):
        """Updates a user."""
        post_data = request.get_json()
        username = post_data.get("fullname")
        email = post_data.get("email")
        response_object = {}

        user = get_user_by_id(user_id)
        if not user:
            users_namespace.abort(404, f"User {user_id} does not exist")

        if get_user_by_email(email):
            response_object["message"] = "Sorry. That email already exists."
            return response_object, 400

        update_user(user, username, email)
        response_object["message"] = f"User info updated!"
        return response_object, 200

    @token_required
    @users_namespace.response(200, "<username> was removed!")
    @users_namespace.response(404, "User <user_id> does not exist")
    def delete(self, user_id):
        """"Deletes a user."""
        response_object = {}
        user = get_user_by_id(user_id)
        username = user.fullname
        if not user:
            users_namespace.abort(404, f"User {user_id} does not exist")

        delete_user(user)

        response_object["message"] = f"{username} was removed!"
        return response_object, 200


users_namespace.add_resource(CreateUser, "/create")
users_namespace.add_resource(LoginUser, "/login")
users_namespace.add_resource(UsersList, "")
users_namespace.add_resource(Users, "/<int:user_id>")
users_namespace.add_resource(AuthenticateToken, "/auth")