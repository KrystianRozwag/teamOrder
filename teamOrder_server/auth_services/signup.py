from flask import Flask, redirect, jsonify, request, current_app
from flask_pymongo import PyMongo
from flask import Blueprint
import sys
sys.path.insert(1,"../db.py") 
from db import mongo
import hashlib, string, random

signup = Blueprint('signup', __name__, static_folder="static")

def TeamRegistration(codeGenerated, nameProvided):
    newTeam = {'address': '', 'teamCode': codeGenerated, 'teamName': nameProvided, 'requests': [], 'privCodes': []}
    mongo.db.teams.insert_one(newTeam)

def TLeaderRegistration(emailProvided, passwordEncrypted, codeGenerated):
    newTLeader = {'email': emailProvided, 'password': passwordEncrypted, 'teamCode': codeGenerated}
    mongo.db.leaders.insert_one(newTLeader)

def isUserExisting(chkProvidedEmail):
    userCheck = mongo.db.leaders.count_documents({"email": chkProvidedEmail })
    if (userCheck == 0):
        return False
    else:
        return True

def TeamCodeGenerator(teamNameProvided):
    letters = string.ascii_letters + string.digits
    result_teamCode = teamNameProvided+'#'+''.join(random.choice(letters) for i in range(5))
    codeCheck = mongo.db.teams.count_documents({"teamCode": result_teamCode })
    if (codeCheck == 0):
        return result_teamCode
    else:
        TeamCodeGenerator(teamNameProvided)
    

@signup.route('/signup',methods = ['POST'])
def signUpControl():
    newTeam = request.get_json() 
    ckhUser = isUserExisting(newTeam['email'])
    if (ckhUser == False):
        regEncryptedPass = hashlib.sha256(newTeam['password'].encode('UTF-8')).hexdigest()
        teamCode = TeamCodeGenerator(newTeam["teamName"])
        TLeaderRegistration(newTeam['email'],regEncryptedPass, teamCode)
        TeamRegistration(teamCode,newTeam['teamName'])
        return jsonify(status = "OK", code=teamCode)
    else:
        return jsonify(status = "Existing")