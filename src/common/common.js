//时间格式化
function myTime() {
    this.time1 = function(){
        let d=new Date()
        let day=d.getDate()
        let month=d.getMonth() + 1
        let year=d.getFullYear()
        return year + '/' + month + '/' + day        
    }
}
// class myTime{
//     constructor(){}
//     time1(){
//         let d=new Date()
//         let day=d.getDate()
//         let month=d.getMonth() + 1
//         let year=d.getFullYear()
//         return year + '/' + month + '/' + day                 
//     }    
// }
 module.exports = {
    myTime
}