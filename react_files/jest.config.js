module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/test/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"

    },
}