var summary = {};
var chartActive = null;
var classes = null;
var models = null;
var attributes = null;
var tables = null;
var options_agent = null;
var attributes_agent = null;


function upload_data() {
	activateSummaryClasses(DATA);
}

function activateSummaryClasses(received) {
	var summary_classes = document.getElementById("summary_classes");
	summary_classes.style.display = "block";
	classes = received.classes;
	var select_summary_classes = document.getElementById("select_summary_classes");
	var length = select_summary_classes.options.length;
	for (i = length-1; i >= 0; i--) {
		select_summary_classes.options[i] = null;
	}
	for (var i=0; i<classes.length; i++) {
		var option = document.createElement("option");
		option.text = classes[i];
		option.value = classes[i];
		select_summary_classes.add(option);
	}
	select_summary_classes.addEventListener("change",function() {
		triggerGraphicsBySummary();
	});
	summary = {};
	//	Update parameters received in a global variable
	for (var i=0; i<classes.length; i++) {
		var actual_classe = classes[i];
		summary[actual_classe] = received[actual_classe];
	}
	summary.graphical_evaluations_original = [];
	summary.graphical_evaluations = [];
	for (var i=0; i<received.graphical_evaluations.length; i++) {
		var g_e = received.graphical_evaluations[i];
		summary.graphical_evaluations_original.push(g_e);
		g_e = g_e.replace(" ", "_");
		g_e = g_e.toLowerCase();
		summary.graphical_evaluations.push(g_e);
	}
	updateSummary();
	createSelectGraphicalEvaluations();
	initializeCheckboxTable();
	initializeChart();
	updateVisibilityGraphicalParametersTable();
}

function updateSummary() {
	var select_summary_classes = document.getElementById("select_summary_classes");
	var selected_classe = select_summary_classes.options[select_summary_classes.selectedIndex].value;
	document.getElementById("mean_error").innerHTML = summary[selected_classe].mean_error;
	document.getElementById("std_dev").innerHTML = summary[selected_classe].std_dev;
	document.getElementById("max_error").innerHTML = summary[selected_classe].max_error;
	document.getElementById("min_error").innerHTML = summary[selected_classe].min_error;
	document.getElementById("not_predicted").innerHTML = summary[selected_classe].not_predicted;
	document.getElementById("total_historics").innerHTML = summary[selected_classe].total_historics;
}

function createSelectGraphicalEvaluations() {
	//	Crear el select de les evaluacions amb totes les opcions
	var select_evaluations = document.createElement("select");
	select_evaluations.id = "select_evaluations";
	select_evaluations.classList.add("input_select_normal");
	select_evaluations.classList.add("glowing_border_normal");
	for (var i=0; i<summary.graphical_evaluations.length; i++) {
		var evaluation_name = summary.graphical_evaluations_original[i];
		var option = document.createElement("option");
		option.text = evaluation_name;
		option.value = summary.graphical_evaluations[i];
		select_evaluations.add(option);
	}
	select_evaluations.addEventListener("change", function(){
		updateVisibilityGraphicalParametersTable();
	});
	//		Borrem els que s'hagin pogut afegir abans
	var sgpe = document.getElementById("select_graphical_parameters_evaluation");
	while (sgpe.firstChild) {
		sgpe.removeChild(sgpe.lastChild);
	}
	//		Afegim l'actual
	sgpe.appendChild(select_evaluations);
	//	Crear el select de les classes amb totes les opcions
	var select_classes = document.createElement("select");
	select_classes.id = "select_classes";
	select_classes.classList.add("input_select_normal");
	select_classes.classList.add("glowing_border_normal");
	for (var i=0; i<classes.length; i++) {
		var classe_name = classes[i];
		var option = document.createElement("option");
		option.text = classe_name;
		option.value = classe_name;
		select_classes.add(option);
	}
	select_classes.addEventListener("change", function(){
		updateVisibilityGraphicalParametersTable();
	});
	//		Borrem els que s'hagin pogut afegir abans
	var sgpc = document.getElementById("select_graphical_parameters_classe");
	while (sgpc.firstChild) {
		sgpc.removeChild(sgpc.lastChild);
	}
	//		Afegim l'actual
	sgpc.appendChild(select_classes);
}

