var db = new PouchDB('dbname');

db.put({
  _id: 'dave@gmail.com',
  name: 'David',
  age: 68
});

db.changes().on('change', function() {
  console.log('Ch-Ch-Changes');
});

db.replicate.to('data.txt');
