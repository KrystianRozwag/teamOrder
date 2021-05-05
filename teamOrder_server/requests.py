from flask import Flask, redirect, jsonify, request, current_app
from flask_pymongo import PyMongo
from flask import Blueprint
from db import mongo
import string, random
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

req = Blueprint('req', __name__, static_folder="static")


@req.route('/show-requests',methods=["POST"])
def showRequests():
    teamData = request.get_json()
    team = mongo.db.teams.find_one({"teamCode": teamData['teamCode']})
    if(team):
        requests = team['requests']
        return jsonify(requests=requests)
    else:
        return jsonify(requests=0)

@req.route('/process_request',methods=["POST"])
def processRequest():
    processingData = request.get_json()
    team = mongo.db.teams.find_one({"teamCode": processingData['teamCode']})
    if(team):
        if(processingData['isConfirmed']==True):
            processing={"$pull":{"requests":{"privCode": processingData['privCode']}}}
            mongo.db.teams.update({"teamCode": processingData['teamCode']},processing)
            dtaProvided = {"name": processingData['name'], "privCode": processingData['privCode']}
            processing={"$push":{"privCodes": dtaProvided}}
            mongo.db.teams.update({"teamCode": processingData['teamCode']},processing)
            processing={"$set":{"isConfirmed": True}}
            mongo.db.people.update({"privCode":processingData['privCode']},processing)
            return jsonify(staus="confirmed")
        else:
            processing={"$pull":{"requests":{"privCode": processingData['privCode']}}}
            mongo.db.teams.update({"teamCode": processingData['teamCode']},processing)
            mongo.db.people.remove({"privCode":processingData['privCode']})
            return jsonify(staus="denied")
    else:
        return jsonify(status=0)