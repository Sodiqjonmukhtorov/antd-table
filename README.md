Тестовое задание: 
1. Разработать компонент таблицы, с несколькими столбцами. Столбцы должны включать в себя имя, дату, числовое значение, а так же колонку с действиями.
2. Над таблицей должна быть кнопка "Добавить", вызывающая модальное окно с набором полей соответствующих столбцам в таблице. После заполнения и валидации данных полей в таблицу должна добавляться строка с ними. 
3. В ячейке колонки "Действия" должны быть кнопки "удалить" и "редактировать" (можете обозначать их иконками). Нажатие на кнопку "редактировать" вновь вызывает модальное окно, заполненное данными из строки и при изменении и подтверждении в модальном окне меняет данные в соответствующей строке. Нажатие на кнопку "удалить" - убирает данную строку из таблицы.  
4. Для выполнения тестового задания необходимо выполнить все требования выше, при этом есть дополнительные пожелания, которые будут плюсом при рассмотрении кандидатов: 
- Использовать библиотеку AntD, реализовать с её помощью сортировку по всем колонкам, которая будет правильно работать в зависимости от типа значения в колонке 
- Если решите не использовать AntD, можете поработать над собственной версткой, добавить плавных анимаций для модального окна, подумать над адаптивом. 
- Реализовать поиск по всем ячейкам таблицы. Инпут для поиска расположить над таблицей.  При выполнении задания разрешается пользоваться библиотекой AntD (при условии выполнения дополнительных требований), а так же вспомогательных библиотек по типу lodash. 

Результат:
Реализован проект на React + Redux Toolkit + antd.
Вместо бэк использован файл FakeData.
# antd-table
