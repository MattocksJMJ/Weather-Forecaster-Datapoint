let arr = ['Clear night', 'Sunny day', 'Partly cloudy', 'Partly cloudy',
  'Not used', 'Mist', 'Fog', 'Cloudy', 'Overcast', 'Light rain shower',
  'Light rain shower', 'Drizzle', 'Light rain', 'Heavy rain shower',
  'Heavy rain shower', 'Heavy rain', 'Sleet shower', 'Sleet shower',
  'Sleet', 'Hail shower', 'Hail shower', 'Hail', 'Light snow shower',
  'Light snow shower', 'Light snow', 'Heavy snow shower', 'Heavy snow shower',
  'Heavy snow', 'Thunder shower', 'Thunder shower', 'Thunder'
];

function weatherTypeCode(w) {
  if (w == 'na') {
    return 'not available';
  } else {
    return arr[w];
  }
}

let dic = {
  UN: 'Unknown',
  VP: 'Very poor - less than 1 km',
  PO: 'Poor - between 1-4 km',
  MO: 'Moderate - between 4-10 km',
  GO: 'Good - between 10-20 km',
  VG: 'Very good - between 20-40 km',
  EX: 'Excellent - more than 40 km'
};

function visibilityCode(v) {
  return dic[v];  
}

let days = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
};

function dayOfWeek(panel) {
  let a = panel;
  let d = new Date();
  let n = d.getDay();

  if (a == 0){
    return "Today";
  } else if (a == 1){
    return "Tomorrow";
  } else if (n+a > 7){
    let x = n+a-7;
    return days[x];
  } else {
    let x = n+a;
    return days[x];
  }
} 