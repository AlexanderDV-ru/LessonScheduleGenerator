//Get objects
var storage = window.localStorage
// Default props
var defaultProperties = {
	"editmode" : false,
	"numberForm" : {
		"default" : {
			"digits" : "0123456789",
			"direction" : false,
			"minus" : "-",
			"dot" : ".",
			"minusPos" : false,
		},
		"expression" : {},
		"result" : {},
	},
		"polishmode":false,
	"calculator":{
	"actions" : {
		"default" : {
			"a" : 0,
			"b" : 0
		},
		"byPriority" : [[{
			"name" : "Power",
			"text" : "^",
			"func" : "Math.pow(a,b)",
			"a" : 10,
			"b" : 2
		}, {
			"name" : "Root",
			"text" : "V",
			"func" : "Math.pow(b,1/a)",
			"a" : 2,
			"b" : 0
		}], [{
			"name" : "Multiply",
			"text" : "*",
			"func" : "a*b",
			"a" : 1,
			"b" : 1
		}, {
			"name" : "Divide",
			"text" : "/",
			"func" : "a/b",
			"a" : 1,
			"b" : 1
		}], [{
			"name" : "Plus",
			"text" : "+",
			"func" : "a+b"
		}, {
			"name" : "Minus",
			"text" : "-",
			"func" : "a-b"
		}]]
	},
	"keyboard" : {
		"default" : {
			"text" : null,
			"func" : "enter(key.text)",
			"disabled" : false
		},
		"table" : [[{
			"name" : "MemoryClear",
			"text" : "MC",
			"func" : "",
			"disabled" : true
		}, {
			"name" : "MemoryR",
			"text" : "MR",
			"func" : "",
			"disabled" : true
		}, {
			"name" : "MemorySave",
			"text" : "MS",
			"func" : "",
			"disabled" : true
		}, {
			"name" : "MemoryMinus",
			"text" : "M-",
			"func" : "",
			"disabled" : true
		}, {
			"name" : "MemoryPlus",
			"text" : "M+",
			"func" : "",
			"disabled" : true
		}], [{
			"name" : "Left",
			"text" : "\u003C",
			"func" : "left()",
		}, {
			"name" : "Right",
			"text" : ">",
			"func" : "right()",
		}, {
			"name" : "ClearHistory",
			"text" : "CH",
			"func" : "clearHistory()",
			"disabled" : true
		}, {
			"name" : "Clear",
			"text" : "C",
			"func" : "clear()",
		}, {
			"name" : "Backspace",
			"text" : "\u003C-",
			"func" : "backspace()",
		}], [{
			"name" : "BracketLeft",
			"text" : "(",
			"func" : "enter('(')"
		}, {
			"name" : "BracketRight",
			"text" : ")",
			"func" : "enter(')')"
		}, {
			"name" : "Comma",
			"text" : ",",
			"func" : "enter(',')"
		}], [{
			"name" : "Root",
			"text" : "V",
			"func" : "enter('V')",
		}, {
			"name" : "Power",
			"text" : "^",
			"func" : "enter('^')",
		}, {
			"name" : "Percent",
			"text" : "%",
			"func" : "enter('%')",
			"disabled" : true
		}, {
			"name" : "Factorial",
			"text" : "!",
			"func" : "enter('!')",
			"disabled" : true
		}], [{
			"name" : "Divide",
			"text" : "/",
			"func" : "enter('/')",
		}, {
			"name" : "Seven",
			"text" : "7",
			"func" : "enter('7')",
		}, {
			"name" : "Eight",
			"text" : "8",
			"func" : "enter('8')",
		}, {
			"name" : "Nine",
			"text" : "9",
			"func" : "enter('9')",
		}], [{
			"name" : "Multiply",
			"text" : "*",
			"func" : "enter('*')",
		}, {
			"name" : "Four",
			"text" : "4",
			"func" : "enter('4')",
		}, {
			"name" : "Five",
			"text" : "5",
			"func" : "enter('5')",
		}, {
			"name" : "Six",
			"text" : "6",
			"func" : "enter('6')",
		}], [{
			"name" : "Plus",
			"text" : "+",
			"func" : "enter('+')",
		}, {
			"name" : "One",
			"text" : "1",
			"func" : "enter('1')",
		}, {
			"name" : "Two",
			"text" : "2",
			"func" : "enter('2')",
		}, {
			"name" : "Three",
			"text" : "3",
			"func" : "enter('3')",
		}], [{
			"name" : "Minus",
			"text" : "-",
			"func" : "enter('-')",
		}, {
			"name" : "Dot",
			"text" : ".",
			"func" : "enter('.')",
		}, {
			"name" : "Zero",
			"text" : "0",
			"func" : "enter('0')",
		}, {
			"name" : "Equals",
			"text" : "=",
			"func" : "result()",
		}]]
	}},	
	"unitconverter" : {
		"units":{
		"Масса" : [{
			"short" : "мкг",
			"long" : "Микрограммы",
			"func" : 0.000000001
		}, {
			"short" : "мг",
			"long" : "Миллиграммы",
			"func" : 0.000001
		}, {
			"short" : "г",
			"long" : "Граммы",
			"func" : 0.001
		}, {
			"short" : "кг",
			"long" : "Килограммы",
			"func" : 1
		}, {
			"short" : "ц",
			"long" : "Центнеры",
			"func" : 100
		}, {
			"short" : "т",
			"long" : "Тонны",
			"func" : 1000
		}, ],
		"Время" : [{
			"short" : "c",
			"long" : "Секунды",
			"func" : 1
		}, {
			"short" : "м",
			"long" : "Минуты",
			"func" : 60
		}, {
			"short" : "ч",
			"long" : "Часы",
			"func" : 60 * 60
		}, {
			"short" : "-",
			"long" : "Дни, Половины суток",
			"func" : 60 * 60 * 12
		}, {
			"short" : "-",
			"long" : "Сутки",
			"func" : 60 * 60 * 12 * 2
		}, {
			"short" : "-",
			"long" : "Недели",
			"func" : 60 * 60 * 12 * 2 * 7
		}, {
			"short" : "-",
			"long" : "Месяцы, 31 день",
			"func" : 60 * 60 * 12 * 2 * 31
		}, {
			"short" : "-",
			"long" : "Месяцы, 30 дней",
			"func" : 60 * 60 * 12 * 2 * 30
		}, {
			"short" : "-",
			"long" : "Месяцы, 1/12 года",
			"func" : 60 * 60 * 12 * 2 * 365.25 / 12
		}, {
			"short" : "-",
			"long" : "Года, 365.25 дней",
			"func" : 60 * 60 * 12 * 2 * 365.25
		}, {
			"short" : "-",
			"long" : "Года, 365 дней",
			"func" : 60 * 60 * 12 * 2 * 365
		}, {
			"short" : "-",
			"long" : "Висакосные года, 366 дней",
			"func" : 60 * 60 * 12 * 2 * 366
		}, {
			"short" : "-",
			"long" : "Века",
			"func" : 60 * 60 * 12 * 2 * 365.25 * 100
		}, ],
		"Давление" : [{
			"short" : "-",
			"long" : "Паскали",
			"func" : 1
		}],
		"Скорость" : [{
			"short" : "м/с",
			"long" : "Метры в секунду",
			"func" : 1
		}],
		"Скорость передачи данных" : [{
			"short" : "-",
			"long" : "Биты в секунду",
			"func" : 1
		}],
		"Расстояние" : [{
			"short" : "м",
			"long" : "Метры",
			"func" : 1
		}],
		"Мощность" : [{
			"short" : "-",
			"long" : "Ватты",
			"func" : 1
		}],
		"Объем" : [{
			"short" : "м^3",
			"long" : "Кубометры",
			"func" : 1
		}],
		"Объем информации" : [{
			"short" : "-",
			"long" : "Байты",
			"func" : 1
		}],
		"Площадь" : [{
			"short" : "м^2",
			"long" : "Квадратные метры",
			"func" : 1
		}],
		"Температура" : [{
			"short" : "-",
			"long" : "Градусы цельсия",
			"func" : 1
		}],
		"Расход топлива" : [{
			"short" : "-",
			"long" : "Километры на литр",
			"func" : 1
		}],
		"Угол" : [{
			"short" : "-",
			"long" : "Градусы",
			"func" : 1
		}],
		"Частота" : [{
			"short" : "-",
			"long" : "Герцы",
			"func" : 1
		}],
		"Энергия" : [{
			"short" : "-",
			"long" : "Джоули",
			"func" : 1
		}]}
	}
}
//
var props = makeClone(defaultProperties)
//
var propCmdHandlers = {"boolean":function(args, variants, current, prop)
	{
		if(!prop)
			prop=args[current-1]
		console.log(args)
		switch (args[1])
		{
			case "set":
				props[prop] = Boolean(args[2])
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			case "get":
				return "Property '" + prop + "' = " + props[prop]
			case undefined:
			case "":
			case "invert":
				props[prop] = !props[prop]
				return "Property '" + prop + "' successfully inverted to " + props[prop] + "!"
			default:
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
		}
	},"string": function(args, variants, current, prop)
	{
		if(!prop)
			prop=args[current-1]
		switch (args[1])
		{
			case "set":
				props[prop] = args[2]
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			case undefined:
			case "":
			case "get":
				return "Property '" + prop + "' = " + props[prop]
			default:
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
		}
	},"number":function(args, variants, current, prop)
	{
		if(!prop)
			prop=args[current-1]
		switch (args[1])
		{
			case "set":
				props[prop] = Number(args[2])
				return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
			case undefined:
			case "":
			case "get":
				return "Property '" + prop + "' = " + props[prop]
			default:
				return "Command '" + args[0] + " " + args[1] + "' not exists!"
		}
	}
}
var propCmdVariants = {"boolean":{"set":{"handler":function(args, variants, current){props[prop] = Boolean(args[2]);console.log(123)
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"}},"get":{"handler":function(args, variants, current){
					return "Property '" + prop + "' = " + props[prop]}},"invert|":{"handler":function(args, variants, current){
					props[args[current-2]] = !props[args[current-2]]
					return "Property '" + args[current-2] + "' successfully inverted to " + props[args[current-2]] + "!"}},
				"":{"handler":function(args, variants, current){
					return "Command '" + args[0] + " " + args[1] + "' not exists!"}}
			
					
		},"string": {"set":{"handler":function(args){
					props[prop] = args[2]
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"
				}},"get":{"handler":function(args){
					return "Property '" + prop + "' = " + props[prop]}},
				"":{"handler":function(args){
					return "Command '" + args[0] + " " + args[1] + "' not exists!"}}
			
		},"number":{"set":{"handler":function(args){
					props[prop] = Number(args[2])
					return "Property '" + prop + "' successfully setted to " + props[prop] + "!"}},
				"get":{"handler":function(args){
					return "Property '" + prop + "' = " + props[prop]}},
				"":{"handler":function(args){
				return "Command '" + args[0] + " " + args[1] + "' not exists!"}}
			
		}
	}
var commands={"'editmode'":{"vars":"editmode","variants":propCmdVariants.boolean},
		"polishmode":{"variants":propCmdVariants.boolean},
		"resultdigits":{"variants":propCmdVariants.string},
		"resultdirection":{"variants":propCmdVariants.boolean},
		"expressiondigits":{"variants":propCmdVariants.string},
		"expressiondirection":{"variants":propCmdVariants.boolean}}
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
teachersTextarea.value=storage["lessonScheduleGenerator.teachers"]||'[\n\t{name:"ФИО Учителя",classes:[0]},\n]'
classesTextarea.value=storage["lessonScheduleGenerator.classes"]||'[\n\t{name:"Цифра-Буква класса",teachers:[0],students:[0]},\n]'
studentsTextarea.value=storage["lessonScheduleGenerator.students"]||'[\n\t{name:"ФИО Ученика",classes:[0]},\n]'
daysTextarea.value=storage["lessonScheduleGenerator.days"]||'[\n\t"Понедельник",\n\t"Вторник",\n\t"Среда",\n\t"Четверг",\n\t"Пятница"\n]'
var save=function()
{
	storage["lessonScheduleGenerator.teachers"]=teachersTextarea.value
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
