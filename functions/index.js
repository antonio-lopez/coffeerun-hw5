const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-coffeerun-fb27b.firebaseio.com"
});

const express = require('express');
const app = express();
const db = admin.firestore();

const cors = require('cors');
app.use(cors ( { origin:true } ) );

// STARTER ROUTES
//starter demo
app.get('/hello-world', (req, res) => {
    return res.status(200).send('hello world');
});

//create
//POST
app.post('/api/create', (req, res) => {
    (async () => {
        try {
            //await db.collection('coffee').doc('/' + req.body.id + '/')
            await db.collection('coffee').doc()
            .create({
                coffee: req.body.coffee.toLowerCase(),
                emailAddress: req.body.emailAddress.toLowerCase(),
                size: req.body.size.toLowerCase(),
                flavor: req.body.flavor.toLowerCase(),
                strength: req.body.strength
            })
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

//read a specific product based on ID
//GET
app.get('/api/read/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('coffee').doc(req.params.id);
            let coffee = await document.get();
            let response = coffee.data();

            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});


//read all coffees
//GET
app.get('/api/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('coffee');
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;  //the result of the query

                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        coffee: doc.data().coffee,
                        emailAddress: doc.data().emailAddress,
                        flavor: doc.data().flavor,
                        size: doc.data().size,
                        strength: doc.data().strength
                    };
                    response.push(selectedItem);
                }
                return response;    //each THEN should return a value
            })
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

//delete
app.delete('/api/delete/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('coffee').doc(req.params.id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

// GET ROUTES ========================================================================================================================

//GET a specific coffee
app.get('/api/coffee/:coffee', (req, res) => {
    (async () => {
        try {
            const selectedCoffee = req.params.coffee;
            let query = db.collection('coffee').where('coffee', '==', selectedCoffee);
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;  //the result of the query

                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        coffee: doc.data().coffee,
                        emailAddress: doc.data().emailAddress,
                        flavor: doc.data().flavor,
                        size: doc.data().size,
                        strength: doc.data().strength
                    };
                    response.push(selectedItem);
                }
                return response;    //each THEN should return a value
            })
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

//GET a specific email
app.get('/api/email/:emailAddress', (req, res) => {
    (async () => {
        try {
            const selectedEmail = req.params.emailAddress;
            let query = db.collection('coffee').where('emailAddress', '==', selectedEmail);
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;  //the result of the query

                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        coffee: doc.data().coffee,
                        emailAddress: doc.data().emailAddress,
                        flavor: doc.data().flavor,
                        size: doc.data().size,
                        strength: doc.data().strength
                    };
                    response.push(selectedItem);
                }
                return response;    //each THEN should return a value
            })
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

//GET a specific flavor
app.get('/api/flavor/:flavor', (req, res) => {
    (async () => {
        try {
            const selectedFlavor = req.params.flavor;
            let query = db.collection('coffee').where('flavor', '==', selectedFlavor);
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;  //the result of the query

                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        coffee: doc.data().coffee,
                        emailAddress: doc.data().emailAddress,
                        flavor: doc.data().flavor,
                        size: doc.data().size,
                        strength: doc.data().strength
                    };
                    response.push(selectedItem);
                }
                return response;    //each THEN should return a value
            })
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

//GET a specific strength
app.get('/api/strength/:strength', (req, res) => {
    (async () => {
        try {
            const selectedStrength = parseInt(req.params.strength);
            let query = db.collection('coffee').where('strength', '==', selectedStrength);
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;  //the result of the query

                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        coffee: doc.data().coffee,
                        emailAddress: doc.data().emailAddress,
                        flavor: doc.data().flavor,
                        size: doc.data().size,
                        strength: doc.data().strength
                    };
                    response.push(selectedItem);
                }
                return response;    //each THEN should return a value
            })
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

//GET a specific size
app.get('/api/size/:size', (req, res) => {
    (async () => {
        try {
            const selectedSize = req.params.size;
            let query = db.collection('coffee').where('size', '==', selectedSize);
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;  //the result of the query

                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        coffee: doc.data().coffee,
                        emailAddress: doc.data().emailAddress,
                        flavor: doc.data().flavor,
                        size: doc.data().size,
                        strength: doc.data().strength
                    };
                    response.push(selectedItem);
                }
                return response;    //each THEN should return a value
            })
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

// DELETE ROUTES ========================================================================================================================

//DELETE a specific coffee
app.delete('/api/delete/:coffee', (req, res) => {
    (async () => {
        try {
            //const selectedSize = req.params.coffee;
            const document = db.collection('coffee').doc(req.params.coffee);
            //const document = db.collection('coffee').where('coffee', '==', coffee);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

// app.delete('/api/delete/:id', (req, res) => {
//     (async () => {
//         try {
//             const document = db.collection('coffee').doc(req.params.id);
//             await document.delete();
//             return res.status(200).send();
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error);
//         }

//     })();
// });

//export the api to firebase cloud functions
exports.app = functions.https.onRequest(app);