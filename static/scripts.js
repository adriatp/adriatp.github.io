function init_js() {
    var iframe_plot = $("#iframe_plot");
    init_tabs();
    init_datepickers();
    init_map_options();
}

function init_map_options() {
    $('#range_hour').on('input', function() {
        hour = $(this).val()
        if (hour.length<2)
            hour = '0' + hour
        $('#label_range_hour').html('<b>Hour:</b> ' + hour + ':00')
    });
    $('#range_hour').on('change', function() {
        check_visualize_grid();
    });
    $('#input_date').on('change', function() {
        check_visualize_grid();
    });
    $('#select_net').on('change', function() {
        check_visualize_grid();
    });
    $('#button_visualize_grid').on('click', function() {
        // Obtain and format the hour value
        hour = $('#range_hour').val()
        if (hour.length < 2)
            hour = '0' + hour
        get_pyplot(net, hour)
    });
}

function check_visualize_grid() {
    hour = $('#range_hour').val()
    net = $('#select_net').val()

    if (hour == null || hour == "")
        $('#button_visualize_grid').prop('disabled', true);
    else if (net == null || net == "")
        $('#button_visualize_grid').prop('disabled', true);
    else
        $('#button_visualize_grid').prop('disabled', false);
}

function write_on_iframe(íframe,content) {
    íframe.contentWindow.document.open();
    íframe.contentWindow.document.write(content);
    íframe.contentWindow.document.close();
}

function draw_plot() {
    plot_style = $('input[name=net_name]:checked').val();
    map_style = $('input[name=map_style]:checked').val();
    get_plot(plot_style,map_style)
}

function get_pyplot(plot_style, hour) {
    $.ajax({
      type:"GET",
      dataType: 'html',
      url: '/data/viz_1/' + plot_style + '/' + hour,
      success: function(res){
        write_on_iframe(iframe_plot,res);
      }
    });
}

function init_tabs() {

}

function init_datepickers() {
    $('.input-group.date input').datepicker({
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        language: "ca",
        toggleActive: true,
        format: 'dd/mm/yyyy'
    });
    $('.input-group.date .input-group-text').click(function() {
        $('.input-group.date input').datepicker('show');
    });
}

$("#input_btn_calendar").click(function() {
    $("#input_date").datepicker('show')
});