function initializeCheckboxTable() {
	//	Fem visible el contenidor
	document.getElementById("div_graphical_parameters").style.display="block";
	//	Creem la taula
	var tableAnterior = document.getElementById("table_checkbox");
	if (tableAnterior != null)
		tableAnterior.remove();
	var tableDiv = document.getElementById("div_chart_classes");
	var table = document.createElement("table");
	table.classList.add("table_graphical_options");
	table.id = "table_checkbox";
	table.classList.add("no_outer_border");
	var tableBody = document.createElement("tbody");
	table.appendChild(tableBody);
	//	La primera fila conte el titol de cada columna
	var tr = document.createElement("tr");
	tableBody.appendChild(tr);
	var td = document.createElement("th");
	td.appendChild(document.createTextNode("Show"));
	tr.appendChild(td);
	var td = document.createElement("th");
	td.appendChild(document.createTextNode("Lines"));
	tr.appendChild(td);
	var td = document.createElement("th");
	td.appendChild(document.createTextNode("Dashed"));
	tr.appendChild(td);
	var td = document.createElement("th");
	td.appendChild(document.createTextNode("Dots"));
	tr.appendChild(td);
	var td = document.createElement("th");
	td.appendChild(document.createTextNode("Color"));
	tr.appendChild(td);
	for (var i=0; i<classes.length; i++) {
		var classe_name = classes[i];
		//	Creem la fila
		var tr = document.createElement("tr");
		tableBody.appendChild(tr);
		//	Per cada evaluacio crear el que toca
		for (var j=0; j<summary.graphical_evaluations.length; j++) {
			//	Obtenim el nom de l'avaluacio actual
			var evaluation_name = summary.graphical_evaluations[j];
			//	Creem el switch de visibilitat i l'afegim a la taula
			var checkboxVisibility = createCheckboxCustomized("checkbox_" + classes[i] + "_visibility_" + evaluation_name);
			var td = document.createElement("td");
			td.id = "td_" + classes[i] + "_visibility_" + evaluation_name;
			td.appendChild(checkboxVisibility);
			td.style.display = 'none';
			tr.appendChild(td);
			//	Creem el switch de linies i l'afegim a la taula
			var checkboxLines = createCheckboxCustomized("checkbox_" + classes[i] + "_lines_" + evaluation_name);
			var td = document.createElement("td");
			td.id = "td_" + classes[i] + "_lines_" + evaluation_name;
			td.appendChild(checkboxLines);
			td.style.display = 'none';
			tr.appendChild(td);
			//	Creem el switch de dashed i l'afegim a la taula
			var checkboxDashed = createCheckboxCustomized("checkbox_" + classes[i] + "_dashed_" + evaluation_name);
			var td = document.createElement("td");
			td.id = "td_" + classes[i] + "_dashed_" + evaluation_name;
			td.appendChild(checkboxDashed);
			td.style.display = 'none';
			tr.appendChild(td);
			//	Creem el switch de punts i l'afegim a la taula
			var checkboxDots = createCheckboxCustomized("checkbox_" + classes[i] + "_dots_" + evaluation_name);
			var td = document.createElement("td");
			td.id = "td_" + classes[i] + "_dots_" + evaluation_name;
			td.appendChild(checkboxDots);
			td.style.display = 'none';
			tr.appendChild(td);
			//	Creem el boto de color i l'afegim a la taula
			var jscolorBtn = createJscolorButton("jscolorbtn_" + classes[i] + "_color_" + evaluation_name);
			var td = document.createElement("td");
			td.id = "td_" + classes[i] + "_color_" + evaluation_name;
			td.appendChild(jscolorBtn);
			td.style.display = 'none';
			tr.appendChild(td);
			//	Afegim listener a tot per tal que reinicialitzi el chart en cas que algu canvii el seu estat
			checkboxVisibility.addEventListener('change', function() {
				initializeChart()
			});
			checkboxLines.addEventListener('change', function() {
				toggleLinesDashed(this.firstChild.id,"dashed");
				initializeChart();
			});
			checkboxDots.addEventListener('change', function() {
				initializeChart();
			});
			checkboxDashed.addEventListener('change', function() {
				toggleLinesDashed(this.firstChild.id,"lines");
				initializeChart();
			});
		}
	}
	tableDiv.appendChild(table);
	jscolor.install();
	//	Activem les opcions per defecte
	for (var i=0; i<classes.length; i++) {
		var classe_name = classes[i];
		for (var j=0; j<summary.graphical_evaluations.length; j++) {
			var evaluation_name = summary.graphical_evaluations[j];
			if (evaluation_name === "real_values")
				document.getElementById("checkbox_" + classe_name + "_lines_" + evaluation_name).checked = true;
			else if (evaluation_name === "predicted_values")
				document.getElementById("checkbox_" + classe_name + "_lines_" + evaluation_name).checked = true;
			else if (evaluation_name === "error_values")
				document.getElementById("checkbox_" + classe_name + "_dashed_" + evaluation_name).checked = true;
		}
	}
	document.getElementById("checkbox_" + classes[0] + "_visibility_" + "real_values").checked = true;
	document.getElementById("checkbox_" + classes[0] + "_visibility_" + "predicted_values").checked = true;
	document.getElementById("checkbox_" + classes[0] + "_visibility_" + "error_values").checked = true;
}

function initializeChart() {
	document.getElementById("chart_div").style.display = 'block';
	var chartData = getChartData();
	var config = {
		type: 'bar',
		data: chartData,
		options: {
			title: {
				display: false,
			},
			legend: {
				display: true,
				onClick: (e) => e.stopPropagation()
			},
			tooltips: {
				mode: 'index',
				intersect: true
			},
			scales:{
				xAxes: [{
					display: false
				}]
			}
		}
	}
	var canvas = document.getElementById('line_chart');
	var context = canvas.getContext('2d');
	if (context != null)
		context.clearRect(0, 0, canvas.width, canvas.height);
	if (chartActive != null) {
		var scrollX = window.scrollX;
		var scrollY = window.scrollY;
		chartActive.destroy();
		chartActive = new Chart(context, config);
		window.scrollTo(scrollX, scrollY);
	}
	else
		chartActive = new Chart(context, config);
}

function createCheckboxCustomized(id) {
	var newLabel = document.createElement("label");
	newLabel.classList.add("switch");
	var newCheckbox = document.createElement("input");
	newCheckbox.setAttribute("type", "checkbox");
	newCheckbox.id = id;
	var newDiv = document.createElement("div");
	var newSpan = document.createElement("span");
	newDiv.appendChild(newSpan);
	newLabel.appendChild(newCheckbox);
	newLabel.appendChild(newDiv);
	return newLabel;
}

function createJscolorButton(idButton) {
	var btn = document.createElement("input");
	btn.id=idButton;
	btn.setAttribute("type","button");
	btn.setAttribute("data-jscolor","{preset:'large dark', value:\'"+randomColorWithoutSharp()+"\', onChange: 'initializeChart()'}");
	return btn;
}

function createSelectGraphicalEvaluations() {
	//	Crear el select de les evaluacions amb totes les opcions
	var select_evaluations = document.createElement("select");
	select_evaluations.id = "select_evaluations";
	select_evaluations.classList.add("input_select_normal");
	select_evaluations.classList.add("glowing_border_normal");
	for (var i=0; i<summary.graphical_evaluations.length; i++) {
		var evaluation_name = summary.graphical_evaluations_original[i];
		var option = document.createElement("option");
		option.text = evaluation_name;
		option.value = summary.graphical_evaluations[i];
		select_evaluations.add(option);
	}
	select_evaluations.addEventListener("change", function(){
		updateVisibilityGraphicalParametersTable();
	});
	//		Borrem els que s'hagin pogut afegir abans
	var sgpe = document.getElementById("select_graphical_parameters_evaluation");
	while (sgpe.firstChild) {
		sgpe.removeChild(sgpe.lastChild);
	}
	//		Afegim l'actual
	sgpe.appendChild(select_evaluations);
	//	Crear el select de les classes amb totes les opcions
	var select_classes = document.createElement("select");
	select_classes.id = "select_classes";
	select_classes.classList.add("input_select_normal");
	select_classes.classList.add("glowing_border_normal");
	for (var i=0; i<classes.length; i++) {
		var classe_name = classes[i];
		var option = document.createElement("option");
		option.text = classe_name;
		option.value = classe_name;
		select_classes.add(option);
	}
	select_classes.addEventListener("change", function(){
		updateVisibilityGraphicalParametersTable();
	});
	//		Borrem els que s'hagin pogut afegir abans
	var sgpc = document.getElementById("select_graphical_parameters_classe");
	while (sgpc.firstChild) {
		sgpc.removeChild(sgpc.lastChild);
	}
	//		Afegim l'actual
	sgpc.appendChild(select_classes);
}

