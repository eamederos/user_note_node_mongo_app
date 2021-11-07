const IndexController = {}

IndexController.renderIndex = (req,res)=>{
    res.render('index')
}


IndexController.renderAbout = (req,res)=>{
    res.render('about')
}

module.exports = IndexController