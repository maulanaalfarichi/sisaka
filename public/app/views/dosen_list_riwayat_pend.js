define([
	"apps",
	"views/modules/dosen_search",
	"views/forms/frm_dosen_riwpend",
	"views/modules/window",
	"views/modules/dataProcessing"
],function(apps, search, form, ui_window, handleProcessing){

var grd_riwpend = {
	view:"datatable",
	id:"grd_riwpend",
	columns:[
		{ id:"trash", header:"&nbsp;", width:35, template:"<span  style='cursor:pointer;' class='webix_icon trash fa-trash-o text_danger'></span>"},
		{ id:"edit", header:"&nbsp;", width:35, template:"<span  style=' cursor:pointer;' class='webix_icon edit fa-pencil'></span>"},
		{ id:"nm_jenj_didik", header:"nm_jenj_didik", width: 100},
        { id:"nm_pt", header:"nm_pt", width: 100},
        { id:"bidang_studi", header:"bidang_studi", width: 100},
        { id:"fakultas", header:"fakultas", width: 100},
        { id:"gelar", header:"gelar", width: 100},
        { id:"ipk_lulus", header:"ipk_lulus", width: 100},
        { id:"sks_lulus", header:"sks_lulus", width: 100},
        { id:"thn_lulus", header:"thn_lulus", width: 100}
	],
	select:"row",
	datafetch:30,
	dataFeed : "./riwpend/data",
	onClick:{
		edit:function(e,id,node){
			webix.$$("win_riwpend").show();
		},
		trash:function(e,id,node){
			webix.confirm({
				text:"The data will be deleted.<br/> Are you sure?", ok:"Yes", cancel:"Cancel",
				callback:function(res){
					if(res){
						$$("grd_riwpend").remove(id);
					}
				}
			});
		},
	}
};

var btn_add ={
	paddingX:5,
	paddingY:5,
	height:40,
	cols:[
		{},
		{ view: "button", type: "iconButton", icon: "plus", css:"button_success", label: "Add New", width: 130, click:function(obj){
			var id = $$("listdosen").getSelectedId();
			if (id) {
				webix.$$("win_riwpend").show();
			}else{
				webix.message({ type:"error", text:"Please select one", expire:3000});
			}
		}}
	]
};

var btn_submit ={
    height:50,
    padding:10,
    cols:[
        {},
        { view: "button", css:"button_danger", label: "Cancel", width: 120, click:function(obj){
             this.getTopParentView().hide();
        }},
        { view: "button", type: "iconButton", icon: "plus", css:"button_success ", label: "Submit", width: 120, click:function(obj){
			var form      = $$('frm_dosen_riwpend');
			var dosen     = $$("listdosen").getSelectedId();
			var values    = form.getValues();
			values.id_ptk = dosen.id;

			if(form.isDirty()){
				if(!form.validate())
					return false;


				form.setValues( values );
				form.save(); 
                this.getTopParentView().hide(); //hiteme window
			};
        }}
    ]
};

var win_riwpend = {
	rows:[form,btn_submit]
}

var ui_scheme = {
	type: "line",
	id:"ui_riwpend",
	rows:[
	{
		margin:10,
		type: "material",
		cols:[
			search,
			{
				gravity: 2.2,
				rows:[
					grd_riwpend,
					btn_add
				]
			}
		]
	}
	]
};

return {
    ui: function() {
    	apps.setUiScheme = ui_scheme;
    	apps.setUiWindow = ui_window.ui("win_riwpend", "FORM RIWAYAT PENDIDIKAN", win_riwpend);
    	apps.webix();
    },
    onInit: function(){
		$$("grd_riwpend").bind($$("listdosen"), "id_ptk");
		$$("frm_dosen_riwpend").bind($$("grd_riwpend"));
		var dp = new webix.DataProcessor({
            updateFromResponse:true, 
            autoupdate:true,
            master: $$("grd_riwpend"),
            url: "connector->./riwpend/data",
            on: handleProcessing
        });
	}
};

});