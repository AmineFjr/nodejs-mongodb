- Exercice 1

db.salles.find({ "smac": true }, { "_id": 1, "nom": 1 })

- Exercice 2

db.salles.find({ "capacite": { $gt: 1000 } }, { "nom": 1 })

- Exercice 3

db.salles.find({ "adresse.numero": { $exists: false } }, { "_id": 1 })

- Exercice 4

db.salles.find({ "avis": { $size: 1 } }, { "_id": 1, "nom": 1 })

- Exercice 5

db.salles.find({ "styles": "blues" })

- Exercice 6

db.salles.find({ "styles.0": "blues" }, { "styles": 1 })

- Exercice 7

db.salles.find({ "adresse.codePostal": /^84/, "capacite": { $lt: 500 } }, { "adresse.ville": 1 })

- Exercice 8

db.salles.find({ $or: [{ "_id": { $mod: [2, 0] } }, { "avis": { $exists: false } }] }, { "_id": 1 })

- Exercice 9

db.salles.find({ "avis.note": { $gte: 8, $lte: 10 } }, { "nom": 1 })

- Exercice 10

db.salles.find({ "avis.date": { $gt: new Date("2019-11-15") } }, { "nom": 1 })

- Exercice 11

db.salles.find({ $expr: { $gt: [{ $multiply: ["$_id", 100] }, "$capacite"] } }, { "nom": 1, "capacite": 1 })

- Exercice 12 

db.salles.find({ $where: "this.smac && this.styles && this.styles.length > 2" }, { "nom": 1, "styles": 1 })

- Exercice 13

db.salles.distinct("adresse.codePostal")

- Exercice 14

db.salles.updateMany({}, { $inc: { "capacite": 100 } })

- Exercice 15

db.salles.updateMany({ "styles": { $ne: "jazz" } }, { $push: { "styles": "jazz" } })

- Exercice 16

db.salles.updateMany({ "_id": { $nin: [2, 3] } }, { $pull: { "styles": "funk" } })

- Exercice 17 

db.salles.updateOne(
  { _id: 3 },
  { $set: { styles: ["blues", "rock", "techno", "reggae"] } }
)

- Exercice 18 

db.salles.updateMany({ "nom": { $regex: "^[Pp]" } }, { $inc: { "capacite": 150 }, $set: { "contact": { "telephone": "04 11 94 00 10" } } })

- Exercice 19

db.salles.updateMany({ "nom": { $regex: "^[AEIOUaeiou]" } }, { $push: { "avis": { "date": new Date(), "note": 10 } } })

- Exercice 20

db.salles.updateMany({ "nom": { $regex: "^[Zz]" } }, { $set: { "nom": "Pub Z", "capacite": 50, "smac": false } }, { upsert: true })

- Exercice 21 x

db.salles.count({ "_id": { $type: "objectId" } })

- Exercice 22

db.salles.find({ "_id": { $not: { $type: "objectId" } } }).sort({ "capacite": -1 }).limit(1)

- Exercice 23

db.salles.replaceOne({ "_id": 2 }, { "nom": "Paloma", "capacite": 60 })

- Exercice 24

db.salles.deleteOne({ "_id": { $type: "objectId" }, "capacite": { $lte: 60 } })

- Exercice 25

db.salles.findOneAndUpdate({ "nom": "Paloma" }, { $inc: { "capacite": -15 } })