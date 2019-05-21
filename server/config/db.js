console.log("mongodb://" + config.host + "/" + config.dbname)
mongoose.connect("mongodb://" + config.host + "/" + config.dbname, function (err) {
    if (err) {
        console.log(err);
    } else { 
        console.log("DB Connected Successfully");
    }
})