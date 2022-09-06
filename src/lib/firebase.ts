import admin, { ServiceAccount } from "firebase-admin";
import config from "../config";

admin.initializeApp({
	credential: admin.credential.cert(config.serviceAccount as ServiceAccount),
	databaseURL: config.firebaseDatabaseUrl,
});

export default admin;
