const path = require("path");
const fs = require("fs");

var myArgs = process.argv.slice(2);
const evn = myArgs[0];
if (!["dev", "prod"].includes(evn)) {
  throw new Error("需要变量Please provide evn variable: dev || prod");
  return;
}
const API = evn === "dev" ? "47.101.69.249" : "apis.fatcoupon.com";
const directoryPath = path.join(__dirname, "./src/coupon-applying/stores/");

(async function main() {
  //requiring path and fs modules

  function readConnectors() {
    //joining path of directory

    // const directoryPath = "./";

    const arr = [];
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        return; //console.log("Unable to scan directory: " + err);
      }

      //listing all files using forEach
      files.forEach(function (f) {
        if (!f.includes("json")) {
          // Do whatever you want to do with the file
          f = f.replace("StoreConnector_", "").replace(".ts", "");
          //console.log(f);

          arr.push(f);

          //   if (f.includes("_")) {
          //     let newF = f.split("_");
          //     if (newF.length) {
          //       newF.forEach((params) => {
          //         arr.push(params);
          //       });
          //     }
          //   } else {
          //     arr.push(f);
          //   }
        }
      });
    });

    //console.log(arr);
    return arr;
  }

  const storeFiles = readConnectors();
  //#endregion

  const getStores = () => {
    return new Promise(function (resolve, reject) {
      // executor (the producing code, "singer")

      const https = evn === "dev" ? require("http") : require("https");
      const options = {
        hostname: API,
        port: evn === "dev" ? 8370 : 443,
        path: "/stores/extension",
        method: "GET",
      };

      var response = "";
      var storesList;

      const req = https.request(options, (res) => {
        //console.log(`statusCode: ${res.statusCode}`);

        res.on("data", (d) => {
          //   process.stdout.write(d);
          //   //console.log(d);
          response += d;
        });

        res.on("end", function (d) {
          // //console.log(response);
          storesList = JSON.parse(response).data.data;
          resolve(storesList);
          // //console.log(storesList)
          // now you can do what you need to with it including passing it to the socket
        });
      });

      req.on("error", (error) => {
        console.error(error);
        reject(error);
      });

      req.end();
    });
  };

  const substringBetween = (s, a, b) => {
    var p = s.indexOf(a) + a.length;
    return s.substring(p, s.indexOf(b, p));
  };

  const storesApi = await getStores();
  //console.log(storesApi);
  const bigArray = [];
  //   {
  //     "id": "5e991a1e4c9f340011c774cf",
  //     "name": "neiman marcus",
  //     "file": "StoreConnector_Neimanmarcus.js"
  //   }

  for (let store of storesApi) {
    let d = store.domain;
    let n = store.name;
    let u = store.urls[0];
    let id = store.id;
    let dName;

    var num = d.match(/\./g).length;
    if(num===1){
        dName = substringBetween(d, "", ".").replace('-','');  //ray-ban
    }else if(num===2){
        dName = substringBetween(d, ".", ".").replace('-','');  //ray-ban
    }

    let data = {};
    data.id = id;
    data.name = dName;

    for (let i = 0; i < storeFiles.length; i++) {
      let fileName = storeFiles[i];

      let found = fileName.toLowerCase().includes(dName);

      if (found) {
        let foundTemp = fileName.toLowerCase().includes("temp");

        data.file = foundTemp
          ? `StoreConnector_Temp.js`
          : `StoreConnector_${fileName}.js`;
        bigArray.push(data);
        break;
      }
    }
  }

  console.log(bigArray);
  //#endregion
  const finalJson = {
    vendors: "modules.js",
    modules: "modules.js",
    stores: bigArray,
  };

  fs.writeFile(
    `${directoryPath}/description_${evn}.json`,
    JSON.stringify(finalJson),
    function (err) {
      if (err) throw err;
    }
  );
})();
