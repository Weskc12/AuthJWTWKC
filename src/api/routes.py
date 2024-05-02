"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint 
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__) # Flask provides the Blueprint class as a way to organize and structure a larger application by grouping related views, templates, etc. 
                                 # It's a built-in feature of Flask, so we just need to import it to use it. 
# The line creates a Blueprint named 'api' with 2 arguments: The first one is the name of the Blueprint (api), and the second one (__name__) is used to determine where the Blueprint is defined.
# In your main app file (app.py), we register the blueprint

# Allow CORS requests to this API
CORS(api)

# example route hello
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"}
    return jsonify(response_body), 200

# este es mi login donde hay un email y tiene que ser = a "test" y password que es = a "test". Esto es lo que tenemos que enviar en Postman para logearse
# Note: In the browser, a POST cannot be seen, only a GET. To view the POST, we have to use tools like Postman (first, make it public;if not it will give me a 401 error), or via fetch in Reach 
# In Postman it will give me as result the token
@api.route("/login", methods=["POST"])   #we change app for api as we are using Blueprint. 
def login():
    email = request.json.get("email", None)  # note: if I want to name it differently than email/password, I need to also change it in the Login component in the Front-end
    password = request.json.get("password", None)
    # here we set the logic to consult if user exists in our DB
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password)).scalar()
    if not user:  # If no user is found
        return jsonify({"message": "Bad email or password"}), 401  # jsonify transforms our python code into JSON so our front can receive it. We can receive 2 parameters in our return, so we also receive the success code 200 (ok)
    
    # create_access_token() function is used to actually generate the JWT.
    access_token = create_access_token(identity=[email, True])  # Note: if I want to send more info than the email in the payload/identity, I create a list:(identity=[email, True, "other info"]). If not: (identity=email)
    return jsonify(access_token=access_token)  # remember to import create_access_token!

#PRIVATE/PROTECTED ROUTE:
# We define a route which is protected and can only be accessed by clients providing a valid JWT in the request headers
@api.route("/private", methods=["GET"]) #change app for api!
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity() # Retrieve the identity of the current user from the JWT payload (the variable current_user will save what we have set inside the token as the identity, in our case, the email:  access_token = create_access_token(identity=email))
    return jsonify(logged_in_as=current_user), 200 # and it will return a json response indicating the logged-in user


# Profile route:
@api.route("/profile", methods=["GET"]) #change app for api!
@jwt_required() # it's the user's personal profile, so I protect it using the decorator @jwt_required()
def profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    if not current_user:    # we will get the identity, which we made it a list (identity=[email, True]), so to access the list to check if the current_user is True could also just select the i=1. And if true, it will print in the console "Value is True": if current_user[1]: print("Value is True")
        return jsonify({"message": "Access denied. Please log in/sign up"}), 401
    response_body = {}
    response_body["logged_in_as"] = current_user   # this is our response_body["result"]
    response_body["message"] = "show user profile"
    return response_body, 200


# Sign-up route:
@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    print(data)
    # Check if the user with the same email already exists in the DB
    user_exist = db.session.execute(db.select(Users).where(Users.email == data.get('email'))).scalar()
    if user_exist:
        return jsonify({"message": "This email already exists. Please log in"}), 401
    # Here we write the logic to save the new user in our DB:
    user = Users(email = data.get('email'),  # We create a new instance of the Users class and sets different attributes of the new user object to the values obtained from the "email","password",etc keys in the JSON data
                 password = data.get('password'),
                 is_active = True)
    db.session.add(user)  # Adds the user object (representing a new user), but it's still "pending" of being committed to the actual DB
    db.session.commit()  # Change commited. Now the new user is actually saved in the database
    response_body['user'] = user.serialize()  # this is our response_body['results'] and we serialized user data for the response
    response_body['message'] = "User successfully created"
    access_token = create_access_token(identity=[user.email, True])  # so we now can generate an access token for the new user
    response_body['access_token'] = access_token
    return response_body, 200
