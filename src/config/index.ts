export default {
	firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
	serviceAccount: {
		project_id: process.env.PROJECT_ID,
		private_key: process.env.PRIVATE_KEY,
		client_email: process.env.CLIENT_EMAIL,
	},
};
