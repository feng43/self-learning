/*
*@website:scriptlover.com
*@author:danxinju
*@date:2010/8/9
*/


function addEventHandler(target, eventType, handler) {
	if (target.addEventListener)
	{
		target.addEventListener(eventType, handler, false);
	} 
	else if (target.attachEvent) 
	{
		target.attachEvent("on" + eventType, handler);
	} 
	else 
	{
		target["on" + eventType] = handler;
	}
};

(function(){

/**
*@define AreaPicker
*/
var AreaPicker = window.AreaPicker = function(container ,fieldName ,level ,value){
	this.container = container || document;
	this.fieldName = fieldName;
	this.level = level ? level : 3;
	this.value = value;

	this.provinces = null;
	this.cities = null;
	this.districts = null;

	this.field = null;
	this.width = "120px";
	
	this.pData = typeof ProvincesData != "undefined" ? ProvincesData : null;
	this.cData = typeof CitiesData != "undefined" ? CitiesData : null;
	this.dData = typeof DistrictsData != "undefined" ? DistrictsData : null;
	
};

AreaPicker.prototype.useData = function(pData ,cData ,dData){
	this.pData = pData;
	this.cData = cData;
	this.dData = dData;
};

AreaPicker.prototype.init = function(){
	var label = document.createElement("span");

	label.appendChild(document.createTextNode("省:"));
	this.container.appendChild(label);
	this.provinces = document.createElement("select");
	this.provinces.options.add(new Option("请选择" ,""));
	this.provinces.id = this.fieldName +"_1";
	this.provinces.style.width = this.width;
	this.container.appendChild(this.provinces);

	if(this.level > 1)
	{
		label = document.createElement("span");
		label.appendChild(document.createTextNode("市:"));
		this.container.appendChild(label);
		this.cities = document.createElement("select");
		this.cities.options.add(new Option("请选择" ,""));
		this.cities.id = this.fieldName +"_2";
		this.cities.style.width = this.width;
		this.container.appendChild(this.cities);
	}

	if(this.level > 2)
	{
		label = document.createElement("span");
		label.appendChild(document.createTextNode("区:"));
		this.container.appendChild(label);
		this.districts = document.createElement("select");
		this.districts.options.add(new Option("请选择" ,""));
		this.districts.id = this.fieldName +"_2";
		this.districts.style.width = this.width;
		this.container.appendChild(this.districts);
	}

	this.field = document.createElement("input");
	this.field.id = this.fieldName;
	this.field.name = this.fieldName;
	this.field.type = "text";
	this.field.style.display = "none";
	this.container.appendChild(this.field);

	return this;
};

AreaPicker.prototype.provincesChange = function(){
	var opts = this.cities.options;
	opts.length = 0;
	opts.add(new Option("请选择" ,""));

	if(this.districts)
	{
		this.districts.options.length = 0;
		this.districts.options.add(new Option("请选择" ,""));
	}

	var val = this.provinces.value;
	for(var i=0;i<this.cData.length;i++)
	{
		if(val != this.cData[i].p)
		{
			continue;
		}

		opts.add(new Option(this.cData[i].n ,this.cData[i].i));
	}
};

AreaPicker.prototype.citiesChange = function(){
	var opts = this.districts.options;
	opts.length = 0;
	opts.add(new Option("请选择" ,""));

	var val = this.cities.value;
	for(var i=0;i<this.dData.length;i++)
	{
		if(val != this.dData[i].p)
		{
			continue;
		}

		opts.add(new Option(this.dData[i].n ,this.dData[i].i));
	}
};

AreaPicker.prototype.bind = function(){
	var _this = this;
	
	if(this.provinces && this.pData)
	{
		var opts = this.provinces.options;
		opts.length = 0;
		opts.add(new Option("请选择" ,""));
		for(var i=0;i<this.pData.length;i++)
		{
			opts.add(new Option(this.pData[i].n ,this.pData[i].i));
		}

		addEventHandler(this.provinces ,"change" ,function(){
			_this.setFieldValue();
		});
	}

	if(this.cities && this.cData)
	{
		addEventHandler(this.provinces ,"change" ,function(){
			_this.provincesChange.call(_this);
			_this.setFieldValue();
		});

		addEventHandler(this.cities ,"change" ,function(){
			_this.setFieldValue();
		});
	}

	if(this.districts && this.dData)
	{
		addEventHandler(this.cities ,"change" ,function(){
			_this.citiesChange.call(_this);
			_this.setFieldValue();
		});

		addEventHandler(this.districts ,"change" ,function(){
			_this.setFieldValue();
		});
	}
	
	if(!this.value)
	{
		return this;
	}

	var _value = this.value.split("-");
	if(_value.length > 0 && this.provinces)
	{
		this.select(this.provinces ,_value[0]);
	}
	if(_value.length > 1 && this.cities)
	{
		this.provincesChange();
		this.select(this.cities ,_value[1]);
	}
	if(_value.length > 2 && this.districts)
	{
		this.citiesChange();
		this.select(this.districts ,_value[2]);
	}
	this.setFieldValue();

	return this;
};

AreaPicker.prototype.setFieldValue = function(){
	this.field.value = "";
	if(this.provinces && this.provinces.value)
	{
		this.field.value += this.provinces.value;
	}
	if(this.cities && this.cities.value)
	{
		this.field.value += "-"+ this.cities.value;
	}
	if(this.districts && this.districts.value)
	{
		this.field.value += "-"+ this.districts.value;
	}
};

AreaPicker.prototype.getText = function(){
	var ret = "";
	if(this.provinces && this.provinces.value)
	{
		ret += this.provinces.options[this.provinces.options.selectedIndex].text;
	}
	if(this.cities && this.cities.value)
	{
		ret += "-"+ this.cities.options[this.cities.options.selectedIndex].text;
	}
	if(this.districts && this.districts.value)
	{
		ret += "-"+ this.districts.options[this.districts.options.selectedIndex].text;
	}

	return ret;
};

AreaPicker.prototype.getValue = function(){
	var ret = "";
	if(this.provinces && this.provinces.value)
	{
		ret += this.provinces.value;
	}
	if(this.cities && this.cities.value)
	{
		ret += "-"+ this.cities.value;
	}
	if(this.districts && this.districts.value)
	{
		ret += "-"+ this.districts.value;
	}

	return ret;
};

AreaPicker.prototype.select = function(dropd ,val){
	if(!dropd || !val)
	{
		return;
	}

	var opts = dropd.options;
	for(var i=0;i<opts.length;i++)
	{
		if(opts[i].value == val)
		{
			opts[i].selected = true;
			return;
		}
	}
};

addEventHandler(window ,"load" ,function(){
	var pickers = document.getElementsByTagName("AreaPicker");
	var picker = null;
	var container = null ,fieldName = null ,level = null ,value = null ,width = null;
	for(var i=0;i<pickers.length;i++)
	{
		container = pickers[i].parentNode;
		fieldName = pickers[i].getAttribute("name");
		level = pickers[i].getAttribute("level");
		value = pickers[i].getAttribute("value");
		width = pickers[i].getAttribute("width");

		if(!fieldName)
		{
			fieldName = "AreaPicker_"+ i;
		}
		
		picker = new AreaPicker(container ,fieldName ,level ,value);

		if(width)
		{
			width = width.indexOf("px") > -1 ? width : (width +"px");
			picker.width = width;
		}
		picker.init().bind();
		window[fieldName] = picker;
		pickers[i].setAttribute("name" ,"");
	}

});

})();