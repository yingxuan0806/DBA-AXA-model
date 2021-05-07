/**
 * @author Ying Xuan Yeo
 */

am4core.useTheme(am4themes_animated);

//create map instance
var unique_earnings_map = am4core.create("unique_earnings_heat_map", am4maps.MapChart);
unique_earnings_map.hiddenState.properties.opacity = 0; // this creates initial fade-in

//set map definition
unique_earnings_map.geodata = am4geodata_worldLow;

//set map projection
unique_earnings_map.projection = new am4maps.projections.Miller();

//map title
var ue_map_title = unique_earnings_map.chartContainer.createChild(am4core.Label);
ue_map_title.text = "Adjustments for Unique Operating Earnings History Country Premium/Discount";
ue_map_title.fontSize = 20;
ue_map_title.paddingTop = 30;
ue_map_title.align = "center";
ue_map_title.zIndex = 100;

//configure map polygon series
var polygonSeries = unique_earnings_map.series.push(new am4maps.MapPolygonSeries());
var polygonTemplate = polygonSeries.mapPolygons.template;

//map to load polygon data from geoJSON
polygonSeries.useGeodata = true;

//set up tooltip for each country on the map
polygonSeries.calculateVisualCenter = true;
//position has to be fixed if not will never be able to click on the link in the tooltip
polygonTemplate.tooltipPosition = "fixed";
polygonSeries.tooltip.label.interactionsEnabled = true;
polygonSeries.tooltip.keepTargetHover = true;

//hover cursor -> text to show
// polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0000')}";
polygonTemplate.tooltipHTML = '<b>{name} <br>{value}</b><br><a href="../Compiled/Select Industry_{name.urlEncode()}.html">More Info</a>';

polygonTemplate.propertyFields.url = "url";

//properties of heat map colour intensity of each country
polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: am4core.color("#e1d3eb"),
    max: am4core.color("#9f70c2")
});


//create hover state and set alternative fill colour
var hoverstate = polygonTemplate.states.create("hover");
hoverstate.properties.fill = am4core.color("#6c3199");
hoverstate.properties.dx = -0.2;
hoverstate.properties.dy = -0.2;


// add heat legend
var heatLegend = unique_earnings_map.chartContainer.createChild(am4maps.HeatLegend);
heatLegend.valign = "bottom";
heatLegend.align = "left";
heatLegend.width = am4core.percent(100);
heatLegend.series = polygonSeries;
heatLegend.orientation = "horizontal";
heatLegend.padding(20, 20, 20, 20);
heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
heatLegend.valueAxis.renderer.minGridDistance = 40;
heatLegend.markerContainer.height = 30;

polygonSeries.mapPolygons.template.events.on("over", event => {
    handleHover(event.target);
});

polygonSeries.mapPolygons.template.events.on("hit", event => {
    handleHover(event.target);
});

//heat legend hover value
function handleHover(mapPolygon) {
    if (!isNaN(mapPolygon.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
    } else {
        heatLegend.valueAxis.hideTooltip();
    }
}

polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
polygonSeries.mapPolygons.template.events.on("out", event => {
    heatLegend.valueAxis.hideTooltip();
});

unique_earnings_map.zoomControl = new am4maps.ZoomControl();
unique_earnings_map.zoomControl.valign = "top";
unique_earnings_map.zoomControl.slider.height = 100;


//enable small map as tiny control
//display mini version of full map and highlight current view port
unique_earnings_map.smallMap = new am4maps.SmallMap();
unique_earnings_map.smallMap.series.push(polygonSeries);

unique_earnings_map.smallMap.rectangle.stroke = am4core.color("#6c3199");
unique_earnings_map.smallMap.rectangle.strokeWidth = 2;
unique_earnings_map.smallMap.background.stroke = am4core.color("#7B3625");
unique_earnings_map.smallMap.background.strokeOpacity = 1;
unique_earnings_map.smallMap.background.fillOpacity = 0.9;
unique_earnings_map.smallMap.align = "left";
unique_earnings_map.smallMap.valign = "bottom";

var smallMapSeries = unique_earnings_map.smallMap.series.getIndex(0);
smallMapSeries.mapPolygons.template.stroke = smallMapSeries.mapPolygons.template.fill;
smallMapSeries.mapPolygons.template.strokeWidth = 1;

unique_earnings_map.smallMap.dy = -80;
unique_earnings_map.smallMap.scale = 0.6;

//exclude antarctica from small map
smallMapSeries.exclude = ["AQ"];


// data values
polygonSeries.data = [


    { id: "AE", value: 1.1332, "url": "../Compiled/Select Industry_United Arab Emirates.html" },
    { id: "AT", value: 0.8189, "url": "../Compiled/Select Industry_Austria.html" },
    { id: "AU", value: 1.0339, "url": "../Compiled/Select Industry_Australia.html" },
    { id: "BE", value: 0.9351, "url": "../Compiled/Select Industry_Belgium.html" },
    { id: "CA", value: 0.942, "url": "../Compiled/Select Industry_Canada.html" },
    { id: "CH", value: 0.8721, "url": "../Compiled/Select Industry_Switzerland.html" },
    { id: "CN", value: 0.9288, "url": "../Compiled/Select Industry_China.html" },
    { id: "CZ", value: 1.3759, "url": "../Compiled/Select Industry_Czech Republic.html" },
    { id: "DE", value: 1.0694, "url": "../Compiled/Select Industry_Germany.html" },
    { id: "DK", value: 1.1537, "url": "../Compiled/Select Industry_Denmark.html" },
    { id: "EG", value: 1.1159, "url": "../Compiled/Select Industry_Egypt.html" },
    { id: "ES", value: 1.0088, "url": "../Compiled/Select Industry_Spain.html" },
    { id: "FI", value: 0.9477, "url": "../Compiled/Select Industry_Finland.html" },
    { id: "FR", value: 0.955, "url": "../Compiled/Select Industry_France.html" },
    { id: "GB", value: 1.0862, "url": "../Compiled/Select Industry_United Kingdom.html" },
    { id: "GR", value: 0.8846, "url": "../Compiled/Select Industry_Greece.html" },
    { id: "HK", value: 0.7596, "url": "../Compiled/Select Industry_Hong Kong.html" },
    { id: "HU", value: 1.2553, "url": "../Compiled/Select Industry_Hungary.html" },
    { id: "ID", value: 1.1211, "url": "../Compiled/Select Industry_Indonesia.html" },
    { id: "IE", value: 1.0622, "url": "../Compiled/Select Industry_Ireland.html" },
    { id: "IL", value: 1.2033, "url": "../Compiled/Select Industry_Israel.html" },
    { id: "IN", value: 0.9372, "url": "../Compiled/Select Industry_India.html" },
    { id: "IT", value: 1.03, "url": "../Compiled/Select Industry_Italy.html" },
    { id: "JO", value: 0.9058, "url": "../Compiled/Select Industry_Jordan.html" },
    { id: "KR", value: 0.85, "url": "../Compiled/Select Industry_Korea.html" },
    { id: "LU", value: 1.0086, "url": "../Compiled/Select Industry_Luxembourg.html" },
    { id: "MY", value: 0.7074, "url": "../Compiled/Select Industry_Malaysia.html" },
    { id: "NL", value: 1.0752, "url": "../Compiled/Select Industry_Netherlands.html" },
    { id: "NO", value: 1.2509, "url": "../Compiled/Select Industry_Norway.html" },
    { id: "NZ", value: 1.0207, "url": "../Compiled/Select Industry_New Zealand.html" },
    { id: "PH", value: 1.0246, "url": "../Compiled/Select Industry_Philippines.html" },
    { id: "PL", value: 1.0196, "url": "../Compiled/Select Industry_Poland.html" },
    { id: "PT", value: 1.171, "url": "../Compiled/Select Industry_Portugal.html" },
    { id: "QA", value: 0.8934, "url": "../Compiled/Select Industry_Qatar.html" },
    { id: "RU", value: 1.5081, "url": "../Compiled/Select Industry_Russia.html" },
    { id: "SA", value: 0.9072, "url": "../Compiled/Select Industry_Saudi Arabia.html" },
    { id: "SE", value: 0.9226, "url": "../Compiled/Select Industry_Sweden.html" },
    { id: "SG", value: 0.7613, "url": "../Compiled/Select Industry_Singapore.html" },
    { id: "TH", value: 0.9201, "url": "../Compiled/Select Industry_Thailand.html" },
    { id: "TR", value: 1.1552, "url": "../Compiled/Select Industry_Turkey.html" },
    { id: "TW", value: 0.6857, "url": "../Compiled/Select Industry_Taiwan.html" },
    { id: "US", value: 1.22, "url": "../Compiled/Select Industry_United States.html" },
    { id: "ZA", value: 1.0969, "url": "../Compiled/Select Industry_South Africa.html" },


    // countries not tracked by AXA
    { id: "BR", "url": "../Compiled/Select Industry_Brazil.html" },
    { id: "AD", "url": "../Compiled/Select Industry_Andorra.html" },
    { id: "AF", "url": "../Compiled/Select Industry_Afghanistan.html" },
    { id: "AG", "url": "../Compiled/Select Industry_Antigua and Barbuda.html" },
    { id: "AI", "url": "../Compiled/Select Industry_Anguilla.html" },
    { id: "AL", "url": "../Compiled/Select Industry_Albania.html" },
    { id: "AM", "url": "../Compiled/Select Industry_Armenia.html" },
    { id: "AO", "url": "../Compiled/Select Industry_Angola.html" },
    { id: "AR", "url": "../Compiled/Select Industry_Argentina.html" },
    { id: "AS", "url": "../Compiled/Select Industry_American Samoa.html" },
    { id: "AW", "url": "../Compiled/Select Industry_Aruba.html" },
    { id: "AX", "url": "../Compiled/Select Industry_Aland Islands.html" },
    { id: "AZ", "url": "../Compiled/Select Industry_Azerbaijan.html" },
    { id: "BA", "url": "../Compiled/Select Industry_Bosnia and Herzegovina.html" },
    { id: "BB", "url": "../Compiled/Select Industry_Barbados.html" },
    { id: "BD", "url": "../Compiled/Select Industry_Bangladesh.html" },
    { id: "BF", "url": "../Compiled/Select Industry_Burkina Faso.html" },
    { id: "BG", "url": "../Compiled/Select Industry_Bulgaria.html" },
    { id: "BH", "url": "../Compiled/Select Industry_Bahrain.html" },
    { id: "BI", "url": "../Compiled/Select Industry_Burundi.html" },
    { id: "BJ", "url": "../Compiled/Select Industry_Benin.html" },
    { id: "BL", "url": "../Compiled/Select Industry_Saint Barthélemy.html" },
    { id: "BM", "url": "../Compiled/Select Industry_Bermuda.html" },
    { id: "BN", "url": "../Compiled/Select Industry_Brunei Darussalam.html" },
    { id: "BO", "url": "../Compiled/Select Industry_Bolivia, Plurinational State of.html" },
    { id: "BQ", "url": "../Compiled/Select Industry_Bonaire, Sint Eustatius and Saba.html" },
    { id: "BR", "url": "../Compiled/Select Industry_Brazil.html" },
    { id: "BS", "url": "../Compiled/Select Industry_Bahamas.html" },
    { id: "BT", "url": "../Compiled/Select Industry_Bhutan.html" },
    { id: "BV", "url": "../Compiled/Select Industry_Bouvet Island.html" },
    { id: "BW", "url": "../Compiled/Select Industry_Botswana.html" },
    { id: "BY", "url": "../Compiled/Select Industry_Belarus.html" },
    { id: "BZ", "url": "../Compiled/Select Industry_Belize.html" },
    { id: "CC", "url": "../Compiled/Select Industry_Cocos (Keeling) Islands.html" },
    { id: "CD", "url": "../Compiled/Select Industry_Congo, the Democratic Republic of the.html" },
    { id: "CF", "url": "../Compiled/Select Industry_Central African Republic.html" },
    { id: "CG", "url": "../Compiled/Select Industry_Congo.html" },
    { id: "CI", "url": "../Compiled/Select Industry_Cote d'Ivoire.html" },
    { id: "CK", "url": "../Compiled/Select Industry_Cook Islands.html" },
    { id: "CL", "url": "../Compiled/Select Industry_Chile.html" },
    { id: "CM", "url": "../Compiled/Select Industry_Cameroon.html" },
    { id: "CO", "url": "../Compiled/Select Industry_Colombia.html" },
    { id: "CR", "url": "../Compiled/Select Industry_Costa Rica.html" },
    { id: "CU", "url": "../Compiled/Select Industry_Cuba.html" },
    { id: "CV", "url": "../Compiled/Select Industry_Cape Verde.html" },
    { id: "CW", "url": "../Compiled/Select Industry_Curacao.html" },
    { id: "CX", "url": "../Compiled/Select Industry_Christmas Island.html" },
    { id: "CY", "url": "../Compiled/Select Industry_Cyprus.html" },
    { id: "DJ", "url": "../Compiled/Select Industry_Djibouti.html" },
    { id: "DM", "url": "../Compiled/Select Industry_Dominica.html" },
    { id: "DO", "url": "../Compiled/Select Industry_Dominican Republic.html" },
    { id: "DZ", "url": "../Compiled/Select Industry_Algeria.html" },
    { id: "EC", "url": "../Compiled/Select Industry_Ecuador.html" },
    { id: "EE", "url": "../Compiled/Select Industry_Estonia.html" },
    { id: "EH", "url": "../Compiled/Select Industry_Western Sahara.html" },
    { id: "ER", "url": "../Compiled/Select Industry_Eritrea.html" },
    { id: "ET", "url": "../Compiled/Select Industry_Ethiopia.html" },
    { id: "FJ", "url": "../Compiled/Select Industry_Fiji.html" },
    { id: "FK", "url": "../Compiled/Select Industry_Falkand Islands (Malvinas).html" },
    { id: "FM", "url": "../Compiled/Select Industry_Micronesia, Federated States of.html" },
    { id: "FO", "url": "../Compiled/Select Industry_Faroe Islands.html" },
    { id: "GA", "url": "../Compiled/Select Industry_Gabon.html" },
    { id: "GD", "url": "../Compiled/Select Industry_Grenada.html" },
    { id: "GE", "url": "../Compiled/Select Industry_Georgia.html" },
    { id: "GF", "url": "../Compiled/Select Industry_French Guiana.html" },
    { id: "GG", "url": "../Compiled/Select Industry_Guernsey.html" },
    { id: "GH", "url": "../Compiled/Select Industry_Ghana.html" },
    { id: "GI", "url": "../Compiled/Select Industry_Gibraltar.html" },
    { id: "GL", "url": "../Compiled/Select Industry_Greenland.html" },
    { id: "GM", "url": "../Compiled/Select Industry_Gambia.html" },
    { id: "GN", "url": "../Compiled/Select Industry_Guinea.html" },
    { id: "GP", "url": "../Compiled/Select Industry_Guadeloupe.html" },
    { id: "GQ", "url": "../Compiled/Select Industry_Equatorial Guinea.html" },
    { id: "GS", "url": "../Compiled/Select Industry_South Georgia and the South Sandwich Islands.html" },
    { id: "GT", "url": "../Compiled/Select Industry_Guatemala.html" },
    { id: "GU", "url": "../Compiled/Select Industry_Guam.html" },
    { id: "GW", "url": "../Compiled/Select Industry_Guinea-Bissau.html" },
    { id: "GY", "url": "../Compiled/Select Industry_Guyana.html" },
    { id: "HM", "url": "../Compiled/Select Industry_Heard Island and McDonald Islands.html" },
    { id: "HN", "url": "../Compiled/Select Industry_Honduras.html" },
    { id: "HR", "url": "../Compiled/Select Industry_Croatia.html" },
    { id: "HT", "url": "../Compiled/Select Industry_Haiti.html" },
    { id: "IM", "url": "../Compiled/Select Industry_Isle of Man.html" },
    { id: "IO", "url": "../Compiled/Select Industry_British Indian Ocean Territory.html" },
    { id: "IQ", "url": "../Compiled/Select Industry_Iraq.html" },
    { id: "IR", "url": "../Compiled/Select Industry_Iran, Islamic Republic of.html" },
    { id: "IS", "url": "../Compiled/Select Industry_Iceland.html" },
    { id: "JE", "url": "../Compiled/Select Industry_Jersey.html" },
    { id: "JM", "url": "../Compiled/Select Industry_Jamaica.html" },
    { id: "JP", "url": "../Compiled/Select Industry_Japan.html" },
    { id: "KE", "url": "../Compiled/Select Industry_Kenya.html" },
    { id: "KG", "url": "../Compiled/Select Industry_Kyrgyzstan.html" },
    { id: "KH", "url": "../Compiled/Select Industry_Cambodia.html" },
    { id: "KI", "url": "../Compiled/Select Industry_Kiribati.html" },
    { id: "KM", "url": "../Compiled/Select Industry_Comoros.html" },
    { id: "KN", "url": "../Compiled/Select Industry_Saint Kitts and Nevis.html" },
    { id: "KP", "url": "../Compiled/Select Industry_Korea, Democratic People's Republic of.html" },
    { id: "KW", "url": "../Compiled/Select Industry_Kuwait.html" },
    { id: "KY", "url": "../Compiled/Select Industry_Cayman Islands.html" },
    { id: "KZ", "url": "../Compiled/Select Industry_Kazakhstan.html" },
    { id: "LA", "url": "../Compiled/Select Industry_Lao People's Democratic Republic.html" },
    { id: "LB", "url": "../Compiled/Select Industry_Lebanon.html" },
    { id: "LC", "url": "../Compiled/Select Industry_Saint Lucia.html" },
    { id: "LI", "url": "../Compiled/Select Industry_Liechtenstein.html" },
    { id: "LK", "url": "../Compiled/Select Industry_Sri Lanka.html" },
    { id: "LR", "url": "../Compiled/Select Industry_Liberia.html" },
    { id: "LS", "url": "../Compiled/Select Industry_Lesotho.html" },
    { id: "LT", "url": "../Compiled/Select Industry_Lithuania.html" },
    { id: "LV", "url": "../Compiled/Select Industry_Latvia.html" },
    { id: "LY", "url": "../Compiled/Select Industry_Libya.html" },
    { id: "MA", "url": "../Compiled/Select Industry_Morocco.html" },
    { id: "MC", "url": "../Compiled/Select Industry_Monaco.html" },
    { id: "MD", "url": "../Compiled/Select Industry_Moldova, Republic of.html" },
    { id: "ME", "url": "../Compiled/Select Industry_Montenegro.html" },
    { id: "MF", "url": "../Compiled/Select Industry_Saint Martin.html" },
    { id: "MG", "url": "../Compiled/Select Industry_Madagascar.html" },
    { id: "MH", "url": "../Compiled/Select Industry_Marshall Islands.html" },
    { id: "MK", "url": "../Compiled/Select Industry_Macedonia, the Former Yugoslav Republic of.html" },
    { id: "ML", "url": "../Compiled/Select Industry_Mali.html" },
    { id: "MM", "url": "../Compiled/Select Industry_Myanmar.html" },
    { id: "MN", "url": "../Compiled/Select Industry_Mongolia.html" },
    { id: "MO", "url": "../Compiled/Select Industry_Macao.html" },
    { id: "MP", "url": "../Compiled/Select Industry_Northern Mariana Islands.html" },
    { id: "MQ", "url": "../Compiled/Select Industry_Martinique.html" },
    { id: "MR", "url": "../Compiled/Select Industry_Mauritania.html" },
    { id: "MS", "url": "../Compiled/Select Industry_Montserrat.html" },
    { id: "MT", "url": "../Compiled/Select Industry_Malta.html" },
    { id: "MU", "url": "../Compiled/Select Industry_Mauritius.html" },
    { id: "MV", "url": "../Compiled/Select Industry_Maldives.html" },
    { id: "MW", "url": "../Compiled/Select Industry_Malawi.html" },
    { id: "MX", "url": "../Compiled/Select Industry_Mexico.html" },
    { id: "MZ", "url": "../Compiled/Select Industry_Mozambique.html" },
    { id: "NA", "url": "../Compiled/Select Industry_Namibia.html" },
    { id: "NC", "url": "../Compiled/Select Industry_New Caledonia.html" },
    { id: "NE", "url": "../Compiled/Select Industry_Niger.html" },
    { id: "NF", "url": "../Compiled/Select Industry_Norfolk Island.html" },
    { id: "NG", "url": "../Compiled/Select Industry_Nigeria.html" },
    { id: "NI", "url": "../Compiled/Select Industry_Nicaragua.html" },
    { id: "NP", "url": "../Compiled/Select Industry_Nepal.html" },
    { id: "NR", "url": "../Compiled/Select Industry_Nauru.html" },
    { id: "NU", "url": "../Compiled/Select Industry_Niue.html" },
    { id: "OM", "url": "../Compiled/Select Industry_Oman.html" },
    { id: "PA", "url": "../Compiled/Select Industry_Panama.html" },
    { id: "PE", "url": "../Compiled/Select Industry_Peru.html" },
    { id: "PF", "url": "../Compiled/Select Industry_French Polynesia.html" },
    { id: "PG", "url": "../Compiled/Select Industry_Papua New Guinea.html" },
    { id: "PK", "url": "../Compiled/Select Industry_Pakistan.html" },
    { id: "PM", "url": "../Compiled/Select Industry_Saint Pierre and Miquelon.html" },
    { id: "PN", "url": "../Compiled/Select Industry_Pitcairn.html" },
    { id: "PR", "url": "../Compiled/Select Industry_Puerto Rico.html" },
    { id: "PS", "url": "../Compiled/Select Industry_Palestine, State of.html" },
    { id: "PW", "url": "../Compiled/Select Industry_Palau.html" },
    { id: "PY", "url": "../Compiled/Select Industry_Paraguay.html" },
    { id: "RE", "url": "../Compiled/Select Industry_Réunion.html" },
    { id: "RO", "url": "../Compiled/Select Industry_Romania.html" },
    { id: "RS", "url": "../Compiled/Select Industry_Serbia.html" },
    { id: "RW", "url": "../Compiled/Select Industry_Rwanda.html" },
    { id: "SB", "url": "../Compiled/Select Industry_Solomon Islands.html" },
    { id: "SC", "url": "../Compiled/Select Industry_Seychelles.html" },
    { id: "SD", "url": "../Compiled/Select Industry_Sudan.html" },
    { id: "SH", "url": "../Compiled/Select Industry_Saint Helena, Ascension and Tristan da Cunha.html" },
    { id: "SI", "url": "../Compiled/Select Industry_Slovenia.html" },
    { id: "SJ", "url": "../Compiled/Select Industry_Svalbard and Jan Mayen.html" },
    { id: "SK", "url": "../Compiled/Select Industry_Slovakia.html" },
    { id: "SL", "url": "../Compiled/Select Industry_Sierra Leone.html" },
    { id: "SM", "url": "../Compiled/Select Industry_San Marino.html" },
    { id: "SN", "url": "../Compiled/Select Industry_Senegal.html" },
    { id: "SO", "url": "../Compiled/Select Industry_Somalia.html" },
    { id: "SR", "url": "../Compiled/Select Industry_Suriname.html" },
    { id: "SS", "url": "../Compiled/Select Industry_South Sudan.html" },
    { id: "ST", "url": "../Compiled/Select Industry_Sao Tome and Principe.html" },
    { id: "SV", "url": "../Compiled/Select Industry_El Salvador.html" },
    { id: "SX", "url": "../Compiled/Select Industry_Sint Maarten.html" },
    { id: "SY", "url": "../Compiled/Select Industry_Syrian Arab Republic.html" },
    { id: "SZ", "url": "../Compiled/Select Industry_Swaziland.html" },
    { id: "TC", "url": "../Compiled/Select Industry_Turks and Caicos Islands.html" },
    { id: "TD", "url": "../Compiled/Select Industry_Chad.html" },
    { id: "TF", "url": "../Compiled/Select Industry_French Southern Territories.html" },
    { id: "TG", "url": "../Compiled/Select Industry_Togo.html" },
    { id: "TJ", "url": "../Compiled/Select Industry_Tajikistan.html" },
    { id: "TK", "url": "../Compiled/Select Industry_Tokelau.html" },
    { id: "TL", "url": "../Compiled/Select Industry_Timor-Leste.html" },
    { id: "TM", "url": "../Compiled/Select Industry_Turkmenistan.html" },
    { id: "TN", "url": "../Compiled/Select Industry_Tunisia.html" },
    { id: "TO", "url": "../Compiled/Select Industry_Tonga.html" },
    { id: "TT", "url": "../Compiled/Select Industry_Trinidad and Tobago.html" },
    { id: "TV", "url": "../Compiled/Select Industry_Tuvalu.html" },
    { id: "TZ", "url": "../Compiled/Select Industry_Tanzania, United Republic of.html" },
    { id: "UA", "url": "../Compiled/Select Industry_Ukraine.html" },
    { id: "UG", "url": "../Compiled/Select Industry_Uganda.html" },
    { id: "UM", "url": "../Compiled/Select Industry_United States Minor Outlying Islands.html" },
    { id: "UY", "url": "../Compiled/Select Industry_Uruguay.html" },
    { id: "UZ", "url": "../Compiled/Select Industry_Uzbekistan.html" },
    { id: "VA", "url": "../Compiled/Select Industry_Holy See (Vatican City State).html" },
    { id: "VC", "url": "../Compiled/Select Industry_Saint Vincent and the Grenadines.html" },
    { id: "VE", "url": "../Compiled/Select Industry_Venezuela, Bolivarian Republic of.html" },
    { id: "VG", "url": "../Compiled/Select Industry_Virgin Islands, British.html" },
    { id: "VI", "url": "../Compiled/Select Industry_Virgin Islands, U.S..html" },
    { id: "VN", "url": "../Compiled/Select Industry_Vietnam.html" },
    { id: "VU", "url": "../Compiled/Select Industry_Vanuatu.html" },
    { id: "WF", "url": "../Compiled/Select Industry_Wallis and Futuna.html" },
    { id: "WS", "url": "../Compiled/Select Industry_Samoa.html" },
    { id: "YE", "url": "../Compiled/Select Industry_Yemen.html" },
    { id: "YT", "url": "../Compiled/Select Industry_Mayotte.html" },
    { id: "ZM", "url": "../Compiled/Select Industry_Zambia.html" },
    { id: "ZW", "url": "../Compiled/Select Industry_Zimbabwe.html" }
];

// excludes Antarctica
polygonSeries.exclude = ["AQ"];
s