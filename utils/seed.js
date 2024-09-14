const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data'); // Import functions correctly

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  const users = [];
  const usedUsernames = new Set(); // Set to track used usernames

  // Step 1: Generate random users and thoughts
  for (let i = 0; i < 20; i++) {
    let fullName = getRandomName();
    let username = fullName.split(' ')[0];

    // Ensure the username is unique
    while (usedUsernames.has(username)) {
      fullName = getRandomName();
      username = fullName.split(' ')[0];
    }

    usedUsernames.add(username); // Add unique username to set
    const email = `${username.toLowerCase()}@example.com`; // Create a random email

    const userThoughts = [];
    // Create 1-3 random thoughts for each user
    for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
      const thoughtText = getRandomThought();
      const thought = await Thought.create({ thoughtText, username });
      userThoughts.push(thought._id);
    }

    // Add user with associated thoughts
    users.push({
      username,
      email,
      thoughts: userThoughts,
    });
  }

  await User.insertMany(users); // Insert the users into the database

  console.log('Users and Thoughts seeded successfully!');
  process.exit(0);
});
