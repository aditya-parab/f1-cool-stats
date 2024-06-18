module.exports = {
	// ... other Jest config options
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	moduleNameMapper: {
		"^axios$": "jest-mock-axios",
	},
};
