function init_base() {
    init_datepickers();
    init_map_options();
    init_cef_pfs();
    init_loaders();
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
    $('.input-daterange').datepicker({
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        language: "ca",
        toggleActive: true,
        format: 'dd/mm/yyyy'
    });
}