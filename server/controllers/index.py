from flask import jsonify
from models.models import Mods , Admin
from models.models import dbInstance
session = dbInstance.DbSession()
import bcrypt
from flask import session as flasksession



def UpdateMod(request):

    try: 
      data = request.get_json()

      if not data["id"]:
            return jsonify(error="An error occured!") ,400
      
      mod = session.query(Mods).filter_by(id=data["id"]).first()
      mod.moddesc = data["moddesc"]
      mod.modname = data["modname"]
      mod.modimage = data["modimage"]
      mod.modgametype = data["modgametype"]
      mod.modurl = data["modurl"]
      session.commit()
      session.close()

      return jsonify(message="Mod updated"), 200
    except Exception as e:
          
          session.rollback()
          return jsonify(error="Internal server error!") , 500
    
def get_all_mods(requets):
    try: 
        result=[]

        data= requets.get_json()
        game_type = data.get("gametype" , None)
        def getRecords(gamet):
            mods = session.query(Mods).filter_by(modgametype=gamet ).order_by(Mods.created_at.desc()).all()
            for mod in mods:
                result.append({
                    "id": mod.id,
                    "modname": mod.modname,
                    "modurl": mod.modurl,
                    "modimage": mod.modimage,
                    "modgametype": mod.modgametype,
                    "moddesc": mod.moddesc,
                    "rating": mod.rating,
                    "created_at": str(mod.created_at),
                })
      
            session.close()
            return result
    

        if game_type and game_type == "slither":
             
            result = getRecords("Slither.io")
        

            return jsonify(data=result), 200
        
        elif game_type and game_type == "minecraft":
            result = getRecords("Minecraft")
            return jsonify(data=result), 200

    except Exception as e:
     
         session.rollback()
         return jsonify(error="Internal server error!"),500
    
def get_popular_mods():
    try:
                result = {}

                def get_records(gameType):
                    mod_data = []
                    mods = session.query(Mods).filter_by(modgametype=gameType).order_by(Mods.rating.desc()).limit(3).all()
                    for mod in mods:
                        mod_data.append({
                            "id": mod.id,
                            "modname": mod.modname,
                            "modurl": mod.modurl,
                            "modimage": mod.modimage,
                            "modgametype": mod.modgametype,
                            "moddesc": mod.moddesc,
                            "rating": mod.rating,
                            "created_at": str(mod.created_at),
                        })
                    session.close()
                    return mod_data

                
                minecraft = get_records("Minecraft")
                slither = get_records("Slither.io")
                result["slither"] = slither
                result['minecraft'] = minecraft

                return jsonify(data=result), 200
    except Exception as e:
               
                session.rollback()
                return jsonify(error="Internal server error!"), 500

def get_newly_added_mods():
    try:
                result = {}

                def get_records(gameType):
                    mod_data = []
                    mods = session.query(Mods).filter_by(modgametype=gameType).order_by(Mods.created_at.desc()).limit(3).all()
                    for mod in mods:
                        mod_data.append({
                            "id": mod.id,
                            "modname": mod.modname,
                            "modurl": mod.modurl,
                            "modimage": mod.modimage,
                            "moddesc": mod.moddesc,
                            "modgametype": mod.modgametype,
                            "rating": mod.rating,
                            "created_at": str(mod.created_at),
                        })
                    session.close()
                    return mod_data

                
                minecraft = get_records("Minecraft")
                slither = get_records("Slither.io")
                result["slither"] = slither
                result['minecraft'] = minecraft

                return jsonify(data=result), 200
    except Exception as e:
                print(e)
                session.rollback()
                return jsonify(error="Internal server error!"), 500

def InsertMods(request):
    try: 
            body = request.get_json()
            for i in body: 

                if (body[i] is None or  body[i].strip() == "")  :
                    
                    return jsonify(error= f"{i} is a required field"), 400
                  
            
            data = [
                  {
                    "modname":  body["name"],
                    "modurl": body["url"],
                    "modimage": body["image"],
                    "moddesc": body["desc"],

                    "rating": 0,
                    "modgametype": body["game"],
                    "created_at": None
                }
            ]

            for i in data: 
                session.add(Mods(
                        modname=i["modname"],
                        modurl=i["modurl"],
                        modimage=i["modimage"],
                        moddesc=i["moddesc"],
                        rating=i["rating"],
                        modgametype=i["modgametype"],
                        created_at=i["created_at"]
                ))
            session.commit()
            session.close()
     
            return jsonify(message="Data inserted!") ,200
    except Exception as e:
        print(e)
        return jsonify(error="Internal server error!"),500

def loginuser(request):
    try:
        
        if "username" not in flasksession:
            data = request.get_json()

            if not data:
                return jsonify(error="No data provided", logged=False), 400

            user_email = data.get("id", "").strip()
            password = data.get("password", "").strip()

            if not user_email or not password:
                return jsonify(error="user id and password required", logged=False), 400

            
            userval = session.query(Admin).all()

            for udata in userval:
                if udata.username == user_email:
                    
                    if bcrypt.checkpw(password.encode("utf-8"), udata.password.encode("utf-8")):
                        flasksession["username"] = udata.username
                     
                        return jsonify(logged=True), 200
                    else:
                        return jsonify(error="Invalid credentials!", logged=False), 403

        
            return jsonify(error="Invalid credentials!", logged=False), 403
        else:
             
             return jsonify(logged = True) , 200
    except Exception as e:
        print(str(e))
        return jsonify(error=str(e)), 500


def deleteMod(request):
     try:
        data = request.get_json()
        if not data["id"]: 
             return jsonify(error="Id is required!"),400
        else:
            rows_deleted = session.query(Mods).filter(Mods.id == data["id"]).delete()
            session.commit()

            if rows_deleted == 0:
                return jsonify(error="No record found with given id"), 404

        return jsonify(data="Mod deleted successfully"), 200


     except Exception as e:
          print(e)
          return jsonify(error="Internal server error!") , 500
     