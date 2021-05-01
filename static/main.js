const { json } = require("body-parser");

const burgerButton = document.getElementsByClassName('burgerButton');
const sidebar = document.getElementsByClassName('siderbar_extended');
const overlay = document.getElementsByClassName('overlay');
let sidebarOut = false;
const locationBox = document.getElementsByClassName('locationBox');
const api_key = '';
const dayB = document.getElementById('day');
const nightB = document.getElementById('night');
let dayNight = 'day';
const output = document.getElementsByClassName('output');
let cardExtended = false;
let autoComs = ['Ipswich', 'Sheffield', 'sheffield', 'Westminster'];
let _arr = [];
let panel = 0;

// TODO: Could add React functionality

//When button is clicked the sidebar comes out and an overlay darkens the rest of the screen
$(burgerButton).click(() => {
  $(sidebar).animate({
    left: "0px"
  }, "slow");
  sidebarOut = true;
  $(overlay).css({
    display: 'block'
  });
});

// When the overlay is clicked teh sidebar closes and screen returns to its normal colour
$(overlay).click(() => {
  if (sidebarOut == true) {
    $(sidebar).animate({
      left: "-100%"
    }, "slow");
    $(overlay).css({
      display: 'none'
    });
    sidebarOut = false;
  }
});

// When enter key is pressed request data

