const mongoose = require("mongoose");

const DB = `mongodb+srv://${process.env.DB_USERNAME || "madhumathilabglo"}:${
  process.env.DB_PASSWORD || "pjAHbnBx68cByJ9s"
}@cluster0.bpgupso.mongodb.net/${
  process.env.DB_COLLECTION_NAME || "toDolist"
}?retryWrites=true&w=majority`;

async function connectToDatabase() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error);
  }
}

module.exports = connectToDatabase;
