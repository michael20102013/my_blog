let mock =(Router)=>{
    const Data = require('./db.json');
    const test = Data.test
    Router.get('/test', (req, res, nest) => {
      res.json({
        code:200,
        messages: 'success',
        data: test
      })
    })    
}
module.exports = mock;