import datetime as dt 
import numpy as np 
import pandas as pd 

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify, render_template, redirect



engine = create_engine("postgresql://postgres:bootcamp@localhost:5432/crime")


# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

location = Base.classes.location
crime = Base.classes.crime


app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template("index.html")




@app.route("/api/v1.0/all_data")
def all_data():

    session = Session(engine)
    conn = engine.connect()

    results = pd.read_sql("SELECT crime.*, location.latitude, location.longitude FROM crime JOIN location ON crime.suburb = location.suburb WHERE crime.year > 2020", conn)


    return results.to_json(orient='split', index=False)


@app.route("/api/v1.0/suburb_lga")
def suburb_lga():

    session = Session(engine)
    
    suburb_data = session.query(location.suburb, location.lga, location.latitude, location.longitude).all()

    session.close()

    all_suburbs = []
    

    for suburb, lga, lat, lng in suburb_data:
        suburb_dict = {}
        suburb_dict["suburb"] = suburb
        suburb_dict["lga"] = lga
        suburb_dict["lat"] = lat
        suburb_dict["lng"] = lng
        all_suburbs.append(suburb_dict)


    return jsonify(all_suburbs)

@app.route("/api/v1.0/suburbs")
def suburbs():

    session = Session(engine)
    
    suburbs = session.query(location.suburb).order_by(location.suburb.asc()).all()

    session.close()

    return jsonify(suburbs)



@app.route("/api/v1.0/incidents")
def incidents():

    session = Session(engine)
    
    incidents = session.query(crime.suburb, crime.offence_sub_div, func.sum(crime.incidents)).group_by(crime.offence_sub_div, crime.suburb).order_by((crime.suburb).asc()).all()

    session.close()


    return jsonify(incidents)


@app.route("/data.html")
def data_tab():

    return render_template("data.html")


@app.route("/api/v1.0/data_tab")
def data():

    session = Session(engine)
    
    data_tab = session.query(crime.year, crime.suburb, crime.offence_div, crime.offence_sub_div, func.sum(crime.incidents)).group_by(crime.offence_sub_div, crime.suburb, crime.year, crime.offence_div).order_by((crime.suburb).asc()).all()

    session.close()


    return jsonify(data_tab)


if __name__ == "__main__":
    app.run(debug=True)