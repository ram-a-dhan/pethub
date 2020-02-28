module.exports = {
    emptyFields: function(array) {
        let isEmpty = false
        array.forEach(a => {
            if (a==='') {
                isEmpty = true
            }
        })
        return isEmpty
    }
}