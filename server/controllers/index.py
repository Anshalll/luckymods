from flask import jsonify
from models.models import Mods
from models.models import dbInstance
session = dbInstance.DbSession()


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
          print(e)
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
         print(e)
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
                print(e)
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
            

            data = [
                  {
                    "modname": "Minecraft Mod",
                    "modurl": "https://www.mediafire.com/minecraft_mod",
                    "modimage": "https://cms-assets.xboxservices.com/assets/22/3a/223a1521-60cf-4a82-b708-c5f2fdfcf163.jpg?n=Minecraft-Vanilla_Sneaky-Slider-1084_Spring-to-Life_1600x675.jpg",
                    "moddesc": "Enhance Minecraft with Mod",
                    "rating": 4,
                    "modgametype": "Minecraft",
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
