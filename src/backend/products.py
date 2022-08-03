from tkinter import Image
from flask_pymongo import PyMongo
import pymongo
from flask import Blueprint, Flask, request, jsonify 
from bson.objectid import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/users"
mongo = PyMongo(app)

products = Blueprint("products", __name__)
client = pymongo.MongoClient('localhost', 27017)
db_users = client.users


@products.route("/add_products",methods=['POST'])
def add_products():
    User = db_users.accounts.find_one({"_id": ObjectId(request.json["userID"])})
    db_users.products.insert_one({
        "username":User["username"],
        "productname":request.json["productname"],
        "price":int(request.json["price"]),
        "producttype":request.json["producttype"],
        "description":request.json["description"],
        "imageID": request.json["imageID"],
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
        "productID":str(theTopsales[x].get("_id")),
        "imageID":theTopsales[x]["imageID"],
        })
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
        "productID":str(theToprated[x].get("_id")),
        "imageID":theToprated[x]["imageID"],
        })
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
        "rating count":theResult[x]["rating count"]
        })
    return jsonify(Result)

@products.route("/search/<searching>/",defaults={'query': None},methods=['GET'])
@products.route("/search/<searching>/<query>",methods=['GET'])
def search(searching,query):
    theQuery = []
    if query != None:
        query = query.replace('=','+')
        Query = query.split("+")
        for n in range(len(Query)):
            if Query[n] == "rating":
                number = int(Query[n+1])
                theQuery.append({"rating mean": { "$gte": number } })
            if Query[n] == "price":
                priceRange = Query[n+1].split('-')
                theQuery.append({"price": { "$gte": int(priceRange[0]),"$lte": int(priceRange[1]) } })
            if Query[n] == "type":
                Types =  Query[n+1].split('-')
                TypesArray = []
                for n in range(len(Types)):
                    TypesArray.append(Types[n])
                theQuery.append({"producttype": { "$in": TypesArray } })
    find = {}
    if searching != "All":
        theQuery.append({"productname" : {"$regex" : searching}})
        find = {"$and":theQuery}
    if theQuery != []:
        find = {"$and":theQuery}
    
    theResult = db_users.products.find(find)
    Result = []
    for x in range(db_users.products.count_documents(find)):
        Result.append({"productname":theResult[x]["productname"],
        "price":theResult[x]["price"],
        "rating mean":theResult[x]["rating mean"],
        "rating count":theResult[x]["rating count"],
        "productID":str(theResult[x].get("_id")),
        "imageID":theResult[x]["imageID"],
        })
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
        "sold number":Product["sold number"],
        "imageID":Product["imageID"],
        }
    return jsonify(ProductInfo)

@products.route("/Uploaded/<UserID>",methods=['GET'])
def Uploaded(UserID):
    User = db_users.accounts.find_one({"_id": ObjectId(UserID)})
    theResult = db_users.products.find({"username" :User["username"]})
    Result = []
    for x in range(db_users.products.count_documents({"username" :User["username"]})):
        Result.append({"productname":theResult[x]["productname"],
        "price":theResult[x]["price"],
        "rating mean":theResult[x]["rating mean"],
        "rating count":theResult[x]["rating count"],
        "productID":str(theResult[x].get("_id")),
        "imageID":theResult[x]["imageID"],
        })
    return jsonify(Result)


@products.route("/checkouts",methods=['POST'])
def checkouts():
    User = db_users.accounts.find_one({"_id": ObjectId(request.json["userID"])})
    bought = User["bought"]
    cartItems = request.json["cartItems"]
    for x in range(len(cartItems)):
        bought.append(cartItems[x])
        db_users.products.update_one({"_id": ObjectId(cartItems[x]["productID"])},{ "$inc": { "sold number": cartItems[x]["quantity"]}})
    db_users.accounts.update_one({"_id": ObjectId(request.json["userID"])}, { "$set": { "bought": bought } })   
    return (jsonify(bought))


@products.route("/Purchased/<UserID>",methods=['GET'])
def Purchased(UserID):
    User = db_users.accounts.find_one({"_id": ObjectId(UserID)})
    theResult = db_users.products.find({"username" :User["username"]})
    Result = []
    for x in range(len(User["bought"])):
        theResult =  db_users.products.find_one({"_id": ObjectId(User["bought"][x]["productID"])}) 
        Result.append({"productname":theResult["productname"],
        "price":theResult["price"],
        "rating mean":theResult["rating mean"],
        "rating count":theResult["rating count"],
        "productID":str(theResult.get("_id")),
        "imageID":theResult["imageID"],
        })
    return jsonify(Result)
  
















