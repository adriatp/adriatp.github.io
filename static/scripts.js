function init_js() {
    var iframe_plot = $("#iframe_plot");
    init_tabs();
    init_datepickers();
}

function delete_plot() {
    write_on_iframe(iframe_plot,"");
}

function write_on_iframe(íframe,content) {
    íframe.contentWindow.document.open();
    íframe.contentWindow.document.write(content);
    íframe.contentWindow.document.close();
}

function draw_plot() {
    net_name = $('input[name=net_name]:checked').val();
    map_style = $('input[name=map_style]:checked').val();
    get_plot(net_name,map_style)
}

function get_plot(net_name,map_style) {
    $.ajax({
      type:"GET",
      dataType: 'html',
      url: '/get_plot/' + net_name + '/' + map_style,
      success: function(res){
        write_on_iframe(iframe_plot,res);
      }
    });
}

function init_tabs() {
    $('.input-group-datepicker .form-control').datepicker({
        autoHide: true,
        zIndex: 2048,
    });
}

function init_datepickers() {

}
