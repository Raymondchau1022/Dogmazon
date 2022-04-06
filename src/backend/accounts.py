from unicodedata import name
import pymongo
from flask import Blueprint, Flask, request, jsonify 
from passlib.hash import pbkdf2_sha256
from bson.objectid import ObjectId


accounts = Blueprint("accounts", __name__)
client = pymongo.MongoClient('localhost', 27017)
db_users = client.users

    

@accounts.route("/create_accounts",methods=['POST'])
def create_accounts():
    passwordHash =  pbkdf2_sha256.hash(request.json["password"])
    db_users.accounts.insert_one({"username":request.json["username"],"email":request.json["email"],"password":passwordHash})
    return (request.json["username"])


@accounts.route("/read_accounts/<username>/<email>", methods=["GET"])
def read_accounts(username,email):
    read_username = db_users.accounts.find_one({"username":username})
    read_email = db_users.accounts.find_one({"email":email})
    if (read_username is not None):
        return ("Username Already Existed")
    if (read_email is not None):
        return ("Email Already Existed")
    return ("")
    
@accounts.route("/login_accounts/<email>/<password>",methods=['GET'])
def login_accounts(email,password):
    login = db_users.accounts.find_one({"email":email})
    if (login is not None) and (pbkdf2_sha256.verify(password, login['password'])):
        return str(login.get("_id"))
    return ("")

@accounts.route("/loggedin/<userid>",methods=['GET'])
def loggedin(userid):
    try:
        checkUsername = db_users.accounts.find_one({"_id": ObjectId(userid)})
    except:
        return("")
    if (checkUsername is not None):
        return (userid)
    return ("")

@accounts.route("/userInfo/<userid>",methods=['GET'])
def userInfo(userid):
    checkUsername = db_users.accounts.find_one({"_id": ObjectId(userid)})
    userInfo = [{"username":checkUsername["username"]},{"email":checkUsername["email"]}]
    return jsonify(userInfo)


