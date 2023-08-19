// const mongoose = require('mongoose');

// const srvUrl = `mongodb+srv://testmailpush2:Hello123@cluster0.bilvv1r.mongodb.net/waterinsight?retryWrites=true&w=majority`;
// // Connect to the database using Mongoose
// mongoose.connect(srvUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to the database!');

//     // Check if the desired collection exists
//     mongoose.connection.db["test"].listCollections({ name: 'SatelliteData' })
//       .next((err, collinfo) => {
//         if (err) {
//           console.error(err);
//         } else if (!collinfo) {
//           console.error(`Collection ${collectionName} not found!`);
//         } else {
//           // Get a reference to the existing collection
//           const myCollection = mongoose.connection.db.collection(collectionName);

//           // Read records from the collection
//           myCollection.find({}, (err, docs) => {
//             if (err) {
//               console.error(err);
//             } else {
//               console.log(docs);
//             }
//           });
//         }

//         // Close the database connection when done
//         mongoose.connection.close();
//       });
//   })
//   .catch((err) => console.error(err));





// var date = '12/18/2023'
// console.log(new Date(date).toISOString())
const moment = require('moment');

const dateValue = "24/3/2023, 5:13:53 pm";
const dateObj = moment(dateValue, "D/M/YYYY, h:mm:ss a").toISOString();
console.log(dateObj); // outputs: 2023-03-24T16:13:53.000Z

