from flask import Flask, redirect, jsonify, request, current_app
from flask_pymongo import PyMongo
from flask import Blueprint
from db import mongo
import string, random
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

food_schedule = Blueprint('food_schedule', __name__, static_folder="static")



@food_schedule.route('/schedule',methods=["POST"])
def setSchedule():
    teamData = request.get_json()
    schedule = {}
    restaurants = mongo.db.restaurants.find({})
    i=0
    week = ["Mon","Tue","Wed", "Thu", "Fri", "Sat", "Sun"]
    for res in restaurants:
        day = random.choice(week)
        schedule[day]= res['name']
        i=week.index(day)
        week.pop(i)
    tableLen = len(week)
    if tableLen > 0:
        restaurants = mongo.db.restaurants.find({})
        for res2 in restaurants:
            tableLen = len(week)
            if tableLen == 0:
                break
            day = random.choice(week)
            schedule[day]= res2['name']
            i=week.index(day)
            week.pop(i)

    generatedSchedule = {"$set":{"foodSchedule": schedule}}
    mongo.db.teams.update({"teamCode": teamData["teamCode"]},generatedSchedule)
    print(schedule)
    return jsonify(schedule=schedule)

@food_schedule.route('/show_schedule',methods=["POST"])
def showSchedule():
    teamData=request.get_json()
    schedule = {}
    team = mongo.db.teams.find_one({"teamCode":teamData["teamCode"]})
    schedule = team["foodSchedule"]
    return jsonify(schedule=schedule)