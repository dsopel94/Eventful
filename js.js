$(document).ready(function() {
  $('.find-events').submit(function(event) {
    event.preventDefault();
    var event = $(this).find("input[name='event']").val();
    var location = $(this).find("input[name='zip']").val();
    showEvents(event, location);
  });
});

$('.show-app').on('click', function(event) {
  event.preventDefault();
  $('.splash-page').addClass('hidden')
  $('.find-events').removeClass('hidden')
})

function showEvents(e, l) {

  var oArgs = {
    app_key: "rqJNStmNMPNtvngf",
    q: e,
    where: l,
    page_size: 10,
    sort_order: "popularity",
    date: "This week",
    page_number: 1
  };
 
  EVDB.API.call("/events/search", oArgs, function(oData) {
    if (oData.events === null) {
          var notFound = '<div class="not-found"> Whoops! Results Not Found. Please check for any spelling errors or try a different keyword</div>'
          $('.nav-buttons').addClass("hidden")
          $("#ListEvents").html(notFound);
        }  
      //Get the title for each item
      var content = oData.events.event.map(function(item) {
        return '<div class="box"><a href=' +
        item.url + '>' +
        item.title + '</a>' +
        '<div class="venue">Venue:' + item.venue_name +
        '</div><div class="time"> Start Date and Time: ' +
        Date.parse(item.start_time) +
        '</div></div>'; 
      });

      $('.back').on('click', function(event) {
        event.preventDefault();
        var pageNumber = oData.page_number--;
        pageNumber--;
        if (pageNumber <= 0 || pageNumber == 0) {
    oData.page_number = 1;
    pageNumber = 1;
    console.log(oData.page_number, "Is this 1?")
    console.log(pageNumber, "Is this 1?")
  }
        if (pageNumber > 0) {
        console.log(pageNumber)
        var oArgs = {
    app_key: "rqJNStmNMPNtvngf",
    q: e,
    where: l,
    page_size: 10,
    sort_order: "popularity",
    date: "This week",
    page_number: pageNumber
  };

  EVDB.API.call("/events/search", oArgs, function(oData) {
    console.log(oData);
      //Get the title for each item
      var content = oData.events.event.map(function(item) { 
        return '<div class="box"><a href=' +
        item.url + '>' +
        item.title + '</a>' +
        '<div class="venue">Venue:' + item.venue_name +
        '</div><div class="time"> Start Date and Time: ' +
        Date.parse(item.start_time) +
        '</div></div>'; 
      });
       $("#ListEvents").html(content);
    });    
  }
  }) 
      $('.next').on('click', function(event) {
        event.preventDefault();
        var pageNumber = oData.page_number++;
        console.log(oData.page_number)
        pageNumber++;
        console.log(pageNumber)
        var oArgs = {
    app_key: "rqJNStmNMPNtvngf",
    q: e,
    where: l,
    page_size: 10,
    sort_order: "popularity",
    date: "This week",
    page_number: pageNumber
  };

  EVDB.API.call("/events/search", oArgs, function(oData) {
    console.log(oData);
      //Get the title for each item
      var content = oData.events.event.map(function(item) { 
        return '<div class="box"><a href=' +
        item.url + '>' +
        item.title + '</a>' +
        '<div class="venue">Venue:' + item.venue_name +
        '</div><div class="time"> Start Date and Time: ' +
        Date.parse(item.start_time) +
        '</div></div>'; 
      });
       $("#ListEvents").html(content);
    });    
  }) 
    // Show Data on page
    $("#ListEvents").html(content);
    $('.nav-buttons').removeClass('hidden')
  });
}