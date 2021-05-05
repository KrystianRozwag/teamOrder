from flask import Flask, redirect, jsonify, request, current_app
from flask_pymongo import PyMongo
from flask import Blueprint
from db import mongo
import string, random
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

privcode = Blueprint('privcode', __name__, static_folder="static")

def PrivCodeGenerator(teamNameProvided):
    letters = string.ascii_letters + string.digits
    result_privCode = teamNameProvided+'#'+''.join(random.choice(letters) for i in range(5))
    return result_privCode

def Register(nameProvided, privCodeGenerated, allergiesProvided , favFoodProvided, dietTypeProvided, teamCodeProvided):
    newPrivCode = {"firstName": nameProvided, "privCode": privCodeGenerated, "allergies": allergiesProvided, 
    "favFood": favFoodProvided, "isConfirmed": False, "dietType": dietTypeProvided, "teamCode": teamCodeProvided}
    mongo.db.people.insert_one(newPrivCode)

def ConfirmationRequest(teamCodeProvided, privCodeGenerated, nameProvided):
    dtaProvided = {"name": nameProvided, "privCode": privCodeGenerated}
    newReq={"$push":{"requests":dtaProvided}}
    mongo.db.teams.update({"teamCode": teamCodeProvided},newReq)

@privcode.route('/generate',methods=["POST"])
def newPrivInit():
    data = request.get_json()
    teamName= data["teamCode"].split("#")[0]
    privCode = PrivCodeGenerator(teamName)
    Register(data['name'], privCode, data['allergics'], data['food'], data['dietType'], data['teamCode'])
    ConfirmationRequest(data['teamCode'],privCode,data['name'])
    return jsonify(privCode=privCode)

@privcode.route('/show_members', methods=["POST"])
def showMembers():
    teamData = request.get_json()
    team = mongo.db.teams.find_one({"teamCode": teamData['teamCode']})
    return jsonify(memebers=team['privCodes'])

