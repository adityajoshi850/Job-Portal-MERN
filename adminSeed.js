const bcrypt = require("bcrypt");
const User = require("./model/UserModel"); // or wherever you import User from

const seedAdminUser = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        console.log("ADMIN_EMAIL / ADMIN_PASSWORD missing. Skipping admin seed.");
        return;
    }

    const userAdmin = await User.findOne({
        where: { userEmail: adminEmail },
    });

    if (userAdmin) {
        console.log("Admin user already exists!");
        return;
    }

    // ✅ THIS LINE WAS MISSING IN YOUR FILE
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
        name: "Admin",
        username: "admin",
        userEmail: adminEmail,
        userPassword: hashedPassword, // ✅ now defined
        userRole: "jobprovider",
    });

    console.log("Admin user created successfully!");
};

module.exports = seedAdminUser;
