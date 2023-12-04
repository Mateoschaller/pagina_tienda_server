const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
    access_token: "APP_USR-811352388423505-112722-a8489ed97cb1fda93797f6412ae937f9-304028190",
});

app.get("/", function (req, res) {
    res.send("el servidor de mercado pago funciona! :)");
});

app.post("/create_preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            },
        ],
        back_urls: {
            success: "https://www.akinatorfamiliar.online",
            failure: "https://www.akinatorfamiliar.online",
            pending: "",
        },
        auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('the server is now running on port',{PORT});
});