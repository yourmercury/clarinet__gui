module.exports = {
    style: {
        postcss: {
            plugins: [
                require("tailwindcss"),
                require("autoprefixer")
            ]
        }
    }
}

//npm i tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9