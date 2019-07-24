const express = require('express');
const app = express();

//CRUD - Create (POST), Read (GET), Update (PUT), Delete (DELETE)

let products = [
{
    id: 1,
    name: 'laptop'
},
{
    id: 2,
    name: 'microwave'
}
];

let currentId = 2;

let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.get('/products', (req, res) => {
    res.send({products});
    // res.send({message: 'hello'});
});

app.post('/products', (req, res) => {
    let productName = req.body.name;
    currentId++;
    
    products.push({
        id: currentId,
        name: productName
    });

    res.send('Successfully created product!');
});

app.put('/products/:id', (req, res) => {
    let id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    products.forEach((product, index) => {
        if(!found && product.id === Number(id)) {
            product.name = newName;
        }
    });

    res.send('Successfully updated product!');
});

app.delete('/products/:id', (req, res) => {
    let id = req.params.id;
    let found = false;
    products.forEach((product, index) => {
        if(!found && product.id === Number(id)){
            product.splice(index, 1);
        }
    });
    
    res.send('Sucessfully deleted product!');
});

app.listen(PORT, () => {
    console.log('Server Listening on '+PORT);
});