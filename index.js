//Get objects
var storage = window.localStorage
// Default props
var defaultProperties = {
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
teachersTextarea.value=storage["lessonScheduleGenerator.teachers"]||'[\n\t{name:"ФИО Учителя",classes:[0],subjects:[0],},\n]'
subjectsTextarea.value=storage["lessonScheduleGenerator.subjects"]||'[\n\t{name:"Наиболее важный предмет",hours:30,},\n\t{name:"Второй по важности предмет",hours:24,},\n]'
classesTextarea.value=storage["lessonScheduleGenerator.classes"]||'[\n\t{name:"Цифра-Буква класса",teachers:[0],students:[0],},\n]'
studentsTextarea.value=storage["lessonScheduleGenerator.students"]||'[\n\t{name:"ФИО Ученика",classes:[0],},\n]'
daysTextarea.value=storage["lessonScheduleGenerator.days"]||'[\n\t"Понедельник",\n\t"Вторник",\n\t"Среда",\n\t"Четверг",\n\t"Пятница",\n]'
var save=function()
{
	storage["lessonScheduleGenerator.teachers"]=teachersTextarea.value
	storage["lessonScheduleGenerator.subjects"]=subjectsTextarea.value
	storage["lessonScheduleGenerator.classes"]=classesTextarea.value
	storage["lessonScheduleGenerator.students"]=studentsTextarea.value
	storage["lessonScheduleGenerator.days"]=daysTextarea.value
}
teachersTextarea.oninput=function(e)
{
	classesTextarea.value=classesTextarea.value.split("\n\n")[0]+"\n\n"
	for(var v in teachersTextarea.value.split("\n"))
		if(teachersTextarea.value.split("\n")[v].split("=")[1])
		for(var v2 in teachersTextarea.value.split("\n")[v].split("=")[1].split(","))
			if(!teachersTextarea.value.split("\n")[v].split("=")[1].split(",")[v2].startsWith("#"))
				classesTextarea.value+=teachersTextarea.value.split("\n")[v].split("=")[1].split(",")[v2]+"=#"+v+"\n"
	save()
}
classesTextarea.oninput=function(e)
{
	teachersTextarea.value=teachersTextarea.value.split("\n\n")[0]+"\n\n"
	for(var v in classesTextarea.value.split("\n"))
		if(classesTextarea.value.split("\n")[v].split("=")[1])
		for(var v2 in classesTextarea.value.split("\n")[v].split("=")[1].split(","))
			if(!classesTextarea.value.split("\n")[v].split("=")[1].split(",")[v2].startsWith("#"))
				teachersTextarea.value+=classesTextarea.value.split("\n")[v].split("=")[1].split(",")[v2]+"=#"+v+"\n"
	save()
}
subjectsTextarea.oninput=function(e)
{
	teachersTextarea.value=teachersTextarea.value.split("\n\n")[0]+"\n\n"
	for(var v in classesTextarea.value.split("\n"))
		if(classesTextarea.value.split("\n")[v].split("=")[1])
		for(var v2 in classesTextarea.value.split("\n")[v].split("=")[1].split(","))
			if(!classesTextarea.value.split("\n")[v].split("=")[1].split(",")[v2].startsWith("#"))
				teachersTextarea.value+=classesTextarea.value.split("\n")[v].split("=")[1].split(",")[v2]+"=#"+v+"\n"
	save()
}
studentsTextarea.oninput=function(e)
{
	classesTextarea.value=classesTextarea.value.split("\n\n")[0]+"\n\n"
	for(var v in studentsTextarea.value.split("\n"))
		if(studentsTextarea.value.split("\n")[v].split("=")[1])
		for(var v2 in studentsTextarea.value.split("\n")[v].split("=")[1].split(","))
			if(!studentsTextarea.value.split("\n")[v].split("=")[1].split(",")[v2].startsWith("#"))
				classesTextarea.value+=studentsTextarea.value.split("\n")[v].split("=")[1].split(",")[v2]+"\n"
	save()
}
daysTextarea.oninput=function(e)
{
	save()
}
