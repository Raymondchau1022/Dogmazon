from flask import Blueprint, Flask, request, jsonify , session
import pymongo
from flask_cors import CORS, cross_origin
from accounts import accounts
from products import products


app = Flask(__name__)

app.register_blueprint(accounts, url_prefix="")
app.register_blueprint(products, url_prefix="")

cors = CORS(app)

#db
client = pymongo.MongoClient('localhost', 27017)
db_users = client.users

#CORS
cors = CORS(app, resources={r"/*": {"origins": "*"}}, headers=['Content-Type', 'Authorization'], origins="http://localhost:3000/", methods=['POST', 'GET', 'PUT', 'DELETE'])


@app.route("/")
def create_main():
    return "<h1>BackEnd Home</h1>"

 
if __name__ == "__main__":
    app.run(debug=True)