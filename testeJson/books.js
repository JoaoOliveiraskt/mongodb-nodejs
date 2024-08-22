/*
const fs = require('fs')
const path = 'books.json'

const findAllBooks = () => fs.readFile(path, 'utf8', (err, file) => {
    if (err) {
        console.log('erro', err)
        return
    }
    try {
        const data = JSON.parse(file)
        console.log(data)
    } catch (err) {
        console.log('Invalid JSON data:', err)
    }

})
        
findAllBooks()
*/

/*const data = require('./books.json')

data.map(book => (
    console.log([{Title: book.title}])
))*/


const {MongoClient} = require('mongodb')
const books = require('./books.json');

const fetchBooks = async () => {
    const url = 'mongodb://localhost:27017/';
    const client = new MongoClient(url);

    try {
        const db = client.db("store");
        const collection = db.collection("books");
        // const insertBook = await collection.insertMany(books)    
        // const res =  await collection.find().toArray();
        // const res =  await collection.find().sort({author: 1, pages: -1}).skip(5).limit(10).toArray();
        // const res = await collection.find({author: {$ne: "Vyasa"}}).limit(2).toArray();
        // const res = await collection.find({pages: {$gt: 300}}).toArray();
        const res = await collection.find({pages: {$gt: 300, $lt: 1000}}).toArray();
        console.log(res);
    }
    catch (err) {
        console.error(err);
        return;
    }
    finally {
        await client.close();
    }
}

fetchBooks();