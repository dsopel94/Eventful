$(document).ready(function() {
  $('.findevents').submit(function(event) {
    event.preventDefault();
    var event = $(this).find("input[name='event']").val();
    var location = $(this).find("input[name='zip']").val();
    showEvents(event, location);
  });
});

function showEvents(e, l) {

  var oArgs = {
    app_key: "rqJNStmNMPNtvngf",
    q: e,
    where: l,
    page_size: 10,
    sort_order: "popularity",
    date: "This week",
  };
 
  EVDB.API.call("/events/search", oArgs, function(oData) {
    console.log(oData);
      //Get the title for each item
      var content = oData.events.event.map(function(item) { 
        return '<div class="box"><a href=' +
        item.url + '>' +
        item.title + '</a>' +
        " at the " + item.venue_name +
        " Start Date and Time: " +
        item.start_time +
        '</div>'; 
      }); 
    // Show Data on page
    $("#ListEvents").html(content);
  });
}