$(locationBox).keypress((evt) => {
  if (evt.which == 13) {
    evt.preventDefault();

    let locationVal = capitalizeFirstLetter($(locationBox).val());
    locationVal = locationVal.split(',');
    locationVal = locationVal[0];

    if (locationVal == 'Ipswich') {
      // location_id = '310094';
      getData(310094);
    } else if (locationVal == 'Sheffield' || locationVal == 'sheffield') {
      // location_id = '353467';
      getData(353467);
    } else if (locationVal == 'Westminster') {
      // location_id = '354160';
      getData(354160);
    } else {}

      function getData(location_id) {
        var xml = new XMLHttpRequest();
        xml.open("POST", "/api", true);
        xml.setRequestHeader("Content-Type", "application/json");
        var send = {"location_id":location_id};
        var sendString = JSON.stringify(send);
        xml.addEventListener("load", reqListener);
        xml.send(sendString);

        // get response
        function reqListener(){
          var response = JSON.parse(this.responseText);
          console.log(response);
        }
      }

    // function getData(location_id) {
    //   $.ajax({
    //     url: 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' + location_id + '?res=daily&' +
    //       'key=' + api_key,
    //     method: 'GET',
    //     headers: {},
    //     success: function(response) {
    //       // Get all the individual elements needed into variables
    //       let name = response.SiteRep.DV.Location.name;
    //       let country = response.SiteRep.DV.Location.country;
    //       // Day
    //       if (dayNight == 'day') {
    //         let direc = response.SiteRep.DV.Location.Period[panel].Rep[0].D;
    //         let Dmax = response.SiteRep.DV.Location.Period[panel].Rep[0].Dm;
    //         let FDmax = response.SiteRep.DV.Location.Period[panel].Rep[0].FDm;
    //         let Gnoon = response.SiteRep.DV.Location.Period[panel].Rep[0].Gn;
    //         let Hnoon = response.SiteRep.DV.Location.Period[panel].Rep[0].Hn;
    //         let ppD = response.SiteRep.DV.Location.Period[panel].Rep[0].PPd;
    //         let sp = response.SiteRep.DV.Location.Period[panel].Rep[0].S;
    //         let uv = response.SiteRep.DV.Location.Period[panel].Rep[0].U;
    //         let vis = response.SiteRep.DV.Location.Period[panel].Rep[0].V;
    //         let weType = response.SiteRep.DV.Location.Period[panel].Rep[0].W;
    //         // Call the function weatherTypeCode to decypher the code to text
    //         let weTypeF = weatherTypeCode(weType);
    //         // Put all the information into various text boxes for the user
    //         $(locationBox).val(capitalizeFirstLetter(name) + ', ' + capitalizeFirstLetter(country));
    //         $('.weatherType').html(weatherTypeCode(weType));
    //         $('.feelsLikeTemp').html(FDmax + '°' + '<br>' + 'feels like');
    //         $('.actualTemp').html(Dmax + '°');
    //         $('.precipProb').html(ppD + '%' + '<br>' + 'rain odds');
    //         $('.uv').html(uv);
    //         $('.humidity').html(Hnoon + '%');
    //         $('.visibility').html(visibilityCode(vis));
    //         $('.windSpeed').html(sp + ' mph');
    //         $('.windDirection').html(direc);
    //         $('.windGust').html(Gnoon + ' mph');
    //         $('.date').html(dayOfWeek(panel));
    //         // Alter the background animation based on the weather descriptor
    //         if (weTypeF == 'Sunny day') {
    //           $('.card').css({
    //             'background-image': 'url("/images/sun.gif")'
    //           });
    //         } else if (weTypeF == 'Partly cloudy') {
    //           $('.card').css({
    //             'background-image': 'url("/images/sun_cloudy.gif")'
    //           });
    //         } else if (weTypeF == 'Cloudy' || weTypeF == 'Overcast') {
    //           $('.card').css({
    //             'background-image': 'url("/images/cloudy.gif")'
    //           });
    //         } else if (weTypeF == 'Light rain shower' || weTypeF == 'Drizzle' || weTypeF == 'Light rain' || weTypeF == 'Heavy rain shower' || weTypeF == 'Heavy rain' || weTypeF == 'Sleet shower' || weTypeF == 'Sleet' || weTypeF == 'Hail shower' || weTypeF == 'Hail') {
    //           $('.card').css({
    //             'background-image': 'url("/images/rainy.gif")'
    //           });
    //         } else if (weTypeF == 'Thunder shower' || weTypeF == 'Thunder') {
    //           $('.card').css({
    //             'background-image': 'url("/images/stormy.gif")'
    //           });
    //         } else if (weTypeF == 'Mist' || weTypeF == 'Fog') {
    //           $('.card').css({
    //             'background-image': 'url("/images/foggy.gif")'
    //           });
    //         } else if (weTypeF == 'Light snow shower' || weTypeF == 'Light snow' || weTypeF == 'Heavy snow shower' || weTypeF == 'Heavy snow') {
    //           $('.card').css({
    //             'background-image': 'url("/images/snowy.gif")'
    //           });
    //         }
    //         // Night
    //       } else if (dayNight == 'night') {
    //         let direcN = response.SiteRep.DV.Location.Period[panel].Rep[1].D;
    //         let FNmin = response.SiteRep.DV.Location.Period[panel].Rep[1].FNm;
    //         let Gmid = response.SiteRep.DV.Location.Period[panel].Rep[1].Gm;
    //         let Hmid = response.SiteRep.DV.Location.Period[panel].Rep[1].Hm;
    //         let Nmin = response.SiteRep.DV.Location.Period[panel].Rep[1].Nm;
    //         let ppN = response.SiteRep.DV.Location.Period[panel].Rep[1].PPn;
    //         let spN = response.SiteRep.DV.Location.Period[panel].Rep[1].S;
    //         let visN = response.SiteRep.DV.Location.Period[panel].Rep[1].V;
    //         let weTypeN = response.SiteRep.DV.Location.Period[panel].Rep[1].W;
    //         $(locationBox).val(capitalizeFirstLetter(name) + ', ' + capitalizeFirstLetter(country));
    //         $('.weatherType').html(weatherTypeCode(weTypeN));
    //         $('.feelsLikeTemp').html(FNmin + '°' + '<br>' + 'feels like');
    //         $('.actualTemp').html(Nmin + '°');
    //         $('.precipProb').html(ppN + '%' + '<br>' + 'rain odds');
    //         $('.uv').html('0');
    //         $('.humidity').html(Hmid + '%');
    //         $('.visibility').html(visibilityCode(visN));
    //         $('.windSpeed').html(spN + ' mph');
    //         $('.windDirection').html(direcN);
    //         $('.windGust').html(Gmid + ' mph');
    //         $('.date').html(dayOfWeek(panel));

    //         $('.card').css({
    //           'background-image': 'url("/images/night.gif")'
    //         });
    //       }
    //     }
    //   });
    // }

  }
});

//This helps to give the if statements consistency
function capitalizeFirstLetter(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Switch between day and night forecasts
$(dayB).click(() => {
  if (dayNight == 'day') {} else if (dayNight == 'night') {
    $(day).css({
      background: '#eee',
      color: '#333333'
    });
    $(night).css({
      background: '#333333',
      color: '#eee'
    });
    dayNight = 'day';

    let e = jQuery.Event("keypress");
    e.which = 13;
    e.keyCode = 13;
    $(locationBox).trigger(e);
  }
});

$(nightB).click(() => {
  if (dayNight == 'night') {} else if (dayNight == 'day') {
    $(night).css({
      background: '#eee',
      color: '#333333'
    });
    $(day).css({
      background: '#333333',
      color: '#eee'
    });
    dayNight = 'night';

    let e = jQuery.Event("keypress");
    e.which = 13;
    e.keyCode = 13;
    $(locationBox).trigger(e);
  }
});

// Add up and down arrow functionality
$('.dArrow, .uArrow').click(() => {
  if (cardExtended == false) {
    $('.dArrow').css('display', 'none');
    $('.uArrow').css('display', 'block');
    $('.cardArrow').animate({
      height: '110px'
    });

    $('.wind, .uvSpan, .humSpan, .visSpan, .wGust').css('display', 'inline-grid');

    cardExtended = true;
  } else if (cardExtended == true) {
    $('.dArrow').css('display', 'block');
    $('.uArrow').css('display', 'none');

    $('.wind, .uvSpan, .humSpan, .visSpan, .wGust').css('display', 'none');

    $('.cardArrow').animate({
      height: '18.4px'
    });
    cardExtended = false;
  }
});

// Autocompletion of the search box
function autoCompletePlaces(self) {
  let val = self.value;
  const ul = document.getElementById('autoCom');
  for (let i = 0; i < autoComs.length; i++) {
    if (val == '') {
      try {
        _arr = [];
        ul.removeChild(ul.childNodes[0]);
        break;
      } catch (err) {
        console.log('no nodes available to remove');
      }
    } else if (autoComs[i].startsWith(val)) {
      try {
        if (_arr.find((element) => {
            return element == autoComs[i];
          })) {
          continue;
        } else {
          let li = document.createElement("LI");
          li.setAttribute("class", 'autoComQueries');
          li.innerHTML = autoComs[i];
          li.addEventListener('click', (mE) => {
            clickEnter(mE);
          });
          ul.appendChild(li);
          _arr.push(autoComs[i]);
          break;
        }
      } catch (err) {
        console.log('empty arr');
      }
    }
  }
  displayAutoCom();
}
// A virtual enter press in the textbox to reload the data
function clickEnter(mE) {
  $(locationBox).val(mE.target.firstChild.data);
  const ul = document.getElementById('autoCom');
  ul.removeChild(ul.childNodes[0]);
  _arr = [];

  $('#autoCom').css({
    display: 'none'
  });

  let e = jQuery.Event("keypress");
  e.which = 13;
  e.keyCode = 13;
  $(locationBox).trigger(e);
}
// Decide whether to display the list or not
function displayAutoCom() {
  let x = document.getElementById('autoCom');

  if (x.innerHTML !== "") {
    x.style.display = ('block');
  } else {
    x.style.display = ('none');
  }
}

// Left and right arrows to control which day is being viewed
$('.left').click(()=>{
  panel--;
  if (panel < 0 ){
    panel = 4;
  }
  // Move the card 1000px left
  $('.card, .left, .right, .cardArrow').animate({
    left: "-1000px",
  }, 1000);
  // After the card has moved reload the data
  setTimeout(()=>{
    let e = jQuery.Event("keypress");
    e.which = 13;
    e.keyCode = 13;
    $(locationBox).trigger(e);
  }, 1000);
  // Move the card 1000px right, in 1 ms giving the illusion of scrolling
  $('.card, .left, .right, .cardArrow').animate({
    left: "1000px"
  }, 1);
  // Move the card back to the center 
  $('.card, .left, .right, .cardArrow').animate({
    left: "0px"
  }, 1000);
});


$('.right').click(()=>{
  panel++;
  if (panel > 4){
    panel = 0;
  }

  $('.card, .left, .right, .cardArrow').animate({
    left: "1000px",
  }, 1000);

  setTimeout(()=>{
    let e = jQuery.Event("keypress");
    e.which = 13;
    e.keyCode = 13;
    $(locationBox).trigger(e);
  }, 1000);

  $('.card, .left, .right, .cardArrow').animate({
    left: "-1000px"
  }, 1);

  $('.card, .left, .right, .cardArrow').animate({
    left: "0px"
  }, 1000);
});