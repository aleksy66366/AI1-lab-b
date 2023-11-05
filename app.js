<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista ToDo</title>
    <style>
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Lista zadań do zrobienia</h1>

    <!-- Pole wyszukiwania -->
    <input type="text" id="search" placeholder="Szukaj...">
    
    <!-- Lista zadań -->
    <ul id="task-list">
       
    </ul>
    
    <!-- Pole dodawania nowych zadań -->
    <input type="text" id="new-task" placeholder="Dodaj nowe zadanie...">
    
    <!-- Przycisk dodawania zadania -->
    <button id="add-task">Dodaj</button>

    <!-- Przycisk usuwania zadania -->
    <button id="delete-task">Usuń</button>

    <script src="app.js"></script>
</body>
</html>
