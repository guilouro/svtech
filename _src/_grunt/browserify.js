module.exports = {
    dist: {
        files: {
            "<%= path.dest %>js/main.js" : [
                "<%= path.src %>js/main.js",
                "<%= path.src %>js/controllers/*.js"
            ]
        }
    }
};