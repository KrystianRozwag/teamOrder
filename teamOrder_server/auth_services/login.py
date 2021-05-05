from flask import Flask, redirect, jsonify, request, current_app
from flask_pymongo import PyMongo
from flask import Blueprint
import sys
import re
sys.path.insert(1,"../")
from db import mongo
import hashlib
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

login = Blueprint('login', __name__, static_folder="static")



@login.route('/login',methods = ['POST'])
def logInController():
    userDataProvided = request.get_json()
    user = mongo.db.leaders.find_one({"email": userDataProvided["email"]})
    if(user):
        regEncryptedPass = hashlib.sha256(userDataProvided["password"].encode('UTF-8')).hexdigest()
        if(regEncryptedPass==user["password"]):
            access_token = create_access_token(identity=user['email'])
            obj = re.split("( | )", str(user["_id"]))
            team = mongo.db.teams.find_one({"teamCode": user['teamCode']})
            user["team"] = team["teamName"]
            user["teamAddress"] = team["address"]
            user["_id"] = obj[0]
            user["token"] = access_token
            return jsonify(user)
        else:
            user = {}
            return jsonify(token=0)
    else:
        return jsonify(token=0)