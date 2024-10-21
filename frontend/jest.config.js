const jetConfig =  {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest"
  },
  moduleNameMapper: {
    // Handle CSS imports for Jest
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // Handle image imports for Jest
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
  }
};

export default jetConfig;


  