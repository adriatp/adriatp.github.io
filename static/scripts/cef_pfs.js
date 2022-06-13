function init_cef_pfs() {
    var iframe_plot = $("#iframe_plot");
    var iframe_cef = $("#iframe_cef");
    var actual_date, actual_hour, actual_netname;
}

function able_to_update_by_range_change() {
    hour = $('#range_hour').val()
    date = $('#input_date').val()
    net = $('#select_net').val()

    if (hour == null || hour == "")
        return false;
    else if (date == null || date == "")
        return false;
    else if (net == null || net == "")
        return false;

    iframe_plot = document.getElementById('iframe_plot');
    plot_div = iframe_plot.contentWindow.document.getElementsByClassName('plotly-graph-div')[0];

    if (typeof plot_div === 'undefined')
        return false;

    return true;
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
        if (able_to_update_by_range_change()) {
            // Obtain and format the hour value
            hour = $('#range_hour').val()
            if (hour.length < 2)
                hour = '0' + hour
            // Obtain and format the date value
            date_split = ($('#input_date').val()).split('/')
            year = date_split[2]
            month = date_split[1]
            if (month.length < 2)
                month = '0' + month
            day = date_split[0]
            if (day.length < 2)
                day = '0' + day
            date = year + month + day
            // Obtain and format the net name
            net = $('#select_net').val()
            // Get and display the plot
            actual_netname = net;
            actual_date = date;
            actual_hour = hour;
            //  Get actual values for plot
            iframe_plot = document.getElementById('iframe_plot');
            plot_div = iframe_plot.contentWindow.document.getElementsByClassName('plotly-graph-div')[0];
            default_settings = null
            if (typeof plot_div === 'undefined') {}
            else {
                default_settings = {
                    'zoom' : plot_div.layout.mapbox.zoom,
                    'bearing' : plot_div.layout.mapbox.bearing,
                    'pitch' : plot_div.layout.mapbox.pitch,
                    'lat' : plot_div.layout.mapbox.center.lat,
                    'lon' : plot_div.layout.mapbox.center.lon
                }
            }
            get_pyplot(actual_netname, actual_date, hour, false, default_settings);
        }
    });
    $('#input_date').on('change', function() {
        check_visualize_grid();
    });
    $('#select_net').on('change', function() {
        check_visualize_grid();
    });
    $('#button_visualize_net').on('click', function() {
        // Obtain and format the hour value
        hour = $('#range_hour').val()
        if (hour.length < 2)
            hour = '0' + hour
        // Obtain and format the date value
        date_split = ($('#input_date').val()).split('/')
        year = date_split[2]
        month = date_split[1]
        if (month.length < 2)
            month = '0' + month
        day = date_split[0]
        if (day.length < 2)
            day = '0' + day
        date = year + month + day
        // Obtain and format the net name
        net = $('#select_net').val()
        // Get and display the plot
        actual_netname = net;
        actual_date = date;
        actual_hour = hour;
        //  Get actual values for plot
        if (actual_netname == 'EST_virtual_grid_only_CT')
            get_pyplot(actual_netname, actual_date, hour, true, []);
        else
            get_pyplot(actual_netname, actual_date, hour, false, []);
    });
}

function check_visualize_grid() {
    hour = $('#range_hour').val()
    date = $('#input_date').val()
    net = $('#select_net').val()

    if (hour == null || hour == "")
        $('#button_visualize_net').prop('disabled', true);
    else if (date == null || date == "")
        $('#button_visualize_net').prop('disabled', true);
    else if (net == null || net == "")
        $('#button_visualize_net').prop('disabled', true);
    else
        $('#button_visualize_net').prop('disabled', false);
}

function clean_iframe(iframe) {
    parent_container = $(iframe).parent();
    $(iframe).remove();
    iframe = document.createElement("iframe");
    iframe.setAttribute('id','iframe_plot');
    parent_container.append(iframe);
    return iframe;
}

function write_on_iframe(iframe,content) {
    iframe.contentDocument.open();
    iframe.contentDocument.write(content);
    iframe.contentDocument.close();
}

function draw_plot() {
    net_name = $('input[name=net_name]:checked').val();
    map_style = $('input[name=map_style]:checked').val();
    get_plot(net_name,map_style)
}

function get_cef(net_name, date) {
    $.ajax({
        type:"GET",
        dataType: 'html',
        url: '/get_cef/' + net_name + '/' + date,
        success: function(res){
            $('#cef_content').empty();
            $('#cef_content').append(res);
            $('#select_cef_type').on('change', function() {
                select_cef_type(this);
            });
            $('.item-cef').on('click', function() {
                set_slider_by_cef_item(this);
                $('#cef_modal').modal('hide');
            });

        }
    });
}

function select_cef_type(elem) {
    $('#cef_buses_over_voltage').hide();
    $('#cef_buses_under_voltage').hide();
    $('#cef_branches_congestion').hide();
    id_elem_to_activate = $(elem).val();
    $('#' + id_elem_to_activate).show();
}

function set_slider_by_cef_item(elem) {
    hour = $(elem).attr('hour-id');
    $('#range_hour').val(hour);
    if (hour.length<2)
        hour = '0' + hour
    $('#label_range_hour').html('<b>Hour:</b> ' + hour + ':00');
    lat = $(elem).attr('lat');
    lon = $(elem).attr('lon');
    default_settings = {
        'lon': lat,
        'lat': lon,
        'zoom': 14
    }
    get_pyplot(actual_netname, actual_date, hour, false, default_settings);
}

function apply_map_styles() {
    $("#iframe_plot").on('load', function() {
       $(this).contents().find(".mapboxgl-control-container").css({"display": "none"});
       $(this).contents().find(".modebar-container").css({"display": "none"});
    });
}

function get_pyplot(net_name, date, hour, update_cef_tab, default_settings) {
    show_loaders();
    //  Get plot iframe container
    iframe_ant = document.getElementById('iframe_plot');
    //  Clean iframe
    iframe_plot = clean_iframe(iframe_ant);
    //  Get data options to pass
    options = ['lat', 'lon', 'zoom', 'pitch', 'bearing']
    data = {
        'net_name': net_name,
        'date': date,
        'hour': hour
    }
    for (var i = 0; i < options.length; i++) {
        op = options[i];
        if (default_settings[op] === undefined || default_settings[op] === undefined) {}
        else
            data[op] = default_settings[op];
    }
    //  Send ajax
    $.ajax({
        type:"GET",
        dataType: 'text',
        url: 'http://84.88.154.15:51917/get_plot',
        data: data,
        success: function(res) {
            if (update_cef_tab)
                get_cef(net_name, date);
            hide_loaders();
            write_on_iframe(iframe_plot,res);
            apply_map_styles();
        }
    });
}

function get_data_for_line_chart() {
    ef_consumer = $('#ef_select_consumer').val();
    ef_init_date = $('#ef_init_date').val();
    ef_final_date = $('#ef_final_date').val();

    $.ajax({
        type:"GET",
        dataType: 'text',
        url: 'http://84.88.154.15:51917/get_ef',
        data: {
            'ef_consumer': ef_consumer,
            'ef_init_date': ef_init_date,
            'ef_final_date': ef_final_date
        },
        success: function(res) {
            plot_chart();
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function update_mapbox_features(settings) {
    iframe_plot = document.getElementById('iframe_plot');
    map_plot = iframe_plot.contentWindow.document.getElementsByClassName('plotly-graph-div')[0];
    if (typeof map_plot === 'undefined') {}
    else
        iframe_plot.contentWindow.Plotly.relayout(map_plot, settings);
}
