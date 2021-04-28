let createEmployeeRecord = function(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(nestedArray){
    return nestedArray.map(element => {return createEmployeeRecord(element)});
}


let createTimeInEvent = function(employeeData, timeStamp){
    let [date, hour] = timeStamp.split(' ');
  
    employeeData.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeData;
  }

  let createTimeOutEvent = function(employeeData, timeStamp){
    let [date, hour] = timeStamp.split(' ');
  
    employeeData.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeData;
  }

  let hoursWorkedOnDate = function(employeeRecord, givenDate){
    let start = employeeRecord.timeInEvents.find(t =>{
        return t.date === givenDate
    });
  
    let end = employeeRecord.timeOutEvents.find(t =>{
        return t.date === givenDate
    });
    return (end.hour - start.hour) / 100;
  }

  let wagesEarnedOnDate = function(employee, dateSought){
    let totalPay = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour;
    return parseFloat(totalPay.toString());
}

let allWagesFor = function(employeeRecord){
    let allDates = employeeRecord.timeInEvents.map(function(e){
        return e.date;
    })
  
    let totalPay = allDates.reduce(function(init, d){
         return init + wagesEarnedOnDate(employeeRecord, d)
        }, 0);
  
    return totalPay;
  }

  let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(init, value){
        return init + allWagesFor(value);
    }, 0)
}

let findEmployeeByFirstName = function(employeeArray, firstName) {
    return employeeArray.find(function(n){
      return n.firstName === firstName
    })
  }