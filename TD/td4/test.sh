curl -X POST -H "Content-Type: application/json" --data '{ "url": "https://baconipsum.com/api/?type=meat-and-filler" }' http://localhost:3000/downloadRemoteFile

curl -X POST -H "Content-Type: application/json" --data '{ "url": "https://baconipsum.com/api/?type=meat-and-filler", "filename": "bacon.txt" }' http://localhost:3000/downloadRemoteFile

curl -X POST -H "Content-Type: application/json" -d '{"url": "https://baconipsum.com/api/?type=meat-and-filler&paras=300000"}' http://localhost:3000/downloadRemoteFile