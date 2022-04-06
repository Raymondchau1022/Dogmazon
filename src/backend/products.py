from tkinter import Image
import pymongo
from flask import Blueprint, Flask, request, jsonify 
from passlib.hash import pbkdf2_sha256
from bson.objectid import ObjectId


products = Blueprint("products", __name__)
client = pymongo.MongoClient('localhost', 27017)
db_users = client.users

@products.route("/add_products",methods=['POST'])
def add_products():
    Username = db_users.accounts.find_one({"_id": ObjectId(request.json["username"])})
    image = request.files.get('image')
    db_users.products.insert_one({
        "username":Username["username"],
        "productname":request.json["productname"],
        "price":request.json["price"],
        "tag":request.json["tag"],
        "description":request.json["description"],
        "image": image
        })
    return (image)