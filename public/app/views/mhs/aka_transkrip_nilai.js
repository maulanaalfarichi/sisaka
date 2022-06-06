define([
	"apps",
    "views/modules/dataProgressBar",
], function(apps, notifidata){

function startCompare(value, filter){
    value = value.toString().toLowerCase();
    filter = filter.toString().toLowerCase();
    return value.indexOf(filter) !== -1;
}

function paramsBuilder(obj){
	var str = "";
	for (var key in obj) {
		if (str != "") {
		    str += "&";
		}
		str += key + "=" + obj[key];
	}
	return str;
}

var grd_transkrip = {
	id:"grd_transkrip",
	view:"datatable",
	url: "./transkrip.json",
	select:true,
	columns:[
		{id:"NO", header:"No", width:50},
		{id:"SEMESTBKMK", header:["SMT", {content:"selectFilter"} ], sort:"string",  width:70},
		{id:"KDKMKTRNLM", header:["Kode", {content:"textFilter", compare:startCompare} ], sort:"string",  width:100},
		{id:"NAKMKTBKMK", header:["Matakuliah", {content:"textFilter", compare:startCompare} ], sort:"string",  width:400},
		{id:"SKSMKTBKMK", header:"SKS", sort:"string",  width:50,},
		{id:"nilai_huruf", header:"Nilai", sort:"string", width:70 },
		{id:"KELASTRNLM", header:"KLS", sort:"string", width:50 },
		{id:"NMDOSTBDOS", header:"Dosen", sort:"string", width:240 },
		{id:"TMRELTRAKD", header:"Pertemuan", sort:"string", width:100 },
	],
    ready: notifidata.emptydata,
	on: notifidata.progressbar
};

var ui_scheme = {
	type: "material",
    rows:[
    {
		css: "bg_clean",
	    cols:[
	    	{},
			{ view: "button", type: "iconButton", icon: "print", label: "KHS", width: 100, popup:"popKHS"},
			{ view: "button", type: "iconButton", icon: "print", label: "Transkrip", width: 150, click:function(){
				$$("grd_transkrip").exportToPDF("/preview/transkrip?nim");
			}}
	    ]
    },
    grd_transkrip
    ],
};

var ui_popup2 = {
	view:"popup",
	id:"popKHS",
    head:"Submenu",
	width:450,
	height:280,
	body: {
    	rows:[
    		{
    			view:"form",
    			id:"formKHS",
    			margin:10,
    			elements:[
    				{
    					cols:[
	    					{view: "select", name: "smt",options: [
		    					{id:"01", value: "Semester 1"},
		    					{id:"02", value: "Semester 2"},
		    					{id:"03", value: "Semester 3"},
		    					{id:"04", value: "Semester 4"},
		    					{id:"05", value: "Semester 5"},
		    					{id:"06", value: "Semester 6"},
		    					{id:"07", value: "Semester 7"},
		    					{id:"08", value: "Semester 8"}

	    					]},
	    					{ view: "button",type: "iconButton", icon: "print", label: "Cetak", width: 110, height:35, click:function(){
	    						var form = $$('formKHS');
	    						var values = form.getValues();
	    						values.nim = apps.storeInit.nim;

	    						if(form.isDirty()){
	    							$$("grd_transkrip").exportToPDF("/preview/khs?"+paramsBuilder(values));
		                    		this.getTopParentView().hide(); //hide window
		                		};

		            		}}
    					]
    				}
    			]
    		}
    	],
    }
}


return {
    ui: function() {
		apps.setUiScheme = ui_scheme;
		apps.setUiPopup  = ui_popup2;
    	apps.webix();
    },
    onInit: function(){

	}
};

});
