from flask import Flask, request , jsonify
from dotenv import load_dotenv
import os
from database.connection import dbInstance 
import controllers.index as Controller
from flask_cors import CORS
from flask import session


app = Flask(__name__)
load_dotenv()

CORS(app , supports_credentials=True,   origins=["*"])

dbInstance.check_connection()
app.secret_key = os.getenv("SESSION")
app.config.update(
    SESSION_COOKIE_SAMESITE="None",
    SESSION_COOKIE_SECURE=True  
)
@app.route('/')
def home():
   if 'username' not in session:
      return jsonify(logged=False)
   return jsonify(logged=True)

@app.route("/api/updatemod" , methods=["PATCH"])
def updatemod():
   
   return Controller.UpdateMod(request)

@app.route("/api/getmods" , methods=["POST"])
def get_mods():
  
   return Controller.get_all_mods(request)

@app.route("/api/uploadmod" , methods=["POST"])
def InsertMods():

   return Controller.InsertMods(request)


@app.route("/api/get_popular_mods" , methods=["GET"])
def get_popularmods():
   return Controller.get_popular_mods()


@app.route("/api/get_new_mods" , methods=["GET"])
def get_newmods():
   return Controller.get_newly_added_mods()

@app.route("/api/login" , methods=["POST"])
def login():
  
  
      return Controller.loginuser(request)

@app.route("/api/deletemod" , methods=["DELETE"])
def deletemod():
   return Controller.deleteMod(request)
 
@app.teardown_appcontext
def shutdown_session(exception=None):
    dbInstance.DbSession().remove()  
if __name__ == "__main__":

   app.run(debug=True)
