import datetime as dt 
import numpy as np 
import pandas as pd 

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify, render_template, redirect



engine = create_engine("postgresql://postgres:bootcamp@localhost:5432/crime_db")


# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

crime = Base.classes.crime


app = Flask(__name__)

@app.route("/")
def welcome():

    return render_template("index.html")



@app.route("/api/v1.0/suburbs")
def suburbs():

    session = Session(engine)
    
    suburbs = session.query(crime.suburb).order_by((crime.suburb).asc()).distinct().all()
    
    session.close()

    return jsonify(suburbs)



@app.route("/api/v1.0/incidents")
def incidents():

    session = Session(engine)

    year = "2021"
    
    incidents = session.query(crime.year, crime.suburb, crime.offence_sub_div, func.sum(crime.incidents)).group_by(crime.year, crime.suburb, crime.offence_sub_div).filter((crime.year == year)).order_by(func.sum(crime.incidents).desc()).all()

    session.close()


    return jsonify(incidents)


@app.route("/api/v1.0/map")
def total_map():

    session = Session(engine)

    year = "2021"

    total_map = session.query(crime.year, crime.suburb, crime.latitude, crime.longitude, func.sum(crime.incidents)).group_by(crime.year, crime.suburb, crime.latitude, crime.longitude).filter((crime.year == year)).order_by(func.sum(crime.incidents).desc()).all()

    session.close()

    return jsonify(total_map)



@app.route("/api/v1.0/map2")
def map_2020():

    session = Session(engine)

    year = "2020"

    map_2020 = session.query(crime.year, crime.suburb, crime.latitude, crime.longitude, func.sum(crime.incidents)).group_by(crime.year, crime.suburb, crime.latitude, crime.longitude).filter((crime.year == year)).order_by(func.sum(crime.incidents).desc()).all()

    session.close()

    return jsonify(map_2020)


@app.route("/api/v1.0/map3")
def map_2015():

    session = Session(engine)

    year = "2015"

    map_2015 = session.query(crime.year, crime.suburb, crime.latitude, crime.longitude, func.sum(crime.incidents)).group_by(crime.year, crime.suburb, crime.latitude, crime.longitude).filter((crime.year == year)).order_by(func.sum(crime.incidents).desc()).all()

    session.close()

    return jsonify(map_2015)


@app.route("/data.html")
def data_tab():

    return render_template("data.html")


@app.route("/api/v1.0/data_tab")
def data():

    session = Session(engine)
    
    data_tab = session.query(crime.year, crime.suburb, crime.offence_div, crime.offence_sub_div, func.sum(crime.incidents)).group_by(crime.offence_sub_div, crime.suburb, crime.year, crime.offence_div).order_by((crime.suburb).asc()).all()

    session.close()

    return jsonify(data_tab)


@app.route("/api/v1.0/line_data")
def line():

    session = Session(engine)
    
    line_data = session.query(crime.year, crime.suburb, func.sum(crime.incidents)).group_by(crime.year, crime.suburb).order_by((crime.year).desc()).all()

    session.close()

    return jsonify(line_data)


@app.route("/api/v1.0/stats_data")
def stats():

    session = Session(engine)

    year = "2020"
    
    stats = session.query(crime.year, crime.suburb, crime.latitude, crime.longitude, func.sum(crime.incidents)).group_by(crime.year, crime.suburb, crime.latitude, crime.longitude).filter((crime.year >= year)).order_by(func.sum(crime.incidents).desc()).all()

    session.close()

    return jsonify(stats)


if __name__ == "__main__":
    app.run(debug=True)


