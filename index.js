const express = require('express');
const http = require("http");
const mongoose = require("mongoose");
const cors = require('cors');
const cron = require('node-cron');
const Products = require('./models/product');
const Users = require('./models/user');
const Vonage = require('@vonage/server-sdk');
const nodemailer = require('nodemailer');
const vonage = new Vonage({
  apiKey: 'd1a71064',
  apiSecret: 'ummlrwteam40uIzP'
});
const from = "Vonage APIs";
const fs = require('fs');
var solc = require('solc');
const Web3 = require('web3');

const ACCOUNT_ADDRESS = '0x9695448338e2fD23FfE59568e20038684D4E026a';
const WEB3_PROVIDER_URL = 'https://rinkeby.infura.io/v3/d8dcbc716e9846ba82f8f5fc16f9c106';
const PRIVATE_KEY = 'c7e0b2e4c28026f5acc1c98fe08a807189941e44fc91159063c55c57cf6df0e3';

const web3 = new Web3(WEB3_PROVIDER_URL);

const source = fs.readFileSync('./contracts/Warranty.sol').toString();

const input = {
  language: 'Solidity',
  sources: { 'Warranty.sol': { content: source } },
  settings: { outputSelection: { '*': { '*': ['*'] } } }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = output.contracts['Warranty.sol']['Warranty'].abi;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', require('./routes/product'));

mongoose.connect("mongodb+srv://raghav:raghav2001@cluster0.msidk.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to Warranty database");
  }).catch(err => {
    console.log("Error connecting to Warranty database", err.message);
  });

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const port = normalizePort(process.env.PORT || "4001");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.listen(port, async () => {
  console.log("Server started on port 4001");
});

cron.schedule('33 23 * * *', () => {
  console.log("running a task every midnigt(1:00 am)");
  (async function () {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    const user = await Users.find({ ExpiryDate: { $eq: date } });
    for (var i = 0; i < user.length; i++) {
      const product = await Products.findById(user[i].product.toString());
      const to = `91${user[i].phoneNo}`;
      const text = `Your warranty for the product ${product.name} has expired and the warranty nft has been revoked.`;
      vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
          } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          }
        }
      });
      var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'flipkartwarrantytest@hotmail.com',
          pass: 'flipkart@nft'
        }
      });

      var mailOptions = {
        from: 'flipkartwarrantytest@hotmail.com',
        to: `${user[i].emailId}`,
        subject: 'Flipkart Warranty nft',
        text: `Your warranty for the product ${product.name} has expired and the warranty nft has been revoked.`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      const newContract = new web3.eth.Contract(abi, user[i].contractAddress);
      const te = await newContract.methods.revoke(user[i].tokenId);
      const data = te.encodeABI();
      const nonce = await web3.eth.getTransactionCount(ACCOUNT_ADDRESS);
      const signedTx1 = await web3.eth.accounts.signTransaction(
        {
          to: user[i].contractAddress,
          data,
          gas: 3000000,
          gasPrice: 20000000000,
          nonce,
          chainId: 4
        },
        PRIVATE_KEY
      );
      const receipt3 = await web3.eth.sendSignedTransaction(signedTx1.rawTransaction);
      console.log(receipt3);
      await Products.findOneAndUpdate({ _id: user[i].product.toString() }, {
        $pull: { users: user[i]._id.toString() }
      }, { new: true });
      await Users.findOneAndDelete({ _id: user[i]._id.toString() });
    }
  })();
})