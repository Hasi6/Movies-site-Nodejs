const mongoose = require('mongoose');

const CountriesShema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

const CountryShema = mongoose.model('Countries', CountriesShema);

module.exports = CountryShema;