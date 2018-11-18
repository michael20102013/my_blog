//时间格式化
function MYTime() {
    this.time = function () {
        let d = new Date();
        let hours = d.getHours();
        let minute = d.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        return `${year}/${month}/${day}/${hours}:${minute}`
    }
}

export {
    MYTime
}