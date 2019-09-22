//--- Name: LessonsScheduleGenerator/Vesion: 0.0.6a/Authors: AlexanderDV/Description: Main LessonsScheduleGenerator file. ---
// --- Start of standard initialization
// Program info
var programInfo={
	"packet" : "lessonsScheduleGenerator",
	"name" : "Lessons Schedule Generator",
	"version" : "0.0.6a",
	"authors" : "AlexanderDV"
}
programInfo.title= programInfo.name + " v" + programInfo.version + " by " + programInfo.authors
document.title=programInfo.title
// Universal local storage initialization
var storage = window.localStorage
// Default properties
var defaultProperties = {
	"inputData":{
		"teachers" : [{"name":"Учитель1","classes":[0],"subjects":[0],"hours":6},  {"name":"Учитель2","classes":[1],"subjects":[1],"hours":6}],
		"subjects" : [{"name":"1 по важности предмет"},  {"name":"2 по важности предмет"}],
		"classes" : [{"name":"Класс1","students":[0]},  {"name":"Класс2","students":[1]}],
		"students" : [{"name":"Ученик1"},  {"name":"Ученик2"}],
		"days" : ["Понедельник","Вторник","Среда","Четверг",  "Пятница"],
	}
}
// Properties from default properties
var props = makeClone(defaultProperties)
// Messages value-by-key for different languages
var msgs={
	"en":{
		"teachers":"Teachers",
		"subjects":"Subjects",
		"classes":"Classes",
		"students":"Students",
		"days":"Days",
		
		"jsonEditor":"Json-Editor",
		"tableEditor":"Table-Editor",
		
		"teachersLessonsSchedules":"Teachers' lessons schedules",
		"classesLessonsSchedules":"Classes' lessons schedules",
		
		"jsonOutput":"Json-Output",
		"tableOutput":"Table-Output",
		
		"generateLessonsSchedules":"Generate lessons schedules"
	},
	"ru":{
		"teachers":"Учителя",
		"subjects":"Предметы",
		"classes":"Классы",
		"students":"Ученики",
		"days":"Дни",
		
		"jsonEditor":"Json-Редактор",
		"tableEditor":"Табличный Редактор",
		
		"teachersLessonsSchedules":"Расписания уроков учителей",
		"classesLessonsSchedules":"Расписания уроков классов",
		
		"jsonOutput":"Json-Вывод",
		"tableOutput":"Табличный Вывод",
		
		"generateLessonsSchedules":"Сгенерировать расписания уроков"
	}
}
// Messages language initialization by default value
var messagesLanguage='ru'
// Function for getting message by key
var getMsg=function(key, lang)
{
	return msgs[lang||messagesLanguage][key]
}
// End of standard initialization ---

var propCmdVariants = {
	"boolean" : {
		"set" : {
			"handler" : function(args, variants, current)
			{
				props[prop] = Boolean(args[2]);
				// console.log(123)
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
			// console.log(variants[cmdRegExp].handler)
			if(ret)
				return ret
		}}
}
addConsoleElement(consoleTextarea, handler, commands)
//
//
var getTableText=function(v)
{
	var text=""
	var table=document.getElementById(v+"Table")
	for(var v2=0;table.children.length>v2;v2++)
	{
		var tr=document.getElementById(v+"Table"+"Tr"+v2)
		for(var v3=1;tr.children.length>v3;v3++)
			text+=document.getElementById(v+"Table"+"Tr"+v2+"Cell"+v3+"Input").value+(tr.children.length-1==v3?"":"\t")
		text+=(table.children.length-1==v2?"":"\n")
	}
	return text
}
var createCell=function(v, v2, v3)
{
	var cell=document.createElement(v==0?"th":"td")
	document.getElementById(v+"Table"+"Tr"+v2).appendChild(cell)
	cell.id=v+"Table"+"Tr"+v2+"Cell"+v3
	
	if(v2!=0&&v3==0)
	{
		var btnAddRow=document.createElement("button")
		cell.appendChild(btnAddRow)
		btnAddRow.innerText="+"
		btnAddRow.title="Добавить новую строку снизу"
		btnAddRow.onclick=new Function("createTr('"+v+"',"+v+"Table.children.length)")
	}
	if(v2==0/* &&v3!=0 */)
	{
		var btnWidthMinus=document.createElement("button")
		cell.appendChild(btnWidthMinus)
		btnWidthMinus.innerText="<"
		btnWidthMinus.title="Сузить столбец"
		btnWidthMinus.onclick=new Function(v+"Table"+"Tr"+v2+"Cell"+v3+".width=(Number(("+v+"Table"+"Tr"+v2+"Cell"+v3+".width+'').replace('px',''))||100)-20+'px'")
			
		var btnWidthPlus=document.createElement("button")
		cell.appendChild(btnWidthPlus)
		btnWidthPlus.innerText=">"
		btnWidthPlus.title="Расширить столбец"
		btnWidthPlus.onclick=new Function(v+"Table"+"Tr"+v2+"Cell"+v3+".width=(Number(("+v+"Table"+"Tr"+v2+"Cell"+v3+".width+'').replace('px',''))||100)+20+'px'")
		
		var btnAddCol=document.createElement("button")
		cell.appendChild(btnAddCol)
		btnAddCol.innerText="+"
		btnAddCol.title="Добавить новый столбец справа"
		btnAddCol.onclick=new Function("for(var v in "+v+"Table.children)createCell('"+v+"',v,"+v3+")")
	}
	
	var input=document.createElement("input")
	cell.appendChild(input)
	input.id=v+"Table"+"Tr"+v2+"Cell"+v3+"Input"
	input.style.width="100%"
	input.onkeydown=new Function("e","if(e.key=='ArrowUp')"+v+"Table"+"Tr"+(v2==0?v2:v2-1)+"Cell"+v3+"Input.focus();if(e.key=='ArrowDown')"+v+"Table"+"Tr"+(v2==height.length?v2:v2+1)+"Cell"+v3+"Input.focus()")
	if(v2==0/* &&v3!=0 */)
	{
		input.value=heads[v3-1]
		input.style["font-weight"]="bold"
	}
	if(v2!=0&&v3==0)
	{
		input.value=v2
		input.style["font-weight"]="bold"
		input.style.width="40px"
		input.readOnly=true
	}
	if(v2!=0&&v3!=0)
		if(cells&&cells[v2-1]&&cells[v2-1][v3-1])
			input.value=cells[v2-1][v3-1]
	
	if(v2==0&&v3==0)
		cell.style.visibility='collapse'
}
var createTr=function(v, v2)
{
	var tr=document.createElement("tr")
	document.getElementById(v+"Table").appendChild(tr)
	tr.id=v+"Table"+"Tr"+v2
	
	for(var v3=0;(v2==0?width+1:document.getElementById(v+"Table"+"Tr"+0).children.length)>v3;v3++)
		createCell(v, v2, v3)
}
var genTbl=function(v, layoutTable, ltr0, ltr1, func)
{
	var ltr0td0=document.createElement("td")
	ltr0.appendChild(ltr0td0)
	ltr0td0.style["vertical-align"]='top'
	var ltr0td1=document.createElement("td")
	ltr0.appendChild(ltr0td1)
	ltr0td1.style["vertical-align"]='top'
	
	ltr0.appendChild(document.createElement("td"))
	
	var ltr1td0=document.createElement("td")
	ltr1.appendChild(ltr1td0)
	ltr1td0.style["vertical-align"]='top'
	var ltr1td1=document.createElement("td")
	ltr1.appendChild(ltr1td1)
	ltr1td1.style["vertical-align"]='top'
	ltr1td1.colSpan=2
	
	ltr1.appendChild(document.createElement("td"))
	
	var label=document.createElement("label")
	ltr0td0.appendChild(label)
	label.id=v+"Label"
	label.innerText=getMsg(v)+":"
	
	var textareaCheckbox=document.createElement("input")
	ltr0td0.appendChild(textareaCheckbox)
	textareaCheckbox.id=v+"TextareaCheckbox"
	textareaCheckbox.type="checkbox"
	textareaCheckbox.oninput=new Function(v+"Textarea.parentNode.style.display="+v+"TextareaCheckbox.checked?'':'none'")
	
	var textareaCheckboxLabel=document.createElement("label")
	ltr0td0.appendChild(textareaCheckboxLabel)
	textareaCheckboxLabel.id=v+"TextareaCheckboxLabel"
	textareaCheckboxLabel.innerText=getMsg("jsonEditor")
	
	var tableCheckbox=document.createElement("input")
	ltr0td1.appendChild(tableCheckbox)
	tableCheckbox.id=v+"TableCheckbox"
	tableCheckbox.type="checkbox"
	tableCheckbox.oninput=new Function(v+"Table.parentNode.style.display="+v+"TableCheckbox.checked?'':'none'")
	
	var tableCheckboxLabel=document.createElement("label")
	ltr0td1.appendChild(tableCheckboxLabel)
	tableCheckboxLabel.id=v+"TableCheckboxLabel"
	tableCheckboxLabel.innerText=getMsg("tableEditor")
	
	var textarea=document.createElement("textarea")
	ltr1td0.appendChild(textarea)
	textarea.id=v+"Textarea"
	
	var table=document.createElement("table")
	ltr1td1.appendChild(table)
	func(table)
	
	textareaCheckbox.oninput()
	tableCheckbox.oninput()
}
for(var v in props.inputData)
{
	var cells=[v=="teachers"?["Учитель1","Предмет1","Предмет2","","Класс1","Класс2","","12"]:[[]]]
	var heads=v=="teachers"?[v,"subjects","","","classes","","","hours"]:[v]
	var width=Math.max(heads.length, cells[0].length)
	var height=Math.max(4,cells.length)
	
	var tr=document.createElement('tr')
	editorsTable.appendChild(tr)

	var td=document.createElement("td")
	tr.appendChild(td)
	
	var layoutTable=document.createElement("table")
	td.appendChild(layoutTable)
	
	var ltr0=document.createElement("tr")
	layoutTable.appendChild(ltr0)
	var ltr1=document.createElement("tr")
	layoutTable.appendChild(ltr1)
	
	genTbl(v, layoutTable,ltr0,ltr1, function(table){table.id=v+"Table";for(var v2=0;height+1>v2;v2++)createTr(v, v2)})
}
var ltr0=document.createElement("tr")
outputsTable.appendChild(ltr0)
var ltr1=document.createElement("tr")
outputsTable.appendChild(ltr1)
for(var v in {"teachers":"","classes":""})
{
	var v=v+"LessonsSchedules"
		
	genTbl(v, outputsTable,ltr0,ltr1, function(table)
	{
		table.id=v+"Table"
		var tr1=document.createElement("tr")
		table.appendChild(tr1)
		var td1=document.createElement("td")
		tr1.appendChild(td1)
		td1.appendChild(document.createElement("input"))
	})
}

generateLessonsSchedulesButton.innerText=getMsg("generateLessonsSchedules")

generateLessonsSchedulesButton.onclick=function()
{
	saveTextareas()
	saveTables()
	loadTextareas()
	saveJsons()
	
	updateSchedules()
}
for(var v in props.inputData)
	this[v+"Textarea"].oninput=function(e)
	{
		saveTables()
		saveTextareas()
		loadTables()
		saveJsons()
		
		updateSchedules()
	}
//
var loadJsons=function()
{
	for(var v in props.inputData)
		props.inputData[v]=storage["lessonScheduleGenerator.props.inputData."+v]&&storage["lessonScheduleGenerator.props.inputData."+v]!='undefined'?JSON.parse(storage["lessonScheduleGenerator.props.inputData."+v]):props.inputData[v]
}
var saveJsons=function()
{
	for(var v in props.inputData)
		storage["lessonScheduleGenerator.props.inputData."+v]=props.inputData[v]?JSON.stringify(props.inputData[v]):""
}
var loadTextareas=function()
{
	for(var v in props.inputData)
		document.getElementById(v+"Textarea").value=props.inputData[v]?JSON.stringify(props.inputData[v]):"[]"
}
var saveTextareas=function()
{
	for(var v in props.inputData)
		props.inputData[v]=document.getElementById(v+"Textarea").value?JSON.parse(document.getElementById(v+"Textarea").value):""
}
var loadTables=function()
{
	for(var v in props.inputData)
		for(var v2 in props.inputData[v])
		{
			if(!document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)))
				createTr(v, (Number(v2)+1))
			
			document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)+"Cell"+1+"Input").value=props.inputData[v][v2].name
			if(v!="teachers")
				continue
			
			document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)+"Cell"+2+"Input").value=(props.inputData.subjects[props.inputData[v][v2].subjects[0]]||{"name":""}).name
			document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)+"Cell"+3+"Input").value=(props.inputData.subjects[props.inputData[v][v2].subjects[1]]||{"name":""}).name
			document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)+"Cell"+4+"Input").value=(props.inputData.subjects[props.inputData[v][v2].subjects[2]]||{"name":""}).name
			
			document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)+"Cell"+5+"Input").value=(props.inputData.classes[props.inputData[v][v2].classes[0]]||{"name":""}).name
			document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)+"Cell"+6+"Input").value=(props.inputData.classes[props.inputData[v][v2].classes[1]]||{"name":""}).name
			document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)+"Cell"+7+"Input").value=(props.inputData.classes[props.inputData[v][v2].classes[2]]||{"name":""}).name
			
			document.getElementById(v+"Table"+"Tr"+(Number(v2)+1)+"Cell"+8+"Input").value=props.inputData[v][v2].hours
		}
}
var saveTables=function()
{
	for(var v in props.inputData)
	{
		props.inputData[v]=[]
		
		var lengths={}
		for(var v2 in props.inputData)
			lengths[v2]=props.inputData[v2].length
		
		var text=getTableText(v)
		for(var v2=1;text.split("\n").length>v2;v2++)
		{
			var element={}
			var last=""
			for(var v3=0;text.split("\n")[v2].split("\t").length>v3;v3++)
				if(text.split("\n")[0].split("\t")[v3]==v)
					element.name=text.split("\n")[v2].split("\t")[v3]||element.name
				else if(text.split("\n")[0].split("\t")[v3]=="hours")
					element.hours=text.split("\n")[v2].split("\t")[v3]||element.hours
				else 
				{
					if(text.split("\n")[0].split("\t")[v3])
					{
						last=text.split("\n")[0].split("\t")[v3]
						if(!element[last])
							element[last]=[]
					}
					// console.log(text.split("\n"))
					// console.log(text.split("\n")[0].split("\t")[v3])
					if(text.split("\n")[v2].split("\t")[v3])
					{
						var id=undefined
						if(text.split("\n")[v2].split("\t")[v3][0]=="#")
							id=Number(text.split("\n")[v2].split("\t")[v3].substring(1))
						else for(var v4 in props.inputData[last])
							if(props.inputData[last][v4].name==text.split("\n")[v2].split("\t")[v3])
								id=Number(v4)
						if(typeof id != "number")
						{
							props.inputData[last].push({"name":text.split("\n")[v2].split("\t")[v3]})
							id=lengths[last]++
						}
						element[last].push(id)
					}
				}
			if(element.name)
				props.inputData[v].push(element)
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
var updateSchedules=function()
{
	var lessons=generateLessons()
	var lessonsOf={"teachers":{},"classes":{}}
	var addLesson=function(teacher, clas, lesson)
	{
		if(!lessonsOf["teachers"][teacher])
		{
			lessonsOf["teachers"][teacher]=[]
			for(var v in props.inputData.days)
				lessonsOf["teachers"][teacher][v]=[]
		}
		if(!lessonsOf["classes"][clas])
		{
			lessonsOf["classes"][clas]=[]
			for(var v in props.inputData.days)
				lessonsOf["classes"][clas][v]=[]
		}
		var d=0
		var min=(lessonsOf["teachers"][teacher][0].length+1)*(lessonsOf["classes"][clas][0].length+1)
		for(var v in props.inputData.days)
		{
			var last=min
			min=Math.min(min,(lessonsOf["teachers"][teacher][v].length+1)*(lessonsOf["classes"][clas][v].length+1))
			if(last!=min)
				d=Number(v)
		}
		var l=Math.max(lessonsOf["teachers"][teacher][d].length,lessonsOf["classes"][clas][d].length)
		lessonsOf["teachers"][teacher][d][l]=lesson
		lessonsOf["classes"][clas][d][l]=lesson
	}
	for(var v in lessons)
	{
		// console.log(v, lessons[v])
		addLesson(lessons[v].teacher, lessons[v].clas, v)
	}
	
	for(var v0 in {"teachers":"","classes":""})
	{
		this[v0+"LessonsSchedulesTextarea"].value=""
		for(var v in lessonsOf[v0])
		{
			this[v0+"LessonsSchedulesTextarea"].value+=props.inputData[v0][v].name+"\n"
			for(var v2=0;lessonsOf[v0][v].length>v2;v2++)
			{
				this[v0+"LessonsSchedulesTextarea"].value+="\t"+props.inputData.days[v2].name+"\t"
				// console.log(lessonsOf, v0, v, v2)
				for(var v3=0;lessonsOf[v0][v][v2].length>v3;v3++)
					this[v0+"LessonsSchedulesTextarea"].value+=(lessonsOf[v0][v][v2][v3]?props.inputData[{"teachers":"classes","classes":"teachers"}[v0]][lessons[lessonsOf[v0][v][v2][v3]][{"teachers":"clas","classes":"teacher"}[v0]]].name:"---")+"\t"
				this[v0+"LessonsSchedulesTextarea"].value+="\n"
			}
		}
		var rt="{("+this[v0+"LessonsSchedulesTextarea"].value.replace(/\n/g,")}{(").replace(/\t/g,")(")+")}"
		// console.log(rt)
		rt=rt.replace(/[{]/g,"<tr>")
		// console.log(rt)
		rt=rt.replace(/[}]/g,"</tr>")
		// console.log(rt)
		rt=rt.replace(/[(]/g,"<td><input style='width:100%' value='")
		// console.log(rt)
		rt=rt.replace(/[)]/g,"'/></td>")
		// console.log(rt)
		this[v0+"LessonsSchedulesTable"].innerHTML=rt
	}
	
}
