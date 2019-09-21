//Get objects
var storage = window.localStorage
// Default props
var defaultProperties = {
	"inputData":{
		"teachers" : [{"name":"Учитель1","classes":[0],"subjects":[0],"hours":6},  {"name":"Учитель2","classes":[1],"subjects":[1],"hours":6}],
		"subjects" : [{"name":"1 по важности предмет"},  {"name":"2 по важности предмет"}],
		"classes" : [{"name":"Класс1","students":[0]},  {"name":"Класс2","students":[1]}],
		"students" : [{"name":"Ученик1"},  {"name":"Ученик2"}],
		"days" : ["Понедельник","Вторник","Среда","Четверг",  "Пятница"],
	}
}
//
var props = makeClone(defaultProperties)

var propCmdVariants = {
	"boolean" : {
		"set" : {
			"handler" : function(args, variants, current)
			{
				props[prop] = Boolean(args[2]);
				console.log(123)
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			}
		},
		"get" : {
			"handler" : function(args, variants, current)
			{
				return "Property '" + prop + "' = " + props[prop]
			}
		},
		"invert|" : {
			"handler" : function(args, variants, current)
			{
				props[args[current - 2]] = !props[args[current - 2]]
				return "Property '" + args[current - 2] + "' successfully inverted to " + props[args[current - 2]] + "!"
			}
		},
		"" : {
			"handler" : function(args, variants, current)
			{
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
			}
		}

	},
	"string" : {
		"set" : {
			"handler" : function(args)
			{
				props[prop] = args[2]
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			}
		},
		"get" : {
			"handler" : function(args)
			{
				return "Property '" + prop + "' = " + props[prop]
			}
		},
		"" : {
			"handler" : function(args)
			{
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
			}
		}

	},
	"number" : {
		"set" : {
			"handler" : function(args)
			{
				props[prop] = Number(args[2])
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			}
		},
		"get" : {
			"handler" : function(args)
			{
				return "Property '" + prop + "' = " + props[prop]
			}
		},
		"" : {
			"handler" : function(args)
			{
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
			}
		}

	}
}
 var  commands={
	
}
var handler=function(args, variants, current)
{
	if(!variants)
		variants=commands
	if(!current)
		current=0
	for(var cmdRegExp in variants)
		{
		var matching=(typeof args[current]=="string"?"'"+args[current]+"'":args[current]+"")
		var match=matching.match(new RegExp(cmdRegExp.split("/")[0],cmdRegExp.split("/")[1]))
		if(match&&match.length==matching)
		{
			var ret=((variants[cmdRegExp].handler instanceof Function)?variants[cmdRegExp].handler:handler)(args, variants[cmdRegExp].variants, current+1)
			console.log(variants[cmdRegExp].handler)
			if(ret)
				return ret
		}}
}
addConsoleElement(consoleTextarea, handler, commands)
//
var generateTable=function(name, heads, height, cells)
{
	var elements={"getfulltext":function()
		{
			var text=""
			for(var v=0;height+1>v;v++)
			{
				for(var v2=0;heads.length>v2;v2++)
					text+=new Function("return "+name+"Tr"+v+"Cell"+v2+"Input.value")()+(heads.length-1==v2?"":"\t")
				text+=(height==v?"":"\n")
			}
			return text
		}}
	var table=document.createElement("table")
	table.id=name
	for(var v=0;height+1>v;v++)
	{
		var tr=document.createElement("tr")
		tr.id=name+"Tr"+v
		
		for(var v2=0;heads.length+1>v2;v2++)
		{
			var cell=document.createElement(v==0?"th":"td")
			cell.id=tr.id+"Cell"+v2
			
			var input=document.createElement("input")
			input.id=cell.id+"Input"
			input.style.width="100%"
			input.onkeydown=new Function("e","if(e.key=='ArrowUp')"+name+"Tr"+(v==0?0:v-1)+"Cell"+v2+"Input.focus();if(e.key=='ArrowDown')"+name+"Tr"+(v==height.length?v:v+1)+"Cell"+v2+"Input.focus()")
			if(v==0/*&&v2!=0*/)
			{
				input.value=heads[v2-1]
				input.style["font-weight"]="bold"
					
				var btnAddCol=document.createElement("button")
				btnAddCol.innerText="+"
				btnAddCol.style.display="inline"
				cell.appendChild(btnAddCol)
				var btnWidthPlus=document.createElement("button")
				btnWidthPlus.innerText=">"
				btnWidthPlus.tooltip="Расширить"
				btnWidthPlus.onclick=new Function(cell.id+".width=(Number(("+cell.id+".width+'').replace('px',''))||100)+20+'px'")
				cell.appendChild(btnWidthPlus)
				var btnWidthMinus=document.createElement("button")
				btnWidthMinus.innerText="<"
				btnWidthMinus.onclick=new Function(cell.id+".width=(Number(("+cell.id+".width+'').replace('px',''))||100)-20+'px'")
				cell.appendChild(btnWidthMinus)
			}
			if(v!=0&&v2==0)
			{
				input.value=v
				input.style["font-weight"]="bold"
				input.style.width="55px"
				input.readOnly=true
					
				var btnAddRow=document.createElement("button")
				//btnAddRow.style.display="inline"
				btnAddRow.innerText="+"
				cell.appendChild(btnAddRow)
			}
			if(v!=0&&v2!=0)
				if(cells&&cells[v-1]&&cells[v-1][v2-1])
					input.value=cells[v-1][v2-1]
			cell.appendChild(input)
			
			
			tr.appendChild(cell)
			if(v==0&&v2==0)
				cell.style.visibility='collapse'
		}
		
		table.appendChild(tr)
	}
	elements.table=table
	return elements
}
var teachersTableElements=generateTable("teachersTable",["Учителя","Предметы","","","Классы","","","",""],10, [["Учитель1","Предмет1","Предмет2","","Класс1","Класс2","","","12"]])
teachersTextarea.parentNode.appendChild(teachersTableElements.table)
var teachersCheckbox=document.createElement("input")
teachersCheckbox.type="checkbox"
teachersCheckbox.oninput=function(){teachersTableElements.table.style.display=teachersCheckbox.checked?'':'none';teachersTextarea.style.display=teachersCheckbox.checked?'none':''}
teachersCheckbox.oninput()
teachersTextarea.parentNode.appendChild(teachersCheckbox)
var teachersCheckboxLabel=document.createElement("label")
teachersCheckboxLabel.innerText="Табличный редактор"
teachersCheckboxLabel.style.color="white"
teachersTextarea.parentNode.appendChild(teachersCheckboxLabel)
var generateScheduleButton=document.createElement("button")
generateScheduleButton.innerText="Сгенерировать расписание"
generateScheduleButton.onclick=function()
{
	saveTextareas()
	saveTables()
	loadTextareas()
	saveJsons()
	
	updateSchedules()
}
document.body.appendChild(generateScheduleButton)

//
var loadJsons=function()
{
	for(var v in props.inputData)
		props.inputData[v]=storage["lessonScheduleGenerator.props.inputData."+v]?JSON.parse(storage["lessonScheduleGenerator.props.inputData."+v]):props.inputData[v]
}
var saveJsons=function()
{
	for(var v in props.inputData)
		storage["lessonScheduleGenerator.props.inputData."+v]=props.inputData[v]?JSON.stringify(props.inputData[v]):undefined
}
var loadTextareas=function()
{
	for(var v in props.inputData)
		document.getElementById(v+"Textarea").value=props.inputData[v]?JSON.stringify(props.inputData[v]):"[]"
}
var saveTextareas=function()
{
	for(var v in props.inputData)
		props.inputData[v]=document.getElementById(v+"Textarea").value?JSON.parse(document.getElementById(v+"Textarea").value):[]
}
var loadTables=function()
{
	for(var v in props.inputData)
		;
}
var saveTables=function()
{
	for(var v in props.inputData)
	{
		props.inputData.teachers=[]
		
		var sb=props.inputData.subjects.length
		var cl=props.inputData.classes.length
		
		var text=teachersTableElements.getfulltext()
		for(var v=1;text.split("\n").length>v;v++)
		{
			var sbids=[]
			var clids=[]
			for(var v2=1;3>=v2;v2++)
				if(text.split("\n")[v].split("\t")[v2])
				{
					var id=undefined
					if(text.split("\n")[v].split("\t")[v2][0]=="#")
						id=Number(text.split("\n")[v].split("\t")[v2].substring(1))
					else for(var v3 in props.inputData.subjects)
						if(props.inputData.subjects[v3].name==text.split("\n")[v].split("\t")[v2])
							id=Number(v3)
					if(typeof id != "number")
					{
						props.inputData.subjects.push({"name":text.split("\n")[v].split("\t")[v2]})
						id=sb++
					}
					sbids.push(id)
				}
			for(var v2=4;7>=v2;v2++)
				if(text.split("\n")[v].split("\t")[v2])
				{
					var id=undefined
					if(text.split("\n")[v].split("\t")[v2][0]=="#")
						id=Number(text.split("\n")[v].split("\t")[v2].substring(1))
					else for(var v3 in props.inputData.classes)
						if(props.inputData.classes[v3].name==text.split("\n")[v].split("\t")[v2])
							id=Number(v3)
					if(typeof id != "number")
					{
						props.inputData.classes.push({"name":text.split("\n")[v].split("\t")[v2]})
						id=cl++
					}
					clids.push(id)
				}
			if(text.split("\n")[v].split("\t")[0])
				props.inputData.teachers.push({"name":text.split("\n")[v].split("\t")[0],"subjects":sbids,"classes":clids,"hours":text.split("\n")[v].split("\t")[8]})
		}
	}
}
//
loadJsons()
loadTextareas()
loadTables()
//
var generateLessonsByTeachers=function()
{
	var lessonsByTeachers={}
	for(var v in props.inputData.teachers)
	{
		lessonsByTeachers[v]={}
		for(var v2 in props.inputData.teachers[v].classes)
			for(var v3=0;props.inputData.teachers[v].hours/props.inputData.teachers[v].classes.length>v3;v3++)
				if(lessonsByTeachers[v][props.inputData.teachers[v].classes[v2]])
					lessonsByTeachers[v][props.inputData.teachers[v].classes[v2]].push({"clas":props.inputData.teachers[v].classes[v2],"teacher":Number(v),"subject":props.inputData.teachers[v].subjects[0]})
				else lessonsByTeachers[v][props.inputData.teachers[v].classes[v2]]=[{"clas":props.inputData.teachers[v].classes[v2],"teacher":Number(v),"subject":props.inputData.teachers[v].subjects[0]}]
	}
	return lessonsByTeachers
}
var generateLessons=function()
{
	var lessons=[]
	var lessonsByTeachers=generateLessonsByTeachers()
	for(var v in lessonsByTeachers)
		for(var v2 in lessonsByTeachers[v])
			for(var v3 in lessonsByTeachers[v][v2])
				lessons.push(lessonsByTeachers[v][v2][v3])
	return lessons
}
var ttlt=function()
{
	var lessonsByTeachers=generateLessonsByTeachers()
	var tableByTeachers={}
	for(var v in lessonsByTeachers)
	{
		tableByTeachers[v]={}
		for(var v2 in days)
			tableByTeachers[v][v2]=[]
		var vv=0
		for(var v2 in lessonsByTeachers[v])
			for(var v3 in lessonsByTeachers[v][v2])
				tableByTeachers[v][++vv%days.length].push(lessonsByTeachers[v][v2][v3])
	}
	return tableByTeachers
}
var tls=function(tableByTeachers)
{
	teachersLessonsSchedulesTextarea.value=""
	var table=tableByTeachers
	for(var v in table)
	{
		teachersLessonsSchedulesTextarea.value+=teachers[v].name+":\n"
				
		for(var v2 in table[v])
		{
			teachersLessonsSchedulesTextarea.value+=days[v2]+"   \t"
			for(var v3 in table[v][v2])
				teachersLessonsSchedulesTextarea.value+=classes[table[v][v2][v3]["class"]].name+" "
			teachersLessonsSchedulesTextarea.value+="\n"
		}
	}
}
var cls=function(tableByTeachers)
{
	classesLessonsSchedulesTextarea.value=""
	var table=[]
	for(var v in tableByTeachers)
		for(var v2 in tableByTeachers[v])
			for(var v3 in tableByTeachers[v][v2])
			{
				if(!table[tableByTeachers[v][v2][v3]["class"]])
					table[tableByTeachers[v][v2][v3]["class"]]=[]
				table[tableByTeachers[v][v2][v3]["class"]][v2]=tableByTeachers[v][v2]
			}
	
	for(var v in table)
	{
		classesLessonsSchedulesTextarea.value+=classes[v].name+":\n"
				
		for(var v2 in table[v])
		{
			classesLessonsSchedulesTextarea.value+=days[v2]+"   \t"
			for(var v3 in table[v][v2])
				classesLessonsSchedulesTextarea.value+=teachers[table[v][v2][v3]["teacher"]].name+" "
			classesLessonsSchedulesTextarea.value+="\n"
		}
	}
}
var updateSchedules=function()
{
	var lessons=generateLessons()
	var lessonsOfTeachers={}
	var lessonsOfClasses={}
	var addLesson=function(teacher, clas, lesson)
	{
		if(!lessonsOfTeachers[teacher])
		{
			lessonsOfTeachers[teacher]=[]
			for(var v in props.inputData.days)
				lessonsOfTeachers[teacher][v]=[]
		}
		if(!lessonsOfClasses[clas])
		{
			lessonsOfClasses[clas]=[]
			for(var v in props.inputData.days)
				lessonsOfClasses[clas][v]=[]
		}
		var d=0
		var min=(lessonsOfTeachers[teacher][0].length+1)*(lessonsOfClasses[clas][0].length+1)
		for(var v in props.inputData.days)
		{
			var last=min
			min=Math.min(min,(lessonsOfTeachers[teacher][v].length+1)*(lessonsOfClasses[clas][v].length+1))
			if(last!=min)
				d=Number(v)
		}
		var l=Math.max(lessonsOfTeachers[teacher][d].length,lessonsOfClasses[clas][d].length)
		lessonsOfTeachers[teacher][d][l]=lesson
		lessonsOfClasses[clas][d][l]=lesson
	}
	for(var v in lessons)
	{
		console.log(v, lessons[v])
		addLesson(lessons[v].teacher, lessons[v].clas, v)
	}
		
	teachersLessonsSchedulesTextarea.value=""
	for(var v in lessonsOfTeachers)
	{
		teachersLessonsSchedulesTextarea.value+=props.inputData.teachers[v].name+":\n"
		for(var v2=0;lessonsOfTeachers[v].length>v2;v2++)
		{
			teachersLessonsSchedulesTextarea.value+="  "+props.inputData.days[v2]+": "
			for(var v3=0;lessonsOfTeachers[v][v2].length>v3;v3++)
				teachersLessonsSchedulesTextarea.value+=props.inputData.classes[lessons[lessonsOfTeachers[v][v2][v3]].clas].name+" "
			teachersLessonsSchedulesTextarea.value+="\n"
		}
	}
	classesLessonsSchedulesTextarea.value=""
	for(var v in lessonsOfClasses)
	{
		classesLessonsSchedulesTextarea.value+=props.inputData.classes[v].name+":\n"
		for(var v2=0;lessonsOfClasses[v].length>v2;v2++)
		{
			classesLessonsSchedulesTextarea.value+="  "+props.inputData.days[v2]+": "
			for(var v3=0;lessonsOfClasses[v][v2].length>v3;v3++)
				classesLessonsSchedulesTextarea.value+=(lessonsOfClasses[v][v2][v3]?props.inputData.teachers[lessons[lessonsOfClasses[v][v2][v3]].teacher].name:"---")+" "
			classesLessonsSchedulesTextarea.value+="\n"
		}
	}
}
teachersTextarea.oninput=function(e)
{
	saveJsons()
	updateJsons()
	updateSchedules()
}
classesTextarea.oninput=function(e)
{
	save()
}
subjectsTextarea.oninput=function(e)
{
	save()
}
studentsTextarea.oninput=function(e)
{
	save()
}
daysTextarea.oninput=function(e)
{
	save()
}
