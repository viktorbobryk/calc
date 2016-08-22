<<<<<<< HEAD
Калькулятор складу бетону

=======
>>>>>>> 9442e4849024ca65567faa19315a0de2ca50e2f1
Призначення
1.Розрахунок складу бетону по масі необхідних компонентів для отримання марки потрібної користувачу.
2.Розрахунок співвідношення компонентів бетону для випадку коли в людини немає змоги зважувати матеріали.
3.Приблизний підрахунок вартості компонентів.

Структура даних
Файл data.json - містить масив із 4-х об'єктів : 
{
    "fluidity": "P1"("P2","P3","P4"),
    "classes": [
      {
        "clas": "M100",
        "cement": 158,
        "stone": 1150,
        "sand": 769,
        "water": 190
      },
      {
        "clas": "M150",
        "cement": 191,
        "stone": 1138,
        "sand": 754,
        "water": 190
      },
      {
        "clas": "M200",
        "cement": 224,
        "stone": 1127,
        "sand": 738,
        "water": 190
      }
    ]
  }
 Файл cost.json містить об'єкт із списком матеріалів і їх вартість:
 {"cement":1.9,"stone":0.15,"sand":0.1, "water":0}
 
 Принцип роботи калькулятора
 
 Користувач вводить дані:кількість бетону - quantity, текучість бетону - fluidity, марку міцності - clas. fluidity i clas передаються як параметри функції searchByConcreteClass котра знаходить в базі данних fluidity рівне fluidity котре ввів користувач. Потім всередині цього об'єкта знаходить clas рівний clas введеному користувачемі повертає масив з даним clas котрий містить список компонетів бетону із вказанням маси кожного із них.
Далі функція getResultTable будує таблицю із результатами.Для цього масу кожного компонента перемножає на кількість кубів бетону потрібних користувачу:
			(data[i].cement * params.quantity)
			(data[i].stone * params.quantity)
			(data[i].sand * params.quantity)
			(data[i].water * params.quantity) 
Вартість визначає функція getCost котра перемножає кількість матеріала в кілограмах для одного кубічного метра бетону на кількість кубів і на ватрість кілограма матеріала котре витягує із файла cost.json :
		((data[i].cement * params.quantity) * cost[0]).toFixed(2) 
		((data[i].stone * params.quantity) * cost[1]).toFixed(2)
		((data[i].sand * params.quantity) * cost[2]).toFixed(2
		((data[i].water * params.quantity) * cost[3]).toFixed(2) 

Співідношення матеріалів  визначає функція getProportionTable. За одиницю беремо масу цементу, кількість решти матеріалів визначаємо поділивши їх масу на масу цементу:
	(data[i].cement / data[i].cement).toFixed(1)
	(data[i].stone / data[i].cement).toFixed(1)
	(data[i].sand / data[i].cement).toFixed(1) 
	(data[i].water / data[i].cement).toFixed(1)
 
 Файлова структура проекту
calc/
├── data/
│   └── data.json
├── modules/
│   └── concreteModule.js
├── public/
│   └── style.css
├── services/
│   └── logger.js
├── tests/
│   ├── data/
│   │   └── data.json
│   └── runner.js
├── view/
│   └── indexPage.js
├── app.js
└── package.json

