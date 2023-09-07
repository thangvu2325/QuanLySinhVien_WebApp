const Role = require("./app/models/Role");
async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await new Role({
        name: "user",
      }).save();
      console.log("added 'user' to roles collection");

      await new Role({
        name: "HCMUTE",
      }).save();
      console.log("added 'HCMUTE' to roles collection");

      await new Role({
        name: "HCMUT",
      }).save();
      console.log("added 'HCMUT' to roles collection");

      await new Role({
        name: "admin",
      }).save();
      console.log("added 'admin' to roles collection");
    }
  } catch (err) {
    console.log("error", err);
  }
}
module.exports = initial;
