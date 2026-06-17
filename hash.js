import bcrypt from "bcryptjs";

const run = async () => {
  const hash = await bcrypt.hash("Love2Code", 10);
  console.log(hash);
};

run();