function updateVisibilityGraphicalParametersTable() {
	var select_classes = document.getElementById("select_classes");
	var selected_classe = select_classes.options[select_classes.selectedIndex].value;
	var select_evaluations = document.getElementById("select_evaluations");
	var selected_evaluation = select_evaluations.options[select_evaluations.selectedIndex].value;
	for (var i=0; i<classes.length; i++) {
		var classe_name = classes[i];
		for (var j=0; j<summary.graphical_evaluations.length; j++) {
			var evaluation_name = summary.graphical_evaluations[j];
			var td_visibility = document.getElementById("td_" + classe_name + "_visibility_" + evaluation_name);
			var td_lines = document.getElementById("td_" + classe_name + "_lines_" + evaluation_name);
			var td_dots = document.getElementById("td_" + classe_name + "_dots_" + evaluation_name);
			var td_dashed = document.getElementById("td_" + classe_name + "_dashed_" + evaluation_name);
			var td_color = document.getElementById("td_" + classe_name + "_color_" + evaluation_name);
			if (classe_name.localeCompare(selected_classe) == 0 && selected_evaluation.localeCompare(evaluation_name) == 0) {
				td_visibility.style.display='table-cell';
				td_lines.style.display='table-cell';
				td_dots.style.display='table-cell';
				td_dashed.style.display='table-cell';
				td_color.style.display='table-cell';
			}
			else {
				td_visibility.style.display='none';
				td_lines.style.display='none';
				td_dots.style.display='none';
				td_dashed.style.display='none';
				td_color.style.display='none';
			}
		}
	}
}

function randomColor() {
	return '#' + randomColorWithoutSharp();
}

function randomColorWithoutSharp() {
	var x=Math.round(0xffffff * Math.random()).toString(16);
	var y=(6-x.length);
	var z="000000";
	var z1 = z.substring(0,y);
	return z1 + x;
}

function getChartData() {
	//	Mostrem cada grafic en funcio de si esta activat o no la taula de checkboxes
	var arrayLength = summary[classes[0]].error_values.length;
	var barChartData = {};
	barChartData.labels = Array.from({length: arrayLength}, (el, index) => index);
	barChartData.datasets = [];
	for (var i=0; i<classes.length; i++) {
		for (var j=0; j<summary.graphical_evaluations.length; j++) {
			var evaluation_name = summary.graphical_evaluations[j];
			var checkboxVisibility = document.getElementById("checkbox_" + classes[i] + "_visibility_" + evaluation_name);
			var checkboxLines = document.getElementById("checkbox_" + classes[i] + "_lines_" + evaluation_name);
			var checkboxDots = document.getElementById("checkbox_" + classes[i] + "_dots_" + evaluation_name);
			var checkboxDashed = document.getElementById("checkbox_" + classes[i] + "_dashed_" + evaluation_name);
			var jscolorBtn = document.getElementById("jscolorbtn_" + classes[i] + "_color_" + evaluation_name);
			if (checkboxVisibility.checked) {
				var dataset = {};
				//	Style lines
				if (!checkboxLines.checked && !checkboxDashed.checked)
					dataset.showLine = false;
				//	Style dots
				if (!checkboxDots.checked)
					dataset.pointRadius = 0;
				//	Style dashed
				if (checkboxDashed.checked)
					dataset.borderDash = [5,5];
				//	Style color
				var color_js = jscolorBtn.jscolor.toHEXString();
				dataset.backgroundColor = color_js;
				dataset.borderColor = color_js;
				//	Style title
				dataset.label = summary.graphical_evaluations_original[j] + " " + classes[i];
				//	Add values
				var values = summary[classes[i]][evaluation_name];
				dataset.data = values;
				dataset.type = 'line';
				dataset.fill = false;
				barChartData.datasets.push(dataset);
			}
		}
	}
	return barChartData;
}

function triggerGraphicsBySummary() {
	var selectedClass = $( "#select_summary_classes" ).val();
	//	Desactivar tots els visibility
	for (var i=0; i<classes.length; i++) {
		var classe_name = classes[i];
		for (var j=0; j<summary.graphical_evaluations.length; j++) {
			var evaluation_name = summary.graphical_evaluations[j];
			document.getElementById("checkbox_" + classe_name + "_visibility_" + evaluation_name).checked = false;
		}
	}
	//	Activar els visibility de real i predicted values
	document.getElementById("checkbox_" + selectedClass + "_visibility_real_values").checked = true;
	document.getElementById("checkbox_" + selectedClass + "_visibility_predicted_values").checked = true;
	document.getElementById("checkbox_" + selectedClass + "_visibility_error_values").checked = true;
	//	Actualitza la interficie
	initializeChart();
	//	Actualitzar els parametritzador del grafic
	document.getElementById('select_classes').value = selectedClass;
	document.getElementById('select_evaluations').value = "real_values";
	updateVisibilityGraphicalParametersTable();
}