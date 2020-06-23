function Data(event, form) {
  event.preventDefault();

    var data_validade = $('#data_validade').val();

    if(data_validade != null) {
      var newdata = formatData(data_validade);
      $('#new_validade').val(newdata);
    }

    var datanow = getData();
    $('#datenow').val(datanow);

    form.submit();
}

function getData() {

  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var formatterDay;
  if (day < 10) {
      formatterDay = '0'+ day;
  } else {
      formatterDay = day;
  }

  var formatterMonth;
  if (month < 10) {
      formatterMonth = '0'+ month;
  } else {
      formatterMonth = month;
  }

  var data = (formatterDay +'/'+ formatterMonth +'/'+ year);

  return data;
}

function formatData(data) {

  var array = data.split("-");

  var newdata = array[2]+'/'+array[1]+'/'+array[0];

  return newdata;
}
