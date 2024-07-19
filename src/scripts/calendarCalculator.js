// NumberConversion.js
export default {
    getMonthNameAndDays: function(timestamp) {
      // 将时间戳转换为日期对象
      const date = new Date(timestamp);
      
      // 获取月份名称
      const monthName =  this.arabicToChineseNumber(date.getMonth() + 1) + '月';
      
      // 获取该月的天数
      const year = date.getFullYear();
      const month = date.getMonth();
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
      
      // 生成该月的每一天，并标记是工作日还是周末
      const daysList = [];
      for (let day = 1; day <= lastDayOfMonth; day++) {
        const currentDay = new Date(year, month, day);
        const dayType = currentDay.getDay() % 6 === 0 ? 'weekend' : 'workingDay';
        daysList.push({ day: day, type: dayType });
      }
      
      return { monthName, daysList };
    },
  
    arabicToChineseNumber: function(num) {
      const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      const units = ['', '十', '百', '千'];
      const bigUnits = ['', '万', '亿', '兆'];
  
      if (num === 0) return chineseNumbers[0];
  
      let chineseStr = '';
      let unitIndex = 0;
      let bigUnitIndex = 0;
  
      while (num > 0) {
        let segment = '';
        let segmentNum = num % 10000;
  
        let digitIndex = 0;
        while (segmentNum > 0) {
          let digit = segmentNum % 10;
          if (digit !== 0) {
            segment = chineseNumbers[digit] + units[digitIndex] + segment;
          } else if (segment !== '') {
            segment = chineseNumbers[0] + segment;
          }
          segmentNum = Math.floor(segmentNum / 10);
          digitIndex++;
        }
  
        if (segment !== '') {
          chineseStr = segment + bigUnits[bigUnitIndex] + chineseStr;
        }
        num = Math.floor(num / 10000);
        bigUnitIndex++;
      }
  
      return chineseStr.replace(/零+/g, '零').replace(/零$/, '');
    }
  };
  