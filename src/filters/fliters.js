import { max } from "mathjs";

let filters = {
	//过滤走势图的字符串
	filterTrendStr(str, id) {
		let index = str.indexOf('_');
		//如果没有代表此处没有需要显示的信息
		if (index == -1) return;
		if (id == 0) {	//截取期号
			return str.slice(0, index);
		} else {	//截取显示信息
			return str.slice(index + 1, str.length);
		}
	},
	filterGG(n, s) {
			if (n.split(',').length > 1) { 
				n = filters.filtersSum(n)
			}
			if (n > s) return '大'
			else if (n < s) return '小'
			if (n == 30) return '和'
			},
  filterDx(n1, n2) {
    n1 = n1 + ''
    if (n1.split(',').length > 1) {
      n1 = filters.filtersSum(n1)
    }
    if (n1 > n2) return '大'
    else return '小'
  },
  filterDxH(n, s) {
    if (n.split(',').length > 1) {
      n = filters.filtersSum(n)
    }
    if (n > s && n != 49) return '大'
    else if (n <= s) return '小'
    if (n == 49) return '和'
  },
  filterSum(arr) {
    return filters.filtersSum(arr)
  },
  filterDs(n, flag) {
    n = n + ''
    if (n.split(',').length > 1) {
      n = filters.filtersSum(n)
    }
    if (n % 2 == 0) return '双'
    else return '单'
  },
  filterZh(num) {
    //if(n==0||n==4||n==6||n==8||n==9) return '合'
    //else return '质'
    if (num == 0) return '合'
    for (var i = 2; i < num / 2 + 1; i++) {
      if (num % i == 0) {
        return '合'
      }
    }
    return '质'
  },
  filterColor(n) {
    let color = ''
    if (n == '大') color = 'bigColor'
    else if (n == '小') color = 'smallColor'
    else if (n == '单') color = 'oddColor'
    else if (n == '双') color = 'evenColor'
    else if (n == '质') color = 'zhiColor'
    else if (n == '合') color = 'heColor'
    else if (n == '龙') color = 'longColor'
    else if (n == '虎') color = 'huColor'
    else if (n == '和') color = 'heeColor'
    else if (n == '尾大') color = 'wdColor'
    else if (n == '尾小') color = 'wxColor'
    else if (n == '合单') color = 'hdColor'
    else if (n == '合双') color = 'hsColor'
    else if (n == '合大') color = 'hdColor'
    else if (n == '合小') color = 'hxColor'
    else if (n == '中') color = 'zColor'
    else if (n == '发') color = 'fColor'
    else if (n == '白') color = 'bColor'
    else if (n == '东') color = 'dongColor'
    else if (n == '南') color = 'nanColor'
    else if (n == '西') color = 'xiColor'
    else if (n == '北') color = 'beiColor'
    else if (n == '前') color = 'afterColor'
    else if (n == '后') color = 'beforeColor'
    else if (n == '单') color = 'moreOddColor'
    else if (n == '双') color = 'moreEvenColor'
    else if (n == '金') color = 'goldenColor'
    else if (n == '木') color = 'muColor'
    else if (n == '水') color = 'waterColor'
    else if (n == '火') color = 'fireColor'
    else if (n == '土') color = 'tuColor'
    else if (n == '小单') color = 'xOddColor'
    else if (n == '大单') color = 'bOddColor'
    else if (n == '小双') color = 'xEvenColor'
    else if (n == '大双') color = 'dEvenColor'
    else if (n == '红') color = 'redColor'
    else if (n == '绿') color = 'greenColor'
    else if (n == '蓝') color = 'blueColor'
    else if (n == '无') color = 'wuColor'
    else if (n == '杂六') color = 'zlColor'
    else if (n == '对子') color = 'dzColor'
    else if (n == '顺子') color = 'szColor'
    else if (n == '半顺') color = 'bsColor'
    else if (n == '闲') color = 'xianColor'
    else if (n == '庄') color = 'zhuangColor'
    else if (n == '左闲') color = 'zxianColor'
    else if (n == '右闲') color = 'yxianColor'
    else if (n == '五离') color = 'wuliColor'
    else if (n == '两对') color = 'liangduiColor'
    else if (n == '葫芦') color = 'huluColor'
    else if (n == '豹子') color = 'baoziColor'
    else if (n == '三张') color = 'sanzColor'
    else if (n == '四张') color = 'sizColor'
    return color
  },
  filterBgColor(n) {
    let bg = ''
    if (n == '大') bg = 'dadaColor'
    else if (n == '小') bg = 'xxColor'
    else if (n == '单') bg = 'ddColor'
    else if (n == '双') bg = 'ssColor'
    else if (n == '质') bg = 'orange'
    else if (n == '合') bg = 'blue'
    else if (n == '龙') bg = 'longBg'
    else if (n == '虎') bg = 'huBg'
    else if (n == '和') bg = 'heBg'
    else if (n == '尾大') bg = 'wdBg'
    else if (n == '尾小') bg = 'wxBg'
    else if (n == '合单') bg = 'hdBg'
    else if (n == '合双') bg = 'hsBg'
    else if (n == '中') bg = 'zBg'
    else if (n == '发') bg = 'fBg'
    else if (n == '白') bg = 'bBg'
    else if (n == '东') bg = 'dongBg'
    else if (n == '南') bg = 'nanBg'
    else if (n == '西') bg = 'xiBg'
    else if (n == '北') bg = 'beiBg'
    else if (n == '前') bg = 'afterBg'
    else if (n == '后') bg = 'beforeBg'
    else if (n == '单') bg = 'moreOddBg'
    else if (n == '双') bg = 'moreEvenBg'
    else if (n == '金') bg = 'goldenBg'
    else if (n == '木') bg = 'muBg'
    else if (n == '水') bg = 'waterBg'
    else if (n == '火') bg = 'fireBg'
    else if (n == '土') bg = 'tuBg'
    else if (n == '小单') bg = 'xOddBg'
    else if (n == '大单') bg = 'bOddBg'
    else if (n == '小双') bg = 'xEvenBg'
    else if (n == '大双') bg = 'dEvenBg'
    else if (n == '红') bg = 'redBg'
    else if (n == '绿') bg = 'greenBg'
    else if (n == '蓝') bg = 'blueBg'
    else if (n == '无') bg = 'wuBg'
    else if (n == '极大') bg = 'mostbBg'
    else if (n == '极小') bg = 'mostsBg'
    else if (n == '杂六') bg = 'zlBg'
    else if (n == '对子') bg = 'dzBg'
    else if (n == '顺子') bg = 'szBg'
    else if (n == '半顺') bg = 'bsBg'
    else if (n == '闲') bg = 'xianBg'
    else if (n == '庄') bg = 'zhuangBg'
    else if (n == '左闲') bg = 'zxianBg'
    else if (n == '右闲') bg = 'yxianBg'
    else if (n == '五离') bg = 'wuliBg'
    else if (n == '两对') bg = 'liangduiBg'
    else if (n == '一对') bg = 'yiduiBg'
    else if (n == '葫芦') bg = 'huluBg'
    else if (n == '豹子') bg = 'baoziBg'
    else if (n == '三张') bg = 'sanzBg'
    else if (n == '四张') bg = 'sizBg'
    return bg
  },
  filterBgColorNew(n) {
    let bg1 = ''
    if (n == '大') bg1 = 'dadaColorNew'
    else if (n == '小') bg1 = 'xxColorNew'
    else if (n == '单') bg1 = 'ddColorNew'
    else if (n == '双') bg1 = 'ssColorNew'
    else if (n == '龙') bg1 = 'longBgNew'
    else if (n == '虎') bg1 = 'huBgNew'
    else if (n == '和') bg1 = 'heBgNew'
    return bg1
  },
  filterLhh(arr, name) {
    if (typeof arr == 'string') arr = arr.split(',')
    let r = ''
    if (name == '万个') {
      r = filters.getLhh(arr[0], arr[4])
    } else if (name == '万十') {
      r = filters.getLhh(arr[0], arr[3])
    } else if (name == '万百') {
      r = filters.getLhh(arr[0], arr[2])
    } else if (name == '万千') {
      r = filters.getLhh(arr[0], arr[1])
    } else if (name == '千百') {
      r = filters.getLhh(arr[1], arr[2])
    } else if (name == '千十') {
      r = filters.getLhh(arr[1], arr[3])
    } else if (name == '千个') {
      r = filters.getLhh(arr[1], arr[4])
    } else if (name == '百十') {
      r = filters.getLhh(arr[2], arr[3])
    } else if (name == '百个') {
      r = filters.getLhh(arr[2], arr[4])
    } else if (name == '十个') {
      r = filters.getLhh(arr[3], arr[4])
    } else if (name == '一八') {
      if (Number(arr[0]) > Number(arr[7])) return '龙'
      else return '虎'
    } else if (name == '十v一') {
      if (Number(arr[0]) > Number(arr[9])) return '龙'
      else return '虎'
    } else if (name == '九v二') {
      if (Number(arr[1]) > Number(arr[8])) return '龙'
      else return '虎'
    } else if (name == '八v三') {
      if (Number(arr[2]) > Number(arr[7])) return '龙'
      else return '虎'
    } else if (name == '七v四') {
      if (Number(arr[3]) > Number(arr[6])) return '龙'
      else return '虎'
    } else if (name == '六v五') {
      if (Number(arr[4]) > Number(arr[5])) return '龙'
      else return '虎'
    } else if (name == '一v三') {
      if (Number(arr[0]) > Number(arr[2])) return '龙'
      else if (Number(arr[0]) < Number(arr[2])) return '虎'
      else return '和'
    }else if (name == '一v五') {
      if (Number(arr[0]) > Number(arr[4])) return '龙'
      else if (Number(arr[0]) < Number(arr[4])) return '虎'
      else return '和'
    }
    return r
  },
  filterNn(numArr) {
    if (typeof numArr == 'string') numArr = numArr.split(',')
    let is_niu = 'false'
    let niu_ji = ''
    let niu_text = ''
    if (
      (parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[3]) + parseInt(numArr[4])) % 10
    } else if (
      (parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[3])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[2]) + parseInt(numArr[4])) % 10
    } else if (
      (parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[4])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[2]) + parseInt(numArr[3])) % 10
    } else if (
      (parseInt(numArr[0]) + parseInt(numArr[2]) + parseInt(numArr[3])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[1]) + parseInt(numArr[4])) % 10
    } else if (
      (parseInt(numArr[0]) + parseInt(numArr[2]) + parseInt(numArr[4])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[1]) + parseInt(numArr[3])) % 10
    } else if (
      (parseInt(numArr[0]) + parseInt(numArr[3]) + parseInt(numArr[4])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[1]) + parseInt(numArr[2])) % 10
    } else if (
      (parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[0]) + parseInt(numArr[4])) % 10
    } else if (
      (parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[4])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[0]) + parseInt(numArr[3])) % 10
    } else if (
      (parseInt(numArr[1]) + parseInt(numArr[3]) + parseInt(numArr[4])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[0]) + parseInt(numArr[2])) % 10
    } else if (
      (parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4])) %
      10 ==
      0
    ) {
      is_niu = 'true'
      niu_ji = (parseInt(numArr[0]) + parseInt(numArr[1])) % 10
    }
    if (is_niu === 'true') {
      if (niu_ji === 0) {
        niu_text = '牛牛'
      } else {
        niu_text = `牛${niu_ji}`
      }
    } else {
      niu_text = '无牛'
    }
    return niu_text
  },
  filterSg(arr) {
    if (typeof arr == 'string') arr = arr.split(',')
    let z = arr[0] - 0 + (arr[1] - 0) + (arr[2] - 0) + ''
    let x = arr[2] - 0 + (arr[3] - 0) + (arr[4] - 0) + ''
    z = z.substr(z.length - 1, 1) - 0
    x = x.substr(x.length - 1, 1) - 0
    if (z == 0) z = 10
    if (x == 0) x = 10
    if (z > x) {
      return '左闲'
    } else if (z == x) {
      return '和'
    } else {
      return '右闲'
    }
  },
  filterSh(a) {
    if (typeof a == 'string') a = a.split(',')
    let value = ''
    let arr = filters.GetData(a)
    for (let k = 0; k < arr.length; k++) {
      if (
        (arr.length == 5 &&
          arr[1].date - arr[0].date == 1 &&
          arr[2].date - arr[1].date == 1 &&
          arr[3].date - arr[2].date == 1 &&
          arr[4].date - arr[3].date == 1) ||
        filters.szTS(a.join(','))
      )
        return (value = '顺子')
      else if (
        arr.length == 5 &&
        arr[1].date - arr[0].date == 2 &&
        arr[2].date - arr[1].date == 2 &&
        arr[3].date - arr[2].date == 2 &&
        arr[4].date - arr[3].date == 2
      )
        return (value = '五离')
      else if (arr.length == 5) value = '杂六'
      else if (arr.length == 4) value = '对子'
      else if (arr.length == 3 && arr[k].count == 3) return (value = '三张')
      else if (arr.length == 3) value = '两对'
      else if (arr.length == 2 && arr[k].count == 4) return (value = '四张')
      else if (arr.length == 2) value = '葫芦'
      else if (arr.length == 1) value = '豹子'
    }
    return value
  },
  //佰拾个和
  filterBSGH(a) {
    a = a.split(',')
    let sum = 0
    for (let k = 0; k < a.length; k++){
      sum += (a[k]-0)
    }
    if(sum < 7){
      sum = '0~7';
    }else if(sum > 20 ){
      sum = "21~27"
    }else{
      sum = sum
    }
    return sum
  },
  //跨度
  filterFC3DKD(a) {
    a = a.split(',')
    let sum = 0
    let maxnum = (a[0]-0);
    let minnum = (a[0]-0);
    if((a[0]-0) == (a[1]-0) && (a[0]-0) == (a[2]-0)){
      return  "豹子"
    }
    for (let k = 0; k < a.length; k++){
      if(maxnum < (a[k]-0)){
        maxnum = (a[k]-0)
      }
      if(minnum > (a[k]-0)){
        minnum = (a[k]-0)
      }
    }

    return maxnum - minnum;
  },
  filterCdp(a) {
    let arr = filters.GetData(a)
    let arrSum = []
    let value = ''
    for (let j = 0; j < arr.length; j++) {
      arrSum.push(arr[j].date)
    }
    for (let k = 0; k < arr.length; k++) {
      if (arr.length == 3) {
        value = '长牌--' + filters.doCp(filters.getRank(arrSum, 2))
      } else if (arr.length == 2) {
        value =
          arr[0].count == 2
            ? arr[0].date + arr[0].date
            : arr[1].date + arr[1].date
        value = '短牌--' + value
      } else {
        value = '豹子'
      }
    }
    return value
  },
  filterHds(a) {
    if (a.length <= 1) {
      if (a % 2 == 0) {
        return '合双'
      } else {
        return '合单'
      }
    } else {
      a = a.split(',')
      let sum = 0
      for (let i = 0, len = a.length; i > len; i++) {
        sum += parseInt(a[i])
      }
      if (sum % 2 == 0) {
        return '合双'
      } else {
        return '合单'
      }
    }
  },
  filterSixTmHds(a) {
	  if(a==49) return '和'
    if (a.length <= 1) {
      if (a % 2 == 0) {
        return '合双'
      } else {
        return '合单'
      }
    } else {
      let s1 = a.substr(0,1);
      let s2 = a.substr(1,1);
      let sum = parseInt(s1)+parseInt(s2);
      if (sum % 2 == 0) {
        return '合双'
      } else {
        return '合单'
      }
    }
  },
  filterSixTmHdx(a) {
    if(a==49) return '和'
    if (a.length <= 1) {
      if (a > 6) {
        return '合大'
      } else {
        return '合小'
      }
    } else {
      let s1 = a.substr(0,1);
      let s2 = a.substr(1,1);
      let sum = parseInt(s1)+parseInt(s2);
      if (sum > 6) {
        return '合大'
      } else {
        return '合小'
      }
    }
  },
  filterSixQsb(a){
    a = a.split(',')
    for (let i = 0, len = a.length; i > len; i++) {
      filters.filterSixBs(a[i])
    }
  },
  filterWdx(a) {
    a = a + ''
    if(a == 49) return '和'
    a = a.charAt(a.length - 1)
    if (a >= 5) return '尾大'
    else return '尾小'
  },
  filterZfb(n) {
    if (parseInt(n) < 8) return '中'
    else if (parseInt(n) < 15) return '发'
    else return '白'
  },
  filterDnxb(n) {
    let r = ''
    switch (parseInt(n)) {
      case 1:
      case 5:
      case 9:
      case 13:
      case 17:
        r = '东'
        break
      case 2:
      case 6:
      case 10:
      case 14:
      case 18:
        r = '南'
        break
      case 3:
      case 7:
      case 11:
      case 15:
      case 19:
        r = '西'
        break
      case 4:
      case 8:
      case 12:
      case 16:
      case 20:
        r = '北'
        break
      default:
        break
    }
    return r
  },
  filgerBjl(arr) {
    if (typeof arr == 'string') arr = arr.split(',')
    let value = ''
    let z = arr[0] - 0 + (arr[1] - 0) + ''
    z = z.substr(z.length - 1, 1) - 0
    let x = arr[3] - 0 + (arr[4] - 0) + ''
    x = x.substr(x.length - 1, 1) - 0
    let four = arr[2] - 0 + (arr[4] - 0) + ''
    four = four.substr(four.length - 1, 1) - 0
    let six = arr[0] - 0 + (arr[2] - 0) + ''
    six = six.substr(six.length - 1, 1) - 0
    if (z >= 8 || x >= 8 || (z >= 6 && x >= 6)) {
    } else if (x < 6) {
      x += four
      if (z <= 2) {
        z += six
      } else if (z == 3 && four != 8) {
        z += six
      } else if (z == 4 && four != 0 && four != 1 && four != 8 && four != 9) {
        z += six
      } else if ((z == 5 && four == 4) || four == 5 || four == 6 || four == 7) {
        z += six
      } else if ((z == 6 && four == 6) || four == 7) {
        z += six
      }
    } else if (x > 6) {
      z += four
    }
    z = z + ''
    z = z.substr(z.length - 1, 1) - 0
    x = x + ''
    x = x.substr(x.length - 1, 1) - 0
    z > x ? (value = '庄') : (value = '闲')
    if (z == x) value = '和'
    return value
  },
  filgerQhh(arr) {
    if (typeof arr == 'string') arr = arr.split(',')
    let c1 = 0
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] < 41) c1++
    }
    if (c1 > 10) return '前'
    else if (c1 < 10) return '后'
    else return '和'
  },
  filgerDsh(arr) {
    if (typeof arr == 'string') arr = arr.split(',')
    let c1 = 0
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] % 2 != 0) c1++
    }
    if (c1 > 10) return '单'
    else if (c1 < 10) return '双'
    else return '和'
  },
  filterWh(arr) {
    let sum = filters.filtersSum(arr)
    if (sum > 209 && sum < 696) return '金'
    else if (sum > 695 && sum < 764) return '木'
    else if (sum > 763 && sum < 856) return '水'
    else if (sum > 855 && sum < 924) return '火'
    else if (sum > 923 && sum < 1411) return '土'
  },
  filterPk10DxH(arr, n) {
    arr = arr.split(',')
    if (parseInt(arr[0]) + parseInt(arr[1]) > n) return '大'
    else if (parseInt(arr[0]) + parseInt(arr[1]) < n) return '小'
    else return '和'
  },
	filterPK10ElseDX(arr) {
    // //console.log(arr)
		arr = arr.split(',')
		if (parseInt(arr[0]) + parseInt(arr[1]) > 11) return '大'
		else if (parseInt(arr[0]) + parseInt(arr[1]) <= 11) return '小'
	},
  filterPk10Ds(arr) {
    arr = arr.split(',')
    if ((parseInt(arr[0]) + parseInt(arr[1])) % 2 == 0) return '双'
    else return '单'
  },
  filterXXDxh(n, name) {
    if (name == 'sfc') {
      if (n == 21) return '和'
      else if (n < 11) return '小'
      else return '大'
    } else if (name == '11x5') {
      if (n == 11) return '和'
      else if (n < 6) return '小'
      else return '大'
    }
  },
  filterXXDsh(n, name) {
    if (name == 'sfc') {
      if (n == 21) return '和'
      else if (n % 2 == 0) return '双'
      else return '单'
    } else if (name == '11x5') {
      if (n == 11) return '和'
      else if (n % 2 == 0) return '双'
      else return '单'
    }
  },
  // filterBs(a, num) {
  //   if (typeof a == 'string') a = a.split(',')
  //   let newArr
  //   let value = ''
  //   if (num == 1) newArr = a.slice(0, 3)
  //   else if (num == 2) newArr = a.slice(1, 4)
  //   else newArr = a.slice(2, 5)
  //   if (num) {
  //     if (num == 1) newArr = a.slice(0, 3)
  //     else if (num == 2) newArr = a.slice(1, 4)
  //     else newArr = a.slice(2, 5)
  //   } else {
  //     newArr = a
  //   }
  //   let arr = filters.GetData(newArr)
  //   for (let k = 0, len = arr.length; k < len; k++) {
  //     if (
  //       (arr.length == 3 &&
  //         arr[1].date - arr[0].date == 1 &&
  //         arr[2].date - arr[1].date == 1) ||
  //       filters.szTSw(arr.join(','))
  //     )
  //       value = '顺子'
  //       else if (
  //         arr.length == 3 &&
  //         (arr[0].date == 0 && arr[1].date == 8 && arr[2].date == 9)
  //       )
  //         value = '顺子'
  //     else if (arr.length == 2) value = '对子'
  //     else if (
  //       arr.length == 3 &&
  //       (arr[1].date - arr[0].date == 1 || arr[2].date - arr[1].date == 1)
  //     )
  //       value = '半顺'
  //     else if (arr.length == 2 && arr[1].date - arr[0].date == 1) value = '半顺'
  //     else if (arr.length == 1) value = '豹子'
  //     else value = '杂六'
  //   }
  //   return value
  // },
  filterBs(a, num) {
    if (typeof a == 'string') a = a.split(',')
    let newArr
    let value = ''
    if (num == 1) newArr = a.slice(0, 3)
    else if (num == 2) newArr = a.slice(1, 4)
    else newArr = a.slice(2, 5)
    if (num) {
      if (num == 1) newArr = a.slice(0, 3)
      else if (num == 2) newArr = a.slice(1, 4)
      else newArr = a.slice(2, 5)
    } else {
      newArr = a
    }
    let arr = filters.GetData(newArr)
    for (let k = 0, len = arr.length; k < len; k++) {
      if (
        (arr.length == 3 &&
          arr[1].date - arr[0].date == 1 &&
          arr[2].date - arr[1].date == 1) ||
        filters.szTSw(arr.join(','))
      )
        value = '顺子'
      else if (
        arr.length == 3 &&
        (arr[0].date == 0 && arr[1].date == 8 && arr[2].date == 9)
      )
        value = '顺子'
      else if (arr.length == 2) value = '对子'
      else if (
        arr.length == 3 &&
        ((arr[1].date - arr[0].date == 1 || arr[2].date - arr[1].date == 1)||Math.max.apply(null, arr)-Math.min.apply(null, arr)==9)
      )
        value = '半顺'
      else if (arr.length == 2 && arr[1].date - arr[0].date == 1) value = '半顺'
      else if (arr.length == 1) value = '豹子'
      else value = '杂六'
    }
    return value
  },
  filterMixDsDx(a) {
    let r = ''
    a = filters.filtersSum(a)
    if (a % 2 == 0) {
      if (a > 12) r = '大双'
      else r = '小双'
    } else {
      if (a > 13) r = '大单'
      else r = '小单'
    }
    return r
  },
  filterKlcDsDx(a) {
    let r = ''
    a = filters.filtersSum(a)
    if (a % 2 == 0) {
      if (a > 810) r = '大双'
      else if (a < 810) r = '小双'
      else '--'
    } else {
      if (a > 810) r = '大单'
      else if (a < 810) r = '小单'
      else '--'
    }
    return r
  },
  filterMinDx(a) {
    a = filters.filtersSum(a)
    if (a > 22) return '极大'
    else if (a < 5) return '极小'
    //else return '无'
  },
  filtersSum(arr) {
    if (typeof arr == 'string') arr = arr.split(',')
    let sum = 0
    for (let i = 0, len = arr.length; i < len; i++) {
      sum += parseInt(arr[i])
    }
    return sum
  },
  filterHll(a) {
    a = filters.filtersSum(a)
    let r = ''
    switch (a - 0) {
      case 3:
      case 6:
      case 9:
      case 12:
      case 15:
      case 18:
      case 21:
      case 24:
        r = '红'
        break
      case 1:
      case 4:
      case 7:
      case 10:
      case 16:
      case 19:
      case 22:
      case 25:
        r = '绿'
        break
      case 2:
      case 5:
      case 8:
      case 11:
      case 17:
      case 20:
      case 23:
      case 26:
        r = '蓝'
        break
      default:
        r = '无'
        break
    }
    return r
  },
  
   //2020
   filterSixSXx(a) {
    a = filters.filtersSum(a)
    let r = ''
    switch (a - 0) {
      case 12:
      case 24:
      case 36:
      case 48:
        r = '牛'
        break
      case 11:
      case 23:
      case 35:
      case 47:
        r = '虎'
        break
      case 10:
      case 22:
      case 34:
      case 46:
        r = '兔'
        break
      case 9:
      case 21:
      case 33:
      case 45:
        r = '龙'
        break
      case 8:
      case 20:
      case 32:
      case 44:
        r = '蛇'
        break
      case 7:
      case 19:
      case 31:
      case 43:
        r = '马'
        break
      case 6:
      case 18:
      case 30:
      case 42:
        r = '羊'
        break
      case 5:
      case 17:
      case 29:
      case 41:
        r = '猴'
        break
      case 4:
      case 16:
      case 28:
      case 40:
        r = '鸡'
        break
      case 3:
      case 15:
      case 27:
      case 39:
        r = '狗'
        break
      case 2:
      case 14:
      case 26:
      case 38:
        r = '猪'
        break
      case 1:
      case 13:
      case 25:
      case 37:
      case 49:
        r = '鼠'
        break
      
      default:
        r = '无'
        break
    }
    return r
  },  
//2021
filterSixSX(a,issue) {
  if(issue<2021013){
    return filters.filterSixSXx(a)
  }
  a = filters.filtersSum(a)
  let r = ''
  switch (a - 0) {
    case 12:
    case 24:
    case 36:
    case 48:
      r = '虎'
      break
    case 11:
    case 23:
    case 35:
    case 47:
      r = '兔'
      break
    case 10:
    case 22:
    case 34:
    case 46:
      r = '龙'
      break
    case 9:
    case 21:
    case 33:
    case 45:
      r = '蛇'
      break
    case 8:
    case 20:
    case 32:
    case 44:
      r = '马'
      break
    case 7:
    case 19:
    case 31:
    case 43:
      r = '羊'
      break
    case 6:
    case 18:
    case 30:
    case 42:
      r = '猴'
      break
    case 5:
    case 17:
    case 29:
    case 41:
      r = '鸡'
      break
    case 4:
    case 16:
    case 28:
    case 40:
      r = '狗'
      break
    case 3:
    case 15:
    case 27:
    case 39:
      r = '猪'
      break
    case 2:
    case 14:
    case 26:
    case 38:
      r = '鼠'
      break
    case 1:
    case 13:
    case 25:
    case 37:
    case 49:
      r = '牛'
      break
    
    default:
      r = '无'
      break
  }
  return r
},
  filterSixBs(n) {
    let ballColor = ''
    switch (n - 0) {
      case 1:
      case 2:
      case 7:
      case 8:
      case 12:
      case 13:
      case 18:
      case 19:
      case 23:
      case 24:
      case 29:
      case 30:
      case 34:
      case 35:
      case 40:
      case 45:
      case 46:
        ballColor = 'redBg'
        break
      case 5:
      case 6:
      case 11:
      case 16:
      case 17:
      case 21:
      case 22:
      case 27:
      case 28:
      case 32:
      case 33:
      case 38:
      case 39:
      case 43:
      case 44:
      case 49:
        ballColor = 'greenBg'
        break
      case 3:
      case 4:
      case 9:
      case 10:
      case 14:
      case 15:
      case 20:
      case 25:
      case 26:
      case 31:
      case 36:
      case 37:
      case 41:
      case 42:
      case 47:
      case 48:
        ballColor = 'blueBg'
        break
      default:
        break
    }
    return ballColor
  },
  filterSixBs1(n) {
    let ballColor = ''
    switch (n - 0) {
      case 1:
      case 2:
      case 7:
      case 8:
      case 12:
      case 13:
      case 18:
      case 19:
      case 23:
      case 24:
      case 29:
      case 30:
      case 34:
      case 35:
      case 40:
      case 45:
      case 46:
        ballColor = 'redBg1'
        break
      case 5:
      case 6:
      case 11:
      case 16:
      case 17:
      case 21:
      case 22:
      case 27:
      case 28:
      case 32:
      case 33:
      case 38:
      case 39:
      case 43:
      case 44:
      case 49:
        ballColor = 'greenBg1'
        break
      case 3:
      case 4:
      case 9:
      case 10:
      case 14:
      case 15:
      case 20:
      case 25:
      case 26:
      case 31:
      case 36:
      case 37:
      case 41:
      case 42:
      case 47:
      case 48:
        ballColor = 'blueBg1'
        break
      default:
        break
    }
    return ballColor
  },
  filterSumQ(n) {
    if (typeof n == 'string') n = n.split(',')
    return parseInt(n[0]) + parseInt(n[1]) + parseInt(n[2])
  },
	filterDS(n) {
    if (n == 49) return '和'
    else if (n % 2 == 0) return '双';
    else return '单';
  },
  filterSixDS(n) {
    if (n == 49) return '和'
    else if (n % 2 == 0) return '双';
    else return '单';
  },
  filterSumZ(n) {
    if (typeof n == 'string') n = n.split(',')
    return parseInt(n[1]) + parseInt(n[2]) + parseInt(n[3])
  },
  filterSumH(n) {
    if (typeof n == 'string') n = n.split(',')
    return parseInt(n[2]) + parseInt(n[3]) + parseInt(n[4])
  },
  getRank(arr, num) {
    let r = []
    return (
      (function f(t, a, n) {
        if (0 == n) return r.push(t.join(','))
        for (var i = 0, l = a.length; i <= l - n; i++)
          f(t.concat(a[i]), a.slice(i + 1), n - 1)
      })([], arr, num),
      r
    )
  },
  getLhh(n1, n2) {
    if (n1 > n2) return '龙'
    else if (n1 < n2) return '虎'
    else return '和'
  },
  filterSixHdsh(n) {
    if (n == 49) return '和'
    let a = filters.filterTmH(n)
    if (a % 2 == 0) return '双'
    else return '单'
  },
  szTS(r) {
    if (
      r == '0,1,2,3,9' ||
      r == '0,1,2,8,9' ||
      r == '0,1,7,8,9' ||
      r == '0,6,7,8,9'
    ) {
      return true
    } else {
      return false
    }
  },
  filterSixWdx(n) {
    if (n.length > 1) {
      n = (n + '').slice(1)
    }
    if (n > 4) return '大'
    else return '小'
  },
  filterTmH(n) {
    let sum = 0
    for (let i = 0, len = n.length; i < len; i++) {
      sum += parseInt(n[i])
    }
    return sum
  },
  doCp(arr) {
    let arr2 = []
    for (let i = 0, len = arr.length; i < len; i++) {
      arr2.push(arr[i].replace(',', ''))
    }
    return arr2
  },
  filterSixHdxh(n) {
    if (n == 49) return '和'
    let a = filters.filterTmH(n)
    if (a >= 7) return '大'
    else return '小'
  },
  filterPk10Gyh(arr) {
    // //console.log(arr)
    arr = arr.split(',')
    return parseInt(arr[0]) + parseInt(arr[1])
  },
  // filterSixZH(arr) {
  //   // //console.log(arr)
  //   // arr = arr.split(',')
  //   //console.log(parseInt(arr[1]))
  //   // parseInt(arr[0])+parseInt(arr[1])+parseInt(arr[2])+parseInt(arr[3])+parseInt(arr[4])+parseInt(arr[5])+parseInt(arr[6])
  //   return arr
     
  // },
  filterPk10Cc(n) {
    let carColor = ''
    switch (n - 0) {
      case 1:
        carColor = 'firstColor';
        break;
      case 2:
        carColor = 'secondColor';
        break;
      case 3:
        carColor = 'thirdColor';
        break;
      case 4:
        carColor = 'fourthColor';
        break;
      case 5:
        carColor = 'fifthColor';
        break;
      case 6:
        carColor = 'sixthColor';
        break;
      case 7:
        carColor = 'seventhColor';
        break;
      case 8:
        carColor = 'eigthColor';
        break;
      case 9:
        carColor = 'ninthColor';
        break;
      case 10:
        carColor = 'tenthColor';
        break;
      default:
        break
    }
    return carColor
  },
  GetData(a) {
    if (typeof a == 'string') a = a.split(',')
    let arr = []
    let result = a
    result.sort((a, b) => a - b)
    for (let i = 0; i < result.length; ) {
      let count = 0
      for (let j = i; j < result.length; j++) {
        if (result[i] === result[j]) {
          count++
        }
      }
      arr.push({
        date: result[i],
        count: count
      })
      i += count
    }
    return arr
  },
  szTSw(r) {
    if (r == '1,10,11' || r == '1,2,11' || r == '1,20,21' || r == '1,2,21') {
      return true
    } else {
      return false
    }
  },
  filterResult(n) {
    //console.log(n)
  },
    filterk3Cc(n) {
        let carColor = ''
        switch (n - 0) {
            case 1:
                carColor = 'k3one';
                break;
            case 2:
                carColor = 'k3two';
                break;
            case 3:
                carColor = 'k3three';
                break
            case 4:
                carColor = 'k3four';
                break;
            case 5:
                carColor = 'k3five';
                break;
            case 6:
                carColor = 'k3six';
                break;
            default:
                break;
        }
        return carColor
    },
    filterNc(n){
        let carColor = ''
        switch (n - 0) {
            case 1:
                carColor = 'ncone';
                break;
            case 2:
                carColor = 'nctwo';
                break;
            case 3:
                carColor = 'ncthree';
                break
            case 4:
                carColor = 'ncfour';
                break;
            case 5:
                carColor = 'ncfive';
                break;
            case 6:
                carColor = 'ncsix';
                break;
            case 7:
                carColor = 'ncseven';
                break;
            case 8:
                carColor = 'nceight';
                break;
            case 9:
                carColor = 'ncnine';
                break;
            case 10:
                carColor = 'ncten';
                break;
            case 11:
                carColor = 'nc11th';
                break;
            case 12:
                carColor = 'nc12th';
                break;
            case 13:
                carColor = 'nc13th';
                break;
            case 14:
                carColor = 'nc14th';
                break;
            case 15:
                carColor = 'nc15th';
                break;
            case 16:
                carColor = 'nc16th';
                break;
            case 17:
                carColor = 'nc17th';
                break;
            case 18:
                carColor = 'nc18th';
                break;
            case 19:
                carColor = 'nc19th';
                break;
            case 20:
                carColor = 'nctwenty';
                break;
            default:
                break;
        }
        return carColor
    },
    filterBallColor(n) {
      // //console.log(n);
      //球颜色
      let color = "";
      switch (parseInt(n)) {
        case 1:
          color = "firstColor";
          break;
        case 2:
          color = "secondColor";
          break;
        case 3:
          color = "thirdColor";
          break;
        case 4:
          color = "fourthColor";
          break;
        case 5:
          color = "fifthColor";
          break;
        case 6:
          color = "sixthColor";
          break;
        case 7:
          color = "seventhColor";
          break;
        case 8:
          color = "eigthColor";
          break;
        case 9:
          color = "ninthColor";
          break;
        case 10:
          color = "tenthColor";
          break;
      }
      return color;
    },
    filterBallColor1(n) {
      // //console.log(n);
      //球颜色
      let color = "";
      switch (parseInt(n)) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
          color = "zhuanjiaColor";
          break;
      }
      return color;
    },
    //标签
    filterTags(n){
      let bgColor = ''
      if(n == "颜值") bgColor = "yanzhibgColor"
      else if(n == "甜美") bgColor = "tianmeibgColor"
      else if(n == "连红") bgColor = "lianhongbgColor"
      else if(n == "专业") bgColor = "zhuanyebgColor"
      else if(n == "清纯") bgColor = "qingchunbgColor"
      else if(n == "性感") bgColor = "sexybgColor"
      else if(n == "新人") bgColor = "xinrenColor"
      return bgColor
    },
      formatDateSfm(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      let ss = date.getSeconds();
      ss = ss<10?'0'+ss:ss;

      return y + "-" + M + "-" + D + " " + hh + ":" + mm+':'+ss;
    },
    formatDateYMD(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return y + " 年 " + M + " 月 " + D + " 日" 
    },
    filterTime(time) {
      if (!time) return;
      let t = new Date(time * 1000);
      let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
      let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
      return h + ":" + min;
    },
    filterTime1(time) {
      if (!time) return;
      let t = new Date(time * 1000);
      let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
      let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
      let hAm = h < 12 ? h + ":" + min + "AM" : h - 12 + ":" + min + "PM";
      return hAm;},
    filterNews(n){
      let bgColor = ''
      if(n == "直播") bgColor = "zhibobgColor"
      else if(n == "活动") bgColor = "huodbgColor"
      else if(n == "公告") bgColor = "gonggbgColor"
      else if(n == "资讯") bgColor = "zixunbgColor"
      return bgColor
    },
    // 2010-01-01
    formatDateNy(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return y + "-" + M + "-" + D ;
    },
    // 2010/01/01
    formatDateNy2(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return y + "/" + M + "/" + D ;
    },
    // 01/01
    formatDateNy1(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return  M + "/" + D ;
    },
    // 2010-01-01 10:10
    formatDate1(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return y + "-" + M + "-" + D + " " + hh + ":" + mm;
    },
    // 10:10
    filterTime(time) {
      if (!time) return;
      let t = new Date(time * 1000);
      let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
      let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
      return h + ":" + min;
    },
    // 10am 
    filterTime1(time) {
      if (!time) return;
      let t = new Date(time * 1000);
      let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
      let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
      let hAm = h < 12 ? h + ":" + min + "AM" : h - 12 + ":" + min + "PM";
      return hAm;
    },
    filterSebo(code){
      let hong=0;
      let lan=0;
      let lv=0;
      code.split(',').forEach((res,index)=>{
       if(filters.filterSixBs(res)=='redBg'){
         if(index==6){
          hong=hong+1.5
         }else{
          hong++
         }
       }else if(filters.filterSixBs(res)=='greenBg'){
        if(index==6){
          lv=lv+1.5
         }else{
          lv++
         }
       }else if(filters.filterSixBs(res)=='blueBg'){
        if(index==6){
          lan=lan+1.5
         }else{
          lan++
         }
       }
      })
      let maxnum =Math.max(hong,lan,lv)
      if(hong==maxnum){
        return 'redcolor'
      }else if(lan==maxnum){
        return 'bluecolor'
      }else if(lv==maxnum){
        return 'greencolor'
      }
      
    },
    filterColor2(c){
      if(c=="redcolor"){
        return "红"
      }else if(c=="greencolor"){
        return "绿"
      }else if(c=="bluecolor"){
        return "蓝"
      }
    },

    formatDate1(time) {
        let date = new Date(time * 1000);
        let y = date.getFullYear(); // 年
        let M = date.getMonth() + 1;
        M = M < 10 ? "0" + M : M; // 月
        let D = date.getDate();
        D = D < 10 ? "0" + D : D; // 日
        let hh = date.getHours();
        hh = hh < 10 ? "0" + hh : hh; // 时
        let mm = date.getMinutes();
        mm = mm < 10 ? "0" + mm : mm;
        return y + "-" + M + "-" + D + " " + hh + ":" + mm;
    },
    formatDate2(time) {
        let date = new Date(time * 1000);
        let y = date.getFullYear(); // 年
        let M = date.getMonth() + 1;
        M = M < 10 ? "0" + M : M; // 月
        let D = date.getDate();
        D = D < 10 ? "0" + D : D; // 日
        let hh = date.getHours();
        hh = hh < 10 ? "0" + hh : hh; // 时
        let mm = date.getMinutes();
        mm = mm < 10 ? "0" + mm : mm;
        return y + "-" + M + "-" + D ;
    },
    formatDate3(time) {
        let date = new Date(time * 1000);
        let y = date.getFullYear(); // 年
        let M = date.getMonth() + 1;
        M = M < 10 ? "0" + M : M; // 月
        let D = date.getDate();
        D = D < 10 ? "0" + D : D; // 日
        let hh = date.getHours();
        hh = hh < 10 ? "0" + hh : hh; // 时
        let mm = date.getMinutes();
        mm = mm < 10 ? "0" + mm : mm;
        let ss = date.getSeconds();
        ss = ss < 10 ? "0" + ss : ss;
        return hh + ":" + mm + ":" + ss ;
    },
    formatDate4(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      let ss = date.getSeconds();
      ss = ss < 10 ? "0" + ss : ss;
      return M+'/'+D +' '+hh+':'+mm
    },

    filterTime(time) {
        if (!time) return;
        let t = new Date(time * 1000);
        let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
        let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
        return h + ":" + min;
    },
    filterTime1(time) {
        if (!time) return;
        let t = new Date(time * 1000);
        let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
        let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
        let hAm = h < 12 ? h + ":" + min + "AM" : h - 12 + ":" + min + "PM";
        return hAm;
    },
    filterSecond(time){
        let t = "";
        let h = "";
        let d = "";
        let min = "";
        let second = "";
        let obj = {};
        if (time > 60) {
            second = parseInt(time) % 60;
            min = parseInt((time / 60) % 60);
            h = parseInt((parseInt(time / 60) / 60) % 24);
            d = parseInt(parseInt(time / 60) / 60 / 24);
            second = second >= 10 ? second : "0" + second;
            min = min >= 10 ? min : "0" + min;
            if (!h) h = "";
            // else h = h >= 10 ? h : "0" + h + ":";
            else h = h >= 10 ? h : "0" + h ;
            if (d >= 1) {
                t = d + "天" + h + ":" + min + ":" + second;
            } else {

                if(h>=1){
                    t = h + ":"  + min + ":" + second;
                } else{
                    t =  min + ":" + second;
                }
            }
        } else {
            t = "00:" + (time >= 10 ? time : "0" + time);
        }
        return t;
    },
   filterLevel(l){
    let c= '';
    switch (l-0) {
      case 1:
        c='level1';
        break;
      case 2:
        c='level2';
        break;
      case 3:
        c='level3';
        break;
      case 4:
        c='level4';
        break;
      case 5:
        c='level5';
        break;
      case 6:
        c='level6';
        break;


    }
    return c;
  },
  filterTZBallColor1(n) {
    // //console.log(n);
    //球颜色
    let color = "";
    switch (parseInt(n)) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        color = "tzBallColor";
        break;
    }
    return color;
  },
  filterBallColorLhc(n) {
    //console.log(n);
    //球颜色
    let color = "";
    switch (parseInt(n)) {
      case 1:
      case 2:
      case 7:
      case 8:
      case 13:
      case 14:
      case 18:
      case 19:
      case 23:
      case 24:
      case 29:
      case 30:
      case 34:
      case 35:
      case 40:
      case 45:
      case 46:
        color = "redBg1";
        break;
      case 3:
      case 4:
      case 9:
      case 10:
      case 15:
      case 20:
      case 25:
      case 26:
      case 31:
      case 36:
      case 37:
      case 41:
      case 42:
      case 47:
      case 48:
        color = "blueBg1";
        break;
      case 5:
      case 6:
      case 11:
      case 12:
      case 16:
      case 17:
      case 21:
      case 22:
      case 27:
      case 28:
      case 32:
      case 33:
      case 38:
      case 39:
      case 43:
      case 44:
      case 49:
        color = "greenBg1";
        break;
    }
    return color;
  },
  filterOnlineNum(n) {
    if (n > 10000) {
      return (n / 10000).toFixed(2)+ "万" ;
    }else if(!n){
      return 0
    }
    return n;
  },
  filterOnlineNum1(n){ //进度条百分比保留两位小数
    //console.log(n);
    if(n<100){
      var toFixedNum = Number(n).toFixed(3);
        var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
        return realVal;
      }
      return n;
  }
}
export default filters
