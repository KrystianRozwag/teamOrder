from flask import Flask, redirect, jsonify, request, current_app
from flask_pymongo import PyMongo
from flask import Blueprint
from db import mongo
from datetime import date
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

orders = Blueprint('orders', __name__, static_folder="static")

weekdays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]


@orders.route("/generate_food", methods=["POST"])
def generateMenu():
    personData = request.get_json()
    person = mongo.db.people.find_one({"privCode": personData['privCode']})
    teamCode = person["teamCode"]
    team = mongo.db.teams.find_one({"teamCode": teamCode})
    today = date.today().weekday()
    schedule = team['foodSchedule']
    scheduleDay = weekdays[today]
    restaurant = schedule[scheduleDay]
    safeDishes = []
    mainDishes = []
    dishes = mongo.db.products.find({"restaurantName": restaurant})
    for dish in dishes:
        dishSafe=False
        for allergy in person["allergies"]:
            if(allergy==True):
                for allergen in dish["allergType"]:
                    if allergy != allergen:
                        if(dish[str(person["dietType"])] == True):
                            dishSafe=True
            else:
                    dishSafe=True
        if(dishSafe==True):
            safeDishes.append(dish)
    if(mainDishes == []):
        mainDishes = safeDishes
    for dsh in mainDishes:
        dsh["_id"] = str(dsh["_id"])
    return jsonify(menu=mainDishes)

@orders.route("/place_single", methods=["POST"])
def placeSingle():
    orderData = request.get_json()
    person = mongo.db.people.find_one({"privCode": orderData['privCode']})
    if person["isConfirmed"] == True:
        order = mongo.db.orders.find_one({"$and":[{"teamCode": person['teamCode']},{"isPending": True}]})
        if(order):
            newOrder = {"$push":{"orders": orderData}}
            mongo.db.orders.update({"$and":[{"teamCode": person['teamCode']},{"isPending": True}]},newOrder)
            newPrice = order["overallPrice"]+orderData["product"]["productPrice"]
            priceUpdate = {"$set":{"overallPrice": newPrice}}
            mongo.db.orders.update({"$and":[{"teamCode": person['teamCode']},{"isPending": True}]},priceUpdate)
        else:
            orders = mongo.db.order.find({}).count()
            today = date.today()
            d1 = today.strftime("%d/%m/%Y")
            newOrder = {"orderNo": orders, "teamCode": person["teamCode"], "isPending": True, "orders": [orderData], "data": str(d1), "overallPrice": orderData["product"]["productPrice"]}
            mongo.db.orders.insert_one(newOrder)
        return jsonify(status="OK")
    else:
        return jsonify(status="Cannot Access")


@orders.route('/show_orders', methods=['POST'])
def showPendingOrder():
    teamData = request.get_json()
    ordersHistoryTable = []
    order = mongo.db.orders.find_one({"$and":[{"teamCode":teamData["teamCode"]},{"isPending": True}]})
    ordersHistory = mongo.db.orders.find({"$and":[{"teamCode":teamData["teamCode"]},{"isPending": False}]})
    for completeOrder in ordersHistory:
        completeOrder["_id"] = str(completeOrder["_id"])
        ordersHistoryTable.append(completeOrder)
    if order:
        order["_id"] = str(order["_id"])
    return jsonify(pending=order,history=ordersHistoryTable)

@orders.route('/place_multiple', methods=['POST'])
def placeMultipleOrders():
    teamData = request.get_json()
    confirmation = {"$set":{"isPending":False}}
    mongo.db.orders.update({"$and":[{"teamCode":teamData["teamCode"]},{"isPending": True}]},confirmation)
    return jsonify(status="OK")
