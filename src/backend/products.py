from tkinter import Image
import pymongo
from flask import Blueprint, Flask, request, jsonify 
from bson.objectid import ObjectId


products = Blueprint("products", __name__)
client = pymongo.MongoClient('localhost', 27017)
db_users = client.users

@products.route("/add_products",methods=['POST'])
def add_products():
    Username = db_users.accounts.find_one({"_id": ObjectId(request.json["username"])})
    db_users.products.insert_one({
        "username":Username["username"],
        "productname":request.json["productname"],
        "price":int(request.json["price"]),
        "producttype":request.json["producttype"],
        "description":request.json["description"],
        "image": request.json["image"],
        "rating": 0,
        "rating count": 0,
        "rating mean": 0,
        "sold number": 0
        })
    return ("")


@products.route("/topsales/",methods=['GET'])
def topsales():
    theTopsales = db_users.products.find().sort("sold number", -1)
    Topsales = []
    for x in range(4):
        Topsales.append({"productname":theTopsales[x]["productname"],
        "price":theTopsales[x]["price"],
        "rating mean":theTopsales[x]["rating mean"],
        "rating count":theTopsales[x]["rating count"],
        "productID":str(theTopsales[x].get("_id"))})
    return jsonify(Topsales)

@products.route("/toprated/",methods=['GET'])
def toprated():
    theToprated = db_users.products.find().sort("rating mean", -1)
    Toprated = []
    for x in range(4):
        Toprated.append({"productname":theToprated[x]["productname"],
        "price":theToprated[x]["price"],
        "rating mean":theToprated[x]["rating mean"],
        "rating count":theToprated[x]["rating count"],
        "productID":str(theToprated[x].get("_id"))})
    return jsonify(Toprated)

@products.route("/price/<order>",methods=['GET'])
def price(order):
    theorder = int(order)
    theResult = db_users.products.find().sort("price",theorder)
    Result = []
    for x in range(db_users.products.count_documents({})):
        Result.append({"productname":theResult[x]["productname"],
        "price":theResult[x]["price"],
        "rating mean":theResult[x]["rating mean"],
        "rating count":theResult[x]["rating count"]})
    return jsonify(Result)

@products.route("/ProductID/<ProductID>",methods=['GET'])
def ProductID(ProductID):
    try:
        Product = db_users.products.find_one({"_id": ObjectId(ProductID)})
    except:
        return ("")
    if (Product is None):
        return ("")
    ProductInfo = {"productname":Product["productname"],
        "price":Product["price"],
        "producttype":Product["producttype"],
        "description":Product["description"],
        "rating mean":Product["rating mean"],
        "rating count":Product["rating count"],
        "sold number":Product["sold number"]}
    return jsonify(ProductInfo)